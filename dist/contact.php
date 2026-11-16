<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_SLASHES);
    exit;
}

function loadDotEnvFile(): void
{
    $candidates = [
        dirname(__DIR__) . '/.env',
        dirname(__DIR__, 2) . '/.env',
    ];

    foreach ($candidates as $candidate) {
        if (!is_file($candidate)) {
            continue;
        }

        $lines = file($candidate, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($lines === false) {
            continue;
        }

        foreach ($lines as $line) {
            $trimmed = trim($line);
            if ($trimmed === '' || $trimmed[0] === '#') {
                continue;
            }

            $separatorPosition = strpos($trimmed, '=');
            if ($separatorPosition === false) {
                continue;
            }

            $name = trim(substr($trimmed, 0, $separatorPosition));
            $value = trim(substr($trimmed, $separatorPosition + 1));

            if ($name === '') {
                continue;
            }

            if (strlen($value) >= 2 && (($value[0] === '"' && $value[strlen($value) - 1] === '"') || ($value[0] === '\'' && $value[strlen($value) - 1] === '\''))) {
                $value = substr($value, 1, -1);
            }

            $value = preg_replace('/\s+#.*$/', '', $value) ?? $value;

            if (getenv($name) === false) {
                putenv("{$name}={$value}");
            }

            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
        }

        return;
    }
}

loadDotEnvFile();

function setting(string $name): string
{
    $value = getenv($name);
    if ($value === false || $value === '') {
        $value = isset($_ENV[$name]) ? $_ENV[$name] : (isset($_SERVER[$name]) ? $_SERVER[$name] : '');
    }
    return trim((string) $value);
}

function headerValue(string $value, int $maxLength = 160): string
{
    $value = trim(str_replace(["\r", "\n"], ' ', $value));
    return function_exists('mb_substr') ? mb_substr($value, 0, $maxLength) : substr($value, 0, $maxLength);
}

function smtpReadResponse($socket): string
{
    $response = '';

    while (!feof($socket)) {
        $line = fgets($socket, 4096);
        if ($line === false) {
            break;
        }

        $response .= $line;

        if (preg_match('/^[0-9]{3} /', $line) === 1) {
            break;
        }
    }

    return trim($response);
}

function smtpCommand($socket, string $command): string
{
    if (fwrite($socket, $command . "\r\n") === false) {
        throw new RuntimeException('SMTP command write failed');
    }

    $response = smtpReadResponse($socket);
    if ($response === '') {
        throw new RuntimeException('SMTP server returned an empty response');
    }

    return $response;
}

function sendSmtp(string $from, string $to, string $replyTo, string $subject, string $body): void
{
    $host = setting('SMTP_HOST');
    $port = (int) (setting('SMTP_PORT') ?: '587');
    $encryption = strtolower(setting('SMTP_ENCRYPTION') ?: 'tls');
    $username = setting('SMTP_USERNAME');
    $password = setting('SMTP_PASSWORD');

    if ($host === '' || !preg_match('/^[a-z0-9.-]+$/i', $host) || $port < 1 || $port > 65535) {
        throw new RuntimeException('SMTP server settings are invalid');
    }

    if (!in_array($encryption, ['tls', 'ssl', 'smtps', 'none'], true)) {
        throw new RuntimeException('SMTP encryption setting is invalid');
    }

    if (!filter_var($from, FILTER_VALIDATE_EMAIL) || !filter_var($to, FILTER_VALIDATE_EMAIL) || !filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
        throw new RuntimeException('SMTP email address is invalid');
    }

    $connection = 'tcp://' . $host . ':' . $port;
    if (in_array($encryption, ['ssl', 'smtps'], true)) {
        $connection = 'ssl://' . $host . ':' . $port;
    }

    $socket = @stream_socket_client($connection, $errno, $errstr, 15, STREAM_CLIENT_CONNECT);
    if ($socket === false) {
        throw new RuntimeException('SMTP connection failed: ' . $errstr);
    }

    stream_set_timeout($socket, 15);

    $banner = smtpReadResponse($socket);
    if (!preg_match('/^220\b/', $banner)) {
        fclose($socket);
        throw new RuntimeException('SMTP banner rejected the connection');
    }

    if ($encryption === 'tls') {
        $startTlsResponse = smtpCommand($socket, 'STARTTLS');
        if (!preg_match('/^220\b/', $startTlsResponse)) {
            fclose($socket);
            throw new RuntimeException('SMTP server did not accept STARTTLS');
        }

        $cryptoEnabled = @stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        if ($cryptoEnabled !== true) {
            fclose($socket);
            throw new RuntimeException('STARTTLS negotiation failed');
        }
    }

    $ehloResponse = smtpCommand($socket, 'EHLO localhost');
    if (!preg_match('/^250\b/', $ehloResponse)) {
        fclose($socket);
        throw new RuntimeException('SMTP EHLO handshake failed');
    }

    if ($username !== '' || $password !== '') {
        $authResponse = smtpCommand($socket, 'AUTH LOGIN');
        if (!preg_match('/^334\b/', $authResponse)) {
            fclose($socket);
            throw new RuntimeException('SMTP AUTH LOGIN is not supported by the server');
        }

        $usernameResponse = smtpCommand($socket, base64_encode($username));
        if (!preg_match('/^334\b/', $usernameResponse)) {
            fclose($socket);
            throw new RuntimeException('SMTP username was rejected');
        }

        $passwordResponse = smtpCommand($socket, base64_encode($password));
        if (!preg_match('/^235\b/', $passwordResponse)) {
            fclose($socket);
            throw new RuntimeException('SMTP authentication failed');
        }
    }

    $mailFromResponse = smtpCommand($socket, 'MAIL FROM:<' . $from . '>');
    if (!preg_match('/^250\b/', $mailFromResponse)) {
        fclose($socket);
        throw new RuntimeException('SMTP MAIL FROM rejected the sender address');
    }

    $rcptResponse = smtpCommand($socket, 'RCPT TO:<' . $to . '>');
    if (!preg_match('/^25[0-9]\b/', $rcptResponse)) {
        fclose($socket);
        throw new RuntimeException('SMTP RCPT TO rejected the recipient address');
    }

    $dataResponse = smtpCommand($socket, 'DATA');
    if (!preg_match('/^354\b/', $dataResponse)) {
        fclose($socket);
        throw new RuntimeException('SMTP DATA command was rejected');
    }

    $mailHeaders = implode("\r\n", [
        'From: "MobiWave Website" <' . $from . '>',
        'To: <' . $to . '>',
        'Reply-To: <' . $replyTo . '>',
        'Subject: ' . $subject,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Date: ' . date(DATE_RFC2822),
        '',
        $body,
        '',
    ]);

    if (fwrite($socket, $mailHeaders . "\r\n.\r\n") === false) {
        fclose($socket);
        throw new RuntimeException('SMTP message body could not be written');
    }

    $dataResult = smtpReadResponse($socket);
    if (!preg_match('/^250\b/', $dataResult)) {
        fclose($socket);
        throw new RuntimeException('SMTP message delivery failed');
    }

    smtpCommand($socket, 'QUIT');
    fclose($socket);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

// Discard likely bot submissions without exposing the honeypot to automated clients.
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    respond(200, ['ok' => true]);
}

$name = headerValue((string) ($_POST['name'] ?? ''));
$firstName = headerValue((string) ($_POST['firstName'] ?? ''));
$lastName = headerValue((string) ($_POST['lastName'] ?? ''));
$email = headerValue((string) ($_POST['email'] ?? ''), 254);
$phone = headerValue((string) ($_POST['phone'] ?? ''));
$service = headerValue((string) ($_POST['service'] ?? ''));
$product = headerValue((string) ($_POST['product'] ?? ''));
$subject = headerValue((string) ($_POST['subject'] ?? ''));
$inquiryType = headerValue((string) ($_POST['inquiryType'] ?? ''));
$formType = headerValue((string) ($_POST['formType'] ?? 'website'));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '') {
    $name = trim("{$firstName} {$lastName}");
}

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => 'Name and a valid email are required']);
}

