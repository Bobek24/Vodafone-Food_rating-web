/* =========== server.js =========== */
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const app = express();
const PORT = 5000;
const SECRET_KEY = 'tajny_klic';

// Paměť pro ověřovací kódy: { email: { code: '123456', expires: Date } }
const CODES = {};

app.use(express.json());
app.use(cors());

// Nodemailer: Gmail + App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // např. "tvuj-email@gmail.com"
    pass: process.env.EMAIL_PASS  // 16 znaků (App Password)
  }
});

/**
 * [POST] /api/auth/request-code
 * Tělo: { email }
 * Výsledek: Odešle 6místný kód na e-mail.
 */
app.post('/api/auth/request-code', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email je povinný.' });
  }

  // Vygenerovat 6místný kód, např. "123456"
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Uložit do paměti k pozdějšímu ověření (na 5 minut)
  CODES[email] = {
    code,
    expires: Date.now() + (5 * 60 * 1000)  // platnost 5 minut
  };

  try {
    await transporter.sendMail({
      from: `"Login System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Váš ověřovací kód',
      text: `Váš ověřovací kód je: ${code}\nPlatí 5 minut.`
    });
    res.json({ message: 'Ověřovací kód byl odeslán na váš email.' });
  } catch (error) {
    console.error('Chyba při odesílání e-mailu:', error);
    res.status(500).json({ message: 'Chyba při odesílání e-mailu.' });
  }
});

/**
 * [POST] /api/auth/verify-code
 * Tělo: { email, code }
 * Výsledek: pokud je kód správný a platný => vrátíme JWT.
 */
app.post('/api/auth/verify-code', (req, res) => {
  const { email, code } = req.body;

  // Zkontrolujeme, zda máme uložený kód pro daný email
  if (!CODES[email]) {
    return res.status(400).json({ message: 'Neexistuje kód pro tento email (nejprve si ho nechte poslat).' });
  }

  const stored = CODES[email];

  // Zkontrolovat platnost
  if (Date.now() > stored.expires) {
    // Expired
    delete CODES[email];
    return res.status(400).json({ message: 'Kód vypršel, požádejte o nový.' });
  }

  // Zkontrolujeme, zda kód sedí
  if (stored.code !== code) {
    return res.status(400).json({ message: 'Neplatný kód.' });
  }

  // OK - můžeme generovat JWT nebo jen říct "přihlášen"
  delete CODES[email];

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

  res.json({
    message: 'Přihlášení úspěšné.',
    token,
    email
  });
});

app.listen(PORT, () => {
  console.log(`✅ Backend běží na http://localhost:${PORT}`);
});
    