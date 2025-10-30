// utils/mailer.js
const nodemailer = require("nodemailer");

// Beispiel: SMTP-Konfiguration (angepasst an deinen E-Mail-Dienst)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // z. B. "smtp.gmail.com"
  port: 587, // z. B. 587
  secure: false, // true für 465, false für anderer Port
  auth: {
    user: process.env.SMTP_USER, // Deine E-Mail-Adresse
    pass: process.env.SMTP_PASS, // Dein App-Passwort (bei Gmail)
  },
});

const sendResetPasswordEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`; // z. B. http://localhost:3000

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
