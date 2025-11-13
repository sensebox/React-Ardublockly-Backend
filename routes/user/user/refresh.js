const jwt = require("jsonwebtoken");
const User = require("../../../models/user");

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

module.exports = { refresh };
