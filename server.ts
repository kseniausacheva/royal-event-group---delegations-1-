import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Serve static files from dist in production
app.use(express.static(path.join(__dirname, 'dist')));

// Email transporter (Yandex SMTP)
const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || 'baxgat@yandex.ru',
    pass: process.env.EMAIL_PASS || '', // App password from Yandex
  },
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message, mailingConsent } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
  }

  const mailOptions = {
    from: `"Royal Event Group — Сайт" <${process.env.EMAIL_USER || 'baxgat@yandex.ru'}>`,
    to: 'baxgat@yandex.ru',
    subject: `Новая заявка с сайта от ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a; border-bottom: 2px solid #e91e8c; padding-bottom: 10px;">
          Новая заявка с сайта
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555; width: 150px;">Имя:</td>
            <td style="padding: 10px; color: #1a1a1a;">${name}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; font-weight: bold; color: #555;">Email:</td>
            <td style="padding: 10px; color: #1a1a1a;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555;">Сообщение:</td>
            <td style="padding: 10px; color: #1a1a1a;">${message.replace(/\n/g, '<br>')}</td>
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
    res.json({ success: true, message: 'Заявка отправлена успешно' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Ошибка отправки. Попробуйте позже.' });
  }
});

// SPA fallback — serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
