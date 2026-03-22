const express = require('express');
const { sequelize, Enrollment, Course, User } = require('../models');
const router = express.Router();

// POST /courses/:courseId/enroll
router.post('/courses/:courseId/enroll', async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { courseId } = req.params;
    const { userId } = req.body;

    const enrollment = await Enrollment.create(
      { userId, courseId, status: 'pending' }, 
      { transaction: t }
    );
    
    await t.commit();
    res.status(201).json({ message: 'Inscripción pendiente creada', enrollment });
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: error.message });
  }
});

// PATCH /enrollments/:id/status
router.patch('/enrollments/:id/status', async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { status, score } = req.body;

    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) return res.status(404).json({ error: 'Inscripción no encontrada' });

    await enrollment.update({ status, score }, { transaction: t });

    if (status === 'active') {
      await Course.increment('studentsCount', { by: 1, where: { id: enrollment.courseId }, transaction: t });
    }

    await t.commit();
    res.json(enrollment);
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: error.message });
  }
});

// GET /courses/:courseId/enrollments
router.get('/courses/:courseId/enrollments', async (req, res) => {
  try {
    const { courseId } = req.params;
    const { status } = req.query;

    const where = { courseId };
    if (status) where.status = status;

    const enrollments = await Enrollment.findAll({
      where,
      include: [
        { 
          model: User, 
          attributes: ['id', 'firstName', 'lastName', 'email'] 
        }
      ]
    });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;