<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function respond(int $status, array $body): never
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
            if ($trimmed === '' || str_starts_with($trimmed, '#')) {
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
    return $value === false ? '' : trim($value);
}

function headerValue(string $value, int $maxLength = 160): string
{
    $value = trim(str_replace(["\r", "\n"], ' ', $value));
    return function_exists('mb_substr') ? mb_substr($value, 0, $maxLength) : substr($value, 0, $maxLength);
}

function smtpRead($socket): string
{
    $response = '';
    while (($line = fgets($socket, 512)) !== false) {
        $response .= $line;
        if (strlen($line) < 4 || $line[3] === ' ') {
            break;
        }
    }
    return $response;
}

function smtpCommand($socket, string $command, string $expected): void
{
    fwrite($socket, $command . "\r\n");
    $response = smtpRead($socket);
    if ($response === '' || strpos($response, $expected) !== 0) {
        throw new RuntimeException('SMTP server rejected command');
    }
}

function sendSmtp(string $host, int $port, string $username, string $password, string $from, string $replyTo, string $to, string $subject, string $body): void
{
    $transport = setting('SMTP_ENCRYPTION', 'tls') === 'ssl' ? 'ssl://' . $host : $host;
    $socket = fsockopen($transport, $port, $errorNumber, $errorMessage, 15);
    if (!$socket) {
        throw new RuntimeException("SMTP connection failed: {$errorMessage}");
    }

    try {
        stream_set_timeout($socket, 15);
        if (strpos(smtpRead($socket), '220') !== 0) {
            throw new RuntimeException('SMTP greeting failed');
        }

        $serverName = $_SERVER['SERVER_NAME'] ?? 'mobiwave.co.ke';
        smtpCommand($socket, "EHLO {$serverName}", '250');

        if (setting('SMTP_ENCRYPTION', 'tls') === 'tls') {
            smtpCommand($socket, 'STARTTLS', '220');
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('Could not enable SMTP TLS');
            }
            smtpCommand($socket, "EHLO {$serverName}", '250');
        }

        smtpCommand($socket, 'AUTH LOGIN', '334');
        smtpCommand($socket, base64_encode($username), '334');
        smtpCommand($socket, base64_encode($password), '235');
        smtpCommand($socket, "MAIL FROM:<{$from}>", '250');
        smtpCommand($socket, "RCPT TO:<{$to}>", '250');
        smtpCommand($socket, 'DATA', '354');

        $headers = [
            "From: MobiWave Website <{$from}>",
            "To: {$to}",
            "Reply-To: {$replyTo}",
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
            "Subject: =?UTF-8?B?" . base64_encode($subject) . '?=',
        ];
        $message = implode("\r\n", $headers) . "\r\n\r\n" . str_replace("\n.", "\n..", str_replace("\r\n", "\n", $body));
        fwrite($socket, str_replace("\n", "\r\n", $message) . "\r\n.\r\n");
        if (strpos(smtpRead($socket), '250') !== 0) {
            throw new RuntimeException('SMTP server rejected message');
        }
        smtpCommand($socket, 'QUIT', '221');
    } finally {
        fclose($socket);
    }
}

function sendBrevo(string $apiKey, string $from, string $to, string $replyTo, string $subject, string $body): void
{
    if (!function_exists('curl_init')) {
        throw new RuntimeException('The cURL extension is not available');
    }

    $escapedBody = nl2br(htmlspecialchars($body, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));
    $payload = [
        'sender' => ['name' => 'MobiWave Website', 'email' => $from],
        'to' => [['email' => $to, 'name' => 'MobiWave Enquiries']],
        'replyTo' => ['email' => $replyTo],
        'subject' => $subject,
        'textContent' => $body,
        'htmlContent' => '<div style="font-family:Arial,sans-serif;line-height:1.6">' . $escapedBody . '</div>',
    ];

    $json = json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    if ($json === false) {
        throw new RuntimeException('Could not encode the email payload');
    }

    $ch = curl_init('https://api.brevo.com/v3/smtp/email');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $json,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_TIMEOUT => 20,
        CURLOPT_HTTPHEADER => [
            'accept: application/json',
            'api-key: ' . $apiKey,
            'content-type: application/json',
        ],
    ]);

    $response = curl_exec($ch);
    $curlError = curl_error($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response === false || $curlError !== '') {
        error_log('MobiWave Brevo request failed: ' . ($curlError !== '' ? $curlError : 'request failed'));
        throw new RuntimeException('Brevo email request failed');
    }

    if ($status < 200 || $status >= 300) {
        error_log('MobiWave Brevo rejected contact email with HTTP status ' . $status);
        throw new RuntimeException('Brevo rejected the email');
    }
}

function verifyTurnstile(string $token): void
{
    $secret = trim((string) (getenv('TURNSTILE_SECRET_KEY') ?: getenv('CF_TURNSTILE_SECRET_KEY') ?: ''));

    if ($secret === '') {
        if (isset($_POST['cf-turnstile-response']) || getenv('VITE_TURNSTILE_SITE_KEY') !== false || getenv('CF_TURNSTILE_SITE_KEY') !== false) {
            respond(500, ['ok' => false, 'error' => 'Captcha secret is not configured on the server.']);
        }
        return;
    }

    if ($token === '') {
        respond(403, ['ok' => false, 'error' => 'Please complete the verification challenge.']);
    }

    if (!function_exists('curl_init')) {
        respond(500, ['ok' => false, 'error' => 'Captcha verification is unavailable on this server.']);
    }

    $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'secret' => $secret,
            'response' => $token,
            'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_HTTPHEADER => ['Accept: application/json'],
    ]);

    $payload = curl_exec($ch);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($payload === false || $curlError !== '') {
        error_log('Turnstile verification failed: ' . ($curlError !== '' ? $curlError : 'curl request failed'));
        respond(500, ['ok' => false, 'error' => 'Captcha verification is currently unavailable.']);
    }

    $result = json_decode($payload, true);
    if (!is_array($result) || empty($result['success'])) {
        respond(403, ['ok' => false, 'error' => 'Please complete the verification challenge.']);
    }
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

// Both the homepage form and the full contact page use this endpoint.
$turnstileToken = trim((string) ($_POST['cf-turnstile-response'] ?? ''));
verifyTurnstile($turnstileToken);

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
    $brevoApiKey = setting('BREVO_API_KEY');
    if ($brevoApiKey !== '') {
        sendBrevo($brevoApiKey, $mailFrom, $mailTo, $email, $mailSubject, $mailBody);
    } else {
        // Keep existing SMTP delivery until BREVO_API_KEY is configured on the host.
        $smtpHost = setting('SMTP_HOST');
        $smtpUsername = setting('SMTP_USERNAME');
        $smtpPassword = setting('SMTP_PASSWORD');
        if ($smtpHost === '' || $smtpUsername === '' || $smtpPassword === '') {
            throw new RuntimeException('Brevo API key or SMTP configuration is missing');
        }
        sendSmtp($smtpHost, (int) (setting('SMTP_PORT') ?: '587'), $smtpUsername, $smtpPassword, $mailFrom, $email, $mailTo, $mailSubject, $mailBody);
    }
} catch (Throwable $error) {
    error_log('MobiWave contact form: ' . $error->getMessage());
    respond(500, ['ok' => false, 'error' => 'The server could not send the message']);
}

respond(200, ['ok' => true]);
