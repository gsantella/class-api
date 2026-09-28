import { Sequelize, DataTypes } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const User = sequelize.define('User',{
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
await sequelize.sync()

const jane = await User.create({
  username: 'janedoe',
  birthday: new Date(1980, 6, 20),
});

const users = await User.findAll();
console.log(users)
 