// utils/mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 🔥 NEU: Funktion, die req als Parameter nimmt, um dynamische URL zu ermitteln
const sendResetPasswordEmail = async (req, email, resetToken) => {
  // 1. Versuche, die Basis-URL aus dem Referer-Header abzuleiten
  let clientBaseUrl = process.env.CLIENT_URL; // Fallback aus .env

  if (req && req.get("Referer")) {
    try {
      const refererUrl = new URL(req.get("Referer"));
      clientBaseUrl = `${refererUrl.protocol}//${refererUrl.host}`;
    } catch (err) {
      console.warn("Konnte Referer nicht parsen, verwende CLIENT_URL aus .env");
    }
  }

  // 2. Erstelle den Reset-Link
  const resetUrl = `${clientBaseUrl}/user/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Passwort zurücksetzen",
    text: `Du hast angefordert, dein Passwort zurückzusetzen. Klicke auf den folgenden Link, um ein neues Passwort zu setzen: ${resetUrl}`,
    html: `<p>Du hast angefordert, dein Passwort zurückzusetzen.</p><p>Klicke <a href="${resetUrl}">hier</a>, um ein neues Passwort zu setzen.</p><p>Der Link ist nur für kurze Zeit gültig.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Reset-Email gesendet an:", email);
  } catch (error) {
    console.error("Fehler beim Senden der Reset-Email:", error);
    throw new Error("E-Mail konnte nicht gesendet werden.");
  }
};

module.exports = { sendResetPasswordEmail };
