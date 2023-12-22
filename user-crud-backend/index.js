const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./db/database');

const usersRoute = require('./routes/user');

app.use(bodyParser.json());

app.use('/api/Users', usersRoute);

const PORT = process.env.PORT || 3000;

// Sync the Sequelize models with the database
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
