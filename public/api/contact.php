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
        dirname(__DIR__, 2) . '/.env',
        dirname(__DIR__, 3) . '/.env',
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

function setting(string $name): string
{
    $value = getenv($name);
    if ($value === false || $value === '') {
        $value = $_ENV[$name] ?? ($_SERVER[$name] ?? '');
    }
    return trim((string) $value);
}

function headerValue(string $value, int $maxLength = 160): string
{
    $value = trim(str_replace(["\r", "\n"], ' ', $value));
    return function_exists('mb_substr') ? mb_substr($value, 0, $maxLength) : substr($value, 0, $maxLength);
}

loadDotEnvFile();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

if (trim((string) ($_POST['website'] ?? '')) !== '') {
    respond(200, ['ok' => true]);
}

$name = headerValue((string) ($_POST['name'] ?? ''));
$firstName = headerValue((string) ($_POST['firstName'] ?? ''));
$lastName = headerValue((string) ($_POST['lastName'] ?? ''));
$email = headerValue((string) ($_POST['email'] ?? ''), 254);
$phone = headerValue((string) ($_POST['phone'] ?? ''));
$service = headerValue((string) ($_POST['service'] ?? ''));
$subject = headerValue((string) ($_POST['subject'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));
$formType = headerValue((string) ($_POST['formType'] ?? 'website'));

if ($name === '') {
    $name = trim("{$firstName} {$lastName}");
}

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => 'Name and a valid email are required']);
}

if (strlen($message) > 10000) {
    respond(422, ['ok' => false, 'error' => 'Message is too long']);
}

$apiKey = setting('BREVO_API_KEY');
if ($apiKey === '') {
    respond(500, ['ok' => false, 'error' => 'Email service is not configured on this server.']);
}

$toAddress = setting('CONTACT_MAIL_TO') ?: 'sales@mobiwave.co.ke';
$fromAddress = setting('CONTACT_MAIL_FROM') ?: 'no-reply@mobiwave.co.ke';
$mailSubject = '[MobiWave website] ' . ($subject !== '' ? $subject : ($service !== '' ? $service : 'Website enquiry'));

$payload = [
    'sender' => [
        'name' => 'MobiWave Website',
        'email' => $fromAddress,
    ],
    'to' => [
        ['email' => $toAddress, 'name' => 'MobiWave Sales'],
    ],
    'replyTo' => [
        'email' => $email,
        'name' => $name,
    ],
    'subject' => $mailSubject,
    'htmlContent' => implode('', array_filter([
        '<p><strong>Form:</strong> ' . htmlspecialchars($formType, ENT_QUOTES, 'UTF-8') . '</p>',
        '<p><strong>Name:</strong> ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '</p>',
        '<p><strong>Email:</strong> ' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '</p>',
        $phone !== '' ? '<p><strong>Phone:</strong> ' . htmlspecialchars($phone, ENT_QUOTES, 'UTF-8') . '</p>' : '',
        $service !== '' ? '<p><strong>Service:</strong> ' . htmlspecialchars($service, ENT_QUOTES, 'UTF-8') . '</p>' : '',
        '<p><strong>Message:</strong></p><p>' . nl2br(htmlspecialchars($message !== '' ? $message : 'No message provided.', ENT_QUOTES, 'UTF-8')) . '</p>',
    ])),
    'textContent' => implode("\n", array_filter([
        'Form: ' . $formType,
        'Name: ' . $name,
        'Email: ' . $email,
        $phone !== '' ? 'Phone: ' . $phone : '',
        $service !== '' ? 'Service: ' . $service : '',
        '',
        'Message:',
        $message !== '' ? $message : 'No message provided.',
    ])),
];

$curl = curl_init('https://api.brevo.com/v3/smtp/email');
if ($curl === false) {
    respond(500, ['ok' => false, 'error' => 'Mail service is unavailable.']);
}

curl_setopt_array($curl, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Accept: application/json',
        'Content-Type: application/json',
        'api-key: ' . $apiKey,
    ],
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_SLASHES),
    CURLOPT_TIMEOUT => 20,
    CURLOPT_CONNECTTIMEOUT => 10,
]);

$response = curl_exec($curl);
$httpCode = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
$curlError = curl_error($curl);
curl_close($curl);

if ($response === false || $httpCode < 200 || $httpCode >= 300) {
    error_log('Brevo contact form error: ' . ($curlError !== '' ? $curlError : $response));
    respond(503, ['ok' => false, 'error' => 'The mail server is currently unavailable. Please email sales@mobiwave.co.ke directly.']);
}

respond(200, ['ok' => true]);
