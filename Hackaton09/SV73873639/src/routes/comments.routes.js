const express = require('express');
const { Comment, User } = require('../models');
const router = express.Router();

// POST /lessons/:lessonId/comments (crear comment)
router.post('/lessons/:lessonId/comments', async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { body, userId } = req.body;

    // El trim y validación mínima se ejecutan en el hook beforeCreate de models.js
    const newComment = await Comment.create({ body, lessonId, userId });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /lessons/:lessonId/comments?page=&pageSize= (lista paginada con include: [author])
router.get('/lessons/:lessonId/comments', async (req, res) => {
  try {
    const { lessonId } = req.params;
    const page = parseInt(req.query.page || '1');
    const pageSize = parseInt(req.query.pageSize || '10');

    const { rows, count } = await Comment.findAndCountAll({
      where: { lessonId },
      include: [{ model: User, as: 'author', attributes: ['id', 'firstName', 'lastName'] }],
      order: [['createdAt', 'DESC']],
      limit: pageSize,
      offset: (page - 1) * pageSize
    });

    res.json({ total: count, page, pageSize, data: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;