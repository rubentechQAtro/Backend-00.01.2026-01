const express = require('express');
const { Op } = require('sequelize'); // Operadores de Sequelize para el buscador
const { User } = require('../models'); // Importamos el modelo User

const router = express.Router();

// 1. GET /users (Listar con filtros y paginación)
router.get('/', async (req, res) => {
  try {
    // Tomamos los valores de la URL (query params) o asignamos valores por defecto
    const page = parseInt(req.query.page || '1');
    const pageSize = parseInt(req.query.pageSize || '10');
    const role = req.query.role;
    const q = (req.query.q || '').trim();

    // Construimos las condiciones de búsqueda dinámicamente
    const where = {};
    if (role) where.role = role;
    if (q) {
      where[Op.or] = [
        { firstName: { [Op.like]: `%${q}%` } },
        { lastName: { [Op.like]: `%${q}%` } },
        { email: { [Op.like]: `%${q}%` } }
      ];
    }

    // Buscamos en la base de datos
    const { rows, count } = await User.findAndCountAll({
      where,
      limit: pageSize,
      offset: (page - 1) * pageSize,
      attributes: { exclude: ['passwordHash'] } // Por seguridad, nunca devolvemos contraseñas
    });

    res.json({ total: count, page, pageSize, data: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. POST /users (Crear usuario)
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, passwordHash, role } = req.body;
    
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      passwordHash,
      role: role || 'student' // 'student' por defecto como pide el reto
    });

    // Clonamos el objeto y le quitamos la contraseña antes de responder
    const userResponse = newUser.toJSON();
    delete userResponse.passwordHash;

    res.status(201).json(userResponse);
  } catch (error) {
    // Si el correo ya existe, Sequelize lanza este error específico
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'El email ya está registrado en el sistema' });
    }
    // Para otros errores (como que falte el nombre)
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;