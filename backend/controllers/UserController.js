const User = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, dateOfBirth } = req.body;

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      gender,
      dateOfBirth,
    });

    await user.save();
    res.status(201).json({ message: '✅ User registered successfully!' });
  } catch (err) {
    console.error('❌ Error registering user:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};