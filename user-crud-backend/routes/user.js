const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

// Middleware to verify JWT and role-based authorization
const verifyTokenAndRole = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');

    const user = await User.findOne({ where: { id: decoded.userId } });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const role = await Role.findOne({ where: { id: user.roleId } });

    if (role.name !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

// Route to get a list of users (accessible to 'user' and 'admin')
router.get('/users', verifyTokenAndRole, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Route to create a new user (admin only)
router.post('/users', verifyTokenAndRole, async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, password: hashedPassword });
    res.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Route to update a user (admin only)
router.put('/users/:id', verifyTokenAndRole, async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username;
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
});

// Route to delete a user (admin only)
router.delete('/users/:id', verifyTokenAndRole, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;
