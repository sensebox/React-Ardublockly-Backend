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
module.exports = { nativeLogin };
