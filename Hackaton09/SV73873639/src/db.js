require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432, // <--- Añadimos el puerto de Postgres
    dialect: 'postgres',               // <--- Cambiamos de 'mysql' a 'postgres'
    logging: false, 
    define: {
      timestamps: true,
      paranoid: true 
    }
  }
);

module.exports = sequelize;