const express = require('express');
const { Lesson, Course } = require('../models');
const router = express.Router();

// POST /courses/:courseId/lessons (crea lección y asigna order incremental)
router.post('/courses/:courseId/lessons', async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, body } = req.body;

    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ error: 'Curso no encontrado' });

    // Calcula el order incremental automáticamente (busca el mayor y le suma 1)
    const maxOrderLesson = await Lesson.findOne({
      where: { courseId },
      order: [['order', 'DESC']]
    });
    const nextOrder = maxOrderLesson ? maxOrderLesson.order + 1 : 1;

    const newLesson = await Lesson.create({ title, body, order: nextOrder, courseId });
    res.status(201).json(newLesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /courses/:courseId/lessons?order=ASC (lista con orden e include mínimo del curso)
router.get('/courses/:courseId/lessons', async (req, res) => {
  try {
    const { courseId } = req.params;
    const orderParam = req.query.order === 'DESC' ? 'DESC' : 'ASC';

    const lessons = await Lesson.findAll({
      where: { courseId },
      include: [{ model: Course, attributes: ['id', 'title'] }],
      order: [['order', orderParam]]
    });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /lessons/:id (editar)
router.put('/lessons/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Lección no encontrada' });
    await lesson.update(req.body);
    res.json(lesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /lessons/:id (soft delete)
router.delete('/lessons/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Lección no encontrada' });
    await lesson.destroy();
    res.json({ message: 'Lección eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;