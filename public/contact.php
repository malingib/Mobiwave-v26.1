<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$clean = static function (string $value): string {
    return trim(str_replace(["\r", "\n"], ' ', $value));
};

$name = $clean((string) ($_POST['name'] ?? ''));
$firstName = $clean((string) ($_POST['firstName'] ?? ''));
$lastName = $clean((string) ($_POST['lastName'] ?? ''));
$email = $clean((string) ($_POST['email'] ?? ''));
$phone = $clean((string) ($_POST['phone'] ?? ''));
$service = $clean((string) ($_POST['service'] ?? ''));
$product = $clean((string) ($_POST['product'] ?? ''));
$subject = $clean((string) ($_POST['subject'] ?? ''));
$inquiryType = $clean((string) ($_POST['inquiryType'] ?? ''));
$message = $clean((string) ($_POST['message'] ?? ''));

if ($name === '') {
    $name = trim($firstName . ' ' . $lastName);
}

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Name and a valid email are required']);
    exit;
}

$mailSubject = $subject !== '' ? $subject : ($service !== '' ? $service : 'Website enquiry');
$mailSubject = '[MobiWave website] ' . $mailSubject;
$mailBody = implode("\n", array_filter([
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

$headers = implode("\r\n", [
    'From: MobiWave Website <no-reply@mobiwave.co.ke>',
    "Reply-To: {$email}",
    'Content-Type: text/plain; charset=UTF-8',
]);

if (!mail('info@mobiwave.co.ke', $mailSubject, $mailBody, $headers)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'The server could not send the message']);
    exit;
}

echo json_encode(['ok' => true]);
