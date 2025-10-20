const bcrypt = require("bcryptjs");
const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      password: hashedPassword,
      authProvider: "native",
    });

    await newUser.save();

    // Optional: JWT direkt ausstellen
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully.",
      user: { email: newUser.email, role: newUser.role },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed." });
  }
};
module.exports = { register };
