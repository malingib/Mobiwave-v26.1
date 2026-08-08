<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function respond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_SLASHES);
    exit;
}

function setting(string $name, string $default = ''): string
{
    $value = getenv($name);
    return $value === false ? $default : trim($value);
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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

// Both the homepage form and the full contact page use this endpoint.
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

$mailTo = setting('CONTACT_MAIL_TO', 'sales@mobiwave.co.ke');
$mailFrom = setting('CONTACT_MAIL_FROM', 'no-reply@mobiwave.co.ke');
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
    $smtpHost = setting('SMTP_HOST', 'mail.mobiwave.co.ke');
    $smtpUsername = setting('SMTP_USERNAME', 'mobiwaveinno');
    $smtpPassword = setting('SMTP_PASSWORD');
    if ($smtpHost !== '' && $smtpUsername !== '' && $smtpPassword !== '') {
        sendSmtp($smtpHost, (int) setting('SMTP_PORT', '587'), $smtpUsername, $smtpPassword, $mailFrom, $email, $mailTo, $mailSubject, $mailBody);
    } else {
        $headers = implode("\r\n", [
            "From: MobiWave Website <{$mailFrom}>",
            "Reply-To: {$email}",
            'Content-Type: text/plain; charset=UTF-8',
        ]);
        if (!mail($mailTo, $mailSubject, $mailBody, $headers)) {
            throw new RuntimeException('PHP mail() failed');
        }
    }
} catch (Throwable $error) {
    error_log('MobiWave contact form: ' . $error->getMessage());
    respond(500, ['ok' => false, 'error' => 'The server could not send the message']);
}

respond(200, ['ok' => true]);