if (strlen($message) > 10000) {
    respond(422, ['ok' => false, 'error' => 'Message is too long']);
}

$mailTo = setting('CONTACT_MAIL_TO') ?: 'info@mobiwave.co.ke';
$mailFrom = setting('CONTACT_MAIL_FROM') ?: 'no-reply@mobiwave.co.ke';
$mailSubject = '[MobiWave website] ' . ($subject !== '' ? $subject : ($service !== '' ? $service : 'Website enquiry'));
$mailBody = implode("\n", array_filter([
    "Form: {$formType}",
    "Name: {$name}",
    "Email: {$email}",
    $phone !== '' ? "Phone: {$phone}" : '',
    $service !== '' ? "Service: {$service}" : '',
    $product !== '' ? "Product: {$product}" : '',
    $inquiryType !== '' ? "Inquiry type: {$inquiryType}" : '',
    '',
    'Message:',
    $message !== '' ? $message : 'No message provided.',
]));

try {
    sendSmtp($mailFrom, $mailTo, $email, $mailSubject, $mailBody);
} catch (Throwable $error) {
    error_log('MobiWave contact form: ' . $error->getMessage());
    respond(503, ['ok' => false, 'error' => 'The mail server is currently unavailable. Please email sales@mobiwave.co.ke directly.']);
}

respond(200, ['ok' => true]);
