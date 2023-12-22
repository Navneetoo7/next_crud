const express = require('express');
const router = express.Router();
const Role  = require('../models/Role');
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({ include: Role });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  const { username, roleId } = req.body;

  try {
    const user = await User.create({ username, roleId });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a user' });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, roleId } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = username;
    user.roleId = roleId;
    await user.save();
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
