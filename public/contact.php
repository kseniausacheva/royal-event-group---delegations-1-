<?php
/**
 * Contact form endpoint for reg.ru hosting (PHP version)
 * Mirrors the behavior of api/contact.ts on Vercel
 */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Read JSON body
$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    $input = $_POST;
}

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$messenger = trim($input['messenger'] ?? '');
$message = trim($input['message'] ?? '');
$mailingConsent = !empty($input['mailingConsent']);

if ($name === '' || $email === '' || $phone === '' || $messenger === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Все поля обязательны для заполнения']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Некорректный email']);
    exit;
}

function escapeHtml($str) {
    return htmlspecialchars($str, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

// Build HTML email body
$mailingText = $mailingConsent ? 'Да' : 'Нет';
$dateStr = date('d.m.Y H:i', time() + 3 * 3600); // Moscow time

$htmlBody = "
<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
  <h2 style='color: #1a1a1a; border-bottom: 2px solid #e91e8c; padding-bottom: 10px;'>
    Новая заявка с сайта
  </h2>
  <table style='width: 100%; border-collapse: collapse; margin-top: 20px;'>
    <tr>
      <td style='padding: 10px; font-weight: bold; color: #555; width: 150px;'>Имя:</td>
      <td style='padding: 10px; color: #1a1a1a;'>" . escapeHtml($name) . "</td>
    </tr>
    <tr style='background: #f9f9f9;'>
      <td style='padding: 10px; font-weight: bold; color: #555;'>Email:</td>
      <td style='padding: 10px; color: #1a1a1a;'><a href='mailto:" . escapeHtml($email) . "'>" . escapeHtml($email) . "</a></td>
    </tr>
    <tr>
      <td style='padding: 10px; font-weight: bold; color: #555;'>Телефон:</td>
      <td style='padding: 10px; color: #1a1a1a;'>" . escapeHtml($phone) . "</td>
    </tr>
    <tr style='background: #f9f9f9;'>
      <td style='padding: 10px; font-weight: bold; color: #555;'>Мессенджер:</td>
      <td style='padding: 10px; color: #1a1a1a;'>" . escapeHtml($messenger) . "</td>
    </tr>
    <tr>
      <td style='padding: 10px; font-weight: bold; color: #555;'>Сообщение:</td>
      <td style='padding: 10px; color: #1a1a1a;'>" . nl2br(escapeHtml($message)) . "</td>
    </tr>
    <tr style='background: #f9f9f9;'>
      <td style='padding: 10px; font-weight: bold; color: #555;'>Согласие на рассылку:</td>
      <td style='padding: 10px; color: #1a1a1a;'>" . $mailingText . "</td>
    </tr>
  </table>
  <p style='margin-top: 20px; font-size: 12px; color: #999;'>
    Отправлено с сайта royaleventandmice.ru &bull; " . $dateStr . "
  </p>
</div>
";

// Send email via mail() — reg.ru hosting supports it for local addresses
$to = 'baxgat@yandex.ru';
$subject = 'Новая заявка с сайта от ' . $name;

$boundary = md5(uniqid((string)mt_rand(), true));
$headers = [];
$headers[] = 'From: Royal Event Group <noreply@royaleventandmice.ru>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
$headers[] = 'Content-Transfer-Encoding: 8bit';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$subjectEncoded = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$success = @mail($to, $subjectEncoded, $htmlBody, implode("\r\n", $headers));

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Заявка отправлена успешно']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка отправки. Попробуйте позже.']);
}
