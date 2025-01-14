const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error('❌ Error fetching users:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

const registerUser = async (req, res) => {
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

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await user.save();
    res.status(201).json({ message: '✅ User updated successfully!' });
  }
  catch (err) {
    console.error('❌ Error updating user:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: '✅ User deleted successfully!' });
  }
  catch (err) {
    console.error('❌ Error deleting user:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { 
  registerUser,
  updateUser,
  deleteUser,
  getAllUsers
 };