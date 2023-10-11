// backend/index.js
const express = require('express');
const sequelize = require('./config/database'); // Import the database configuration
const User = require('./models/User');
const Role = require('./models/Role');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();

// Define associations between User and Role models here.
User.belongsTo(Role);
Role.hasMany(User);

// Middleware for parsing JSON requests
app.use(express.json());

// Use authentication routes
app.use('/auth', authRoutes);

// Use user routes
app.use('/api', userRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => console.error('Error syncing database:', err));
