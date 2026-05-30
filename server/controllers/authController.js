const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper: generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// @POST /api/auth/register
const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      year,
      branch,
      enrollmentNumber
    } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: 'Email already registered',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Count users (for admin assignment)
    const userCount = await User.countDocuments();

    // ✅ Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      year,
      branch,
      enrollmentNumber,
      role: userCount === 0 ? 'admin' : 'user', 
    });

    res.status(201).json({
      message: 'Registered successfully',
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        year: user.year,
        branch: user.branch,
        enrollmentNumber: user.enrollmentNumber
      },
    });

  } catch (err) {
    console.error('REGISTER ERROR:', err);
    res.status(500).json({ message: err.message });
  }
};

// @POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.status(500).json({ message: err.message });
  }
};

// @GET /api/auth/me
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error('GETME ERROR:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login, getMe };