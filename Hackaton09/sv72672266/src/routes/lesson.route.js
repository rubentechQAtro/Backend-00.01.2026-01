const lessonController = require('../controllers/lesson.controller');
const commentController = require('../controllers/comment.controller');
const lessonRouter = require('express').Router();
const { authMiddleware, requireRole } = require('../middlewares/auth.middleware');

// Lessons
lessonRouter.put(
    '/:id',
    authMiddleware,
    requireRole('admin', 'instructor'),
    lessonController.updateLesson
);
lessonRouter.delete(
    '/:id',
    authMiddleware,
    requireRole('admin', 'instructor'),
    lessonController.deleteLesson
);

// Comments
lessonRouter.post(
    '/:lessonId/comments',
    authMiddleware,
    commentController.createComment
);
lessonRouter.get('/:lessonId/comments', commentController.getCommentsByLesson);

module.exports = { lessonRouter };