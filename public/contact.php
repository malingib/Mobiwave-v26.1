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

function sendSmtp(string $from, string $to, string $replyTo, string $subject, string $body): void
{
    if (!function_exists('curl_init')) {
        throw new RuntimeException('The cURL extension is not available');
    }

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

    $scheme = in_array($encryption, ['ssl', 'smtps'], true) ? 'smtps' : 'smtp';
    $message = implode("\r\n", [
        'Date: ' . date(DATE_RFC2822),
        'From: "MobiWave Website" <' . $from . '>',
        'To: <' . $to . '>',
        'Reply-To: <' . $replyTo . '>',
        'Subject: =?UTF-8?B?' . base64_encode($subject) . '?=',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        '',
        rtrim(chunk_split(base64_encode($body), 76, "\r\n")),
        '',
    ]);
    $offset = 0;

    $ch = curl_init($scheme . '://' . $host . ':' . $port);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_MAIL_FROM => '<' . $from . '>',
        CURLOPT_MAIL_RCPT => ['<' . $to . '>'],
        CURLOPT_UPLOAD => true,
        CURLOPT_INFILESIZE => strlen($message),
        CURLOPT_READFUNCTION => static function ($handle, $input, int $length) use (&$offset, $message): string {
            $chunk = substr($message, $offset, $length);
            $offset += strlen($chunk);
            return $chunk;
        },
    ]);

    if ($encryption === 'tls') {
        curl_setopt($ch, CURLOPT_USE_SSL, CURLUSESSL_ALL);
    } elseif ($encryption === 'none') {
        curl_setopt($ch, CURLOPT_USE_SSL, CURLUSESSL_NONE);
    }

    if ($username !== '' || $password !== '') {
        curl_setopt($ch, CURLOPT_USERNAME, $username);
        curl_setopt($ch, CURLOPT_PASSWORD, $password);
    }

    $response = curl_exec($ch);
    $curlError = curl_error($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response === false || $curlError !== '') {
        error_log('MobiWave SMTP request failed: ' . ($curlError !== '' ? $curlError : 'request failed'));
        throw new RuntimeException('SMTP email request failed');
    }

    if ($status < 200 || $status >= 300) {
        error_log('MobiWave SMTP server rejected contact email with status ' . $status);
        throw new RuntimeException('SMTP server rejected the email');
    }
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
    respond(500, ['ok' => false, 'error' => 'The server could not send the message']);
}

respond(200, ['ok' => true]);
