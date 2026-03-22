const { User, Comment, Lesson } = require('../models');
const { Op } = require('sequelize');

exports.createComment = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { body } = req.body;
    const user = req.user;

    const lesson = await Lesson.findByPk(lessonId);

    if (!lesson) {
      return res.status(404).json({ message: 'Lección no encontrada' });
    }

    const comment = await Comment.create({
      body,
      userId: user.id,
      lessonId
    });

    return res.status(201).json(comment);

  } catch (error) {
    console.error(error);

    // Errores de validación Sequelize
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: error.errors.map(e => e.message)
      });
    }

    return res.status(500).json({
      message: 'Error creando comentario'
    });
  }
};

exports.getCommentsByLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const pageSize = Math.min(parseInt(req.query.pageSize) || 10, 100);

    const limit = pageSize;
    const offset = (page - 1) * limit;

    const { count, rows } = await Comment.findAndCountAll({
      where: { lessonId },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    return res.json({
      total: count,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
      data: rows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error obteniendo comentarios'
    });
  }
};