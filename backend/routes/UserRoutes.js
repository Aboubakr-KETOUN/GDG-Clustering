const express = require('express');
const { registerUser, getAllUsers, updateUser, deleteUser } = require('../controllers/UserController');

const router = express.Router();

router.post('/register', registerUser);
router.get('/', getAllUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;