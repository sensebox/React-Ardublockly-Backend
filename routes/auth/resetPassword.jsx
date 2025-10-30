// routes/auth/resetPassword.js
const express = require("express");
const crypto = require("crypto"); // Node.js eingebaut
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const { sendResetPasswordEmail } = require("../../utils/mailer");

const router = express.Router();

// 1. POST /request
router.post("/request", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ message: "E-Mail-Adresse ist erforderlich." });
  }

  try {
    // Finde Nutzer anhand der E-Mail
    const user = await User.findOne({ email, authProvider: "native" }); // Nur native Nutzer

    if (!user) {
      // Um Pre-Enumeration zu verhindern, sende dieselbe Antwort wie bei Erfolg
      // (ansonsten weiß jemand, ob die E-Mail existiert)
      return res
        .status(200)
        .json({
          message: "Wenn die E-Mail existiert, wurde ein Link gesendet.",
        });
    }

    // Generiere Token
    const resetToken = crypto.randomBytes(32).toString("hex"); // z. B. 64 Zeichen lang
    const resetTokenExpiry = Date.now() + 3600000; // 1 Stunde in Millisekunden

    // Speichere Token und Ablaufdatum im Nutzer
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    // Sende E-Mail mit Link
    await sendResetPasswordEmail(email, resetToken);

    res
      .status(200)
      .json({ message: "Wenn die E-Mail existiert, wurde ein Link gesendet." });
  } catch (err) {
    console.error("Fehler bei Passwort-Reset-Anfrage:", err);
    res.status(500).json({ message: "Interner Serverfehler." });
  }
});

// 2. POST /reset
router.post("/reset", async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token und neues Passwort sind erforderlich." });
  }

  if (newPassword.length < 6) {
    return res
      .status(400)
      .json({ message: "Passwort muss mindestens 6 Zeichen lang sein." });
  }

  try {
    // Finde Nutzer anhand des Tokens
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Ablaufzeit prüfen
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Ungültiger oder abgelaufener Token." });
    }

    // Hash neues Passwort
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Setze neues Passwort, lösche Token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Passwort erfolgreich zurückgesetzt." });
  } catch (err) {
    console.error("Fehler bei Passwort-Reset:", err);
    res.status(500).json({ message: "Interner Serverfehler." });
  }
});

module.exports = router;
