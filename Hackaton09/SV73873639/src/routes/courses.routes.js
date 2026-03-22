const express = require('express');
const { Op } = require('sequelize');
const { Course, User, Lesson, Enrollment } = require('../models');

const router = express.Router();

// 1. POST /courses (Crear curso)
router.post('/', async (req, res) => {
  try {
    const { title, description, ownerId } = req.body;
    
    // El slug se generará automáticamente gracias al hook "beforeValidate" en models.js
    // "published" será false por defecto según nuestro modelo
    const newCourse = await Course.create({
      title,
      description,
      ownerId
    });

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. GET /courses (Listar con filtros y paginación)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1');
    const pageSize = parseInt(req.query.pageSize || '10');
    const published = req.query.published;
    const q = (req.query.q || '').trim();

    const where = {};
    if (published !== undefined) where.published = published === 'true';
    if (q) where.title = { [Op.iLike]: `%${q}%` }; // iLike es ideal en Postgres para ignorar mayúsculas/minúsculas

    const { rows, count } = await Course.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: pageSize,
      offset: (page - 1) * pageSize
    });

    res.json({ total: count, page, pageSize, data: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. GET /courses/:slug (Detalle con Eager Loading y conteos)
router.get('/:slug', async (req, res) => {
  try {
    const course = await Course.findOne({
      where: { slug: req.params.slug },
      include: [
        { model: User, as: 'owner', attributes: ['id', 'firstName', 'lastName'] }, // Evita traer la contraseña del dueño
        { model: Lesson, as: 'lessons', attributes: ['id', 'title', 'order'] }
      ]
    });

    if (!course) return res.status(404).json({ error: 'Curso no encontrado' });

    // Contamos los estudiantes activos inscritos usando la tabla intermedia
    const studentsCount = await Enrollment.count({ 
      where: { courseId: course.id, status: 'active' }
    });
    
    // Formateamos la respuesta mezclando los datos del curso y las estadísticas
    res.json({
      ...course.toJSON(),
      stats: {
        lessonsCount: course.lessons.length,
        studentsCount
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. PUT /courses/:id (Actualizar curso)
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ error: 'Curso no encontrado' });

    await course.update(req.body);
    res.json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 5. DELETE /courses/:id (Borrado lógico / Soft Delete)
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ error: 'Curso no encontrado' });

    await course.destroy(); // Gracias a "paranoid: true", esto no lo borra de la DB, solo le pone fecha en "deletedAt"
    res.json({ message: 'Curso eliminado lógicamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;