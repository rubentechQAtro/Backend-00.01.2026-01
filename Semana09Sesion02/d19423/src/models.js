const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define("User",{
    firstName: { type: DataTypes.STRING, allowNull: false},
    lastName: { type: DataTypes.STRING, allowNull: false},
    email: { type: DataTypes.STRING, allowNull: false, unique:true},
    birthDate: { type:DataTypes.DATEONLY , allowNull:false, defaultValue:DataTypes.NOW},
    passwordHash: { type: DataTypes.STRING, allowNull:false},
    role: { type: DataTypes.ENUM('admin', 'author', 'reader')}
}, {tableName: 'users'});

module.exports = { sequelize, User};