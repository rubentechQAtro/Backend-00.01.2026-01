module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El comentario no puede estar vacío' },
        len: {
          args: [3, 1000],
          msg: 'El comentario debe tener al menos 3 caracteres'
        }
      }
    },
    userId: DataTypes.INTEGER,
    lessonId: DataTypes.INTEGER
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId'
    });

    Comment.belongsTo(models.Lesson, {
      foreignKey: 'lessonId'
    });
  };

  // Hook
  Comment.beforeValidate((comment) => {
    if (comment.body) {
      comment.body = comment.body.trim();
    }
  });

  return Comment;
};