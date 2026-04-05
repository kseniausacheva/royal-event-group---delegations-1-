import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

/**
 * Vercel serverless function — POST /api/contact
 *
 * Receives contact form submissions and sends them via Yandex SMTP.
 * Configure EMAIL_USER and EMAIL_PASS in Vercel → Project → Settings → Environment Variables.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, mailingConsent } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
  }

  const EMAIL_USER = process.env.EMAIL_USER || 'baxgat@yandex.ru';
  const EMAIL_PASS = process.env.EMAIL_PASS;

  if (!EMAIL_PASS) {
    console.error('EMAIL_PASS is not configured');
    return res.status(500).json({ error: 'Сервер не настроен. Обратитесь к администратору.' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Royal Event Group — Сайт" <${EMAIL_USER}>`,
    to: 'baxgat@yandex.ru',
    replyTo: email,
    subject: `Новая заявка с сайта от ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a; border-bottom: 2px solid #e91e8c; padding-bottom: 10px;">
          Новая заявка с сайта
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555; width: 150px;">Имя:</td>
            <td style="padding: 10px; color: #1a1a1a;">${escapeHtml(name)}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; font-weight: bold; color: #555;">Email:</td>
            <td style="padding: 10px; color: #1a1a1a;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555;">Сообщение:</td>
            <td style="padding: 10px; color: #1a1a1a;">${escapeHtml(message).replace(/\n/g, '<br>')}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; font-weight: bold; color: #555;">Согласие на рассылку:</td>
            <td style="padding: 10px; color: #1a1a1a;">${mailingConsent ? 'Да' : 'Нет'}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; font-size: 12px; color: #999;">
          Отправлено с сайта royaleventandmice.com • ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Заявка отправлена успешно' });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Ошибка отправки. Попробуйте позже.' });
  }
}

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
