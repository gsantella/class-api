import { Sequelize, DataTypes } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: false, // hides the SQL spam; set to console.log to see queries
});

const User = sequelize.define('User', {
  username: DataTypes.STRING,
  birthday: DataTypes.DATE,
});

try {
  await sequelize.authenticate();
  await sequelize.sync(); // creates the table only if it doesn't exist

  await User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20),
  });

  const users = await User.findAll();
  console.log(users.map(u => u.toJSON())); // readable output
} catch (error) {
  console.error('Database error:', error);
} finally {
  await sequelize.close();
}