const jwt = require("jsonwebtoken");
const User = require("../../../models/user");
const bcrypt = require("bcryptjs");
const nativeLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required." });
  }

  try {
    const user = await User.findOne({ email, authProvider: "native" });
    if (!user) {
      return res.status(403).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Successfully signed in.",
      user: {
        email: user.email,
        role: user.role,
        blocklyRole: user.role,
        status: user.status,
        boxes: [], // oder lade ggf. eigene Boxen aus deiner DB
      },
      token,
      refreshToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed." });
  }
};

// 🔥 Neue Funktion: Nutzer löschen
const deleteUser = async (req, res) => {
  // ❗ Annahme: Diese Route ist mit `userAuthorization`-Middleware geschützt
  // → req.user ist verfügbar und enthält den eingeloggten Nutzer

  try {
    const userId = req.user._id;

    // Optional: Prüfe, ob der Nutzer auch wirklich "native" ist
    const user = await User.findOne({ _id: userId, authProvider: "native" });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or not a native account." });
    }

    // Nutzer löschen
    const result = await User.deleteOne({ _id: userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User account successfully deleted.",
    });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Failed to delete user." });
  }
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required." });
  }

  try {
    // Verifiziere den Refresh Token mit dem geheimen Schlüssel
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Hole den Nutzer aus der DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token." });
    }

    // Optional: Prüfe, ob der Nutzer noch "aktiv" oder native ist
    if (user.authProvider !== "native") {
      return res.status(403).json({ message: "Invalid refresh token." });
    }

    // Erstelle ein neues Access Token
    const newToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const newRefreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token: newToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    console.error("Refresh token error:", err.message);
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token." });
  }
};

module.exports = { nativeLogin, deleteUser, refresh };
