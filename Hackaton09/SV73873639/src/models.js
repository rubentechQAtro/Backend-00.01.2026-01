const { DataTypes } = require('sequelize');
const sequelize = require('./db');

// --- 1. DEFINICIÓN DE ENTIDADES ---

const User = sequelize.define('User', {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { 
    type: DataTypes.STRING, 
    unique: true, 
    validate: { isEmail: true } 
  },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  role: { 
    type: DataTypes.ENUM('admin', 'instructor', 'student'), 
    defaultValue: 'student' 
  }
});

const Course = sequelize.define('Course', {
  title: { 
    type: DataTypes.STRING, 
    unique: true, 
    validate: { len: [5, 255] } 
  },
  slug: { type: DataTypes.STRING, unique: true },
  description: { type: DataTypes.TEXT },
  published: { type: DataTypes.BOOLEAN, defaultValue: false },
  studentsCount: { type: DataTypes.INTEGER, defaultValue: 0 }
});

Course.addScope('published', { where: { published: true } });

const Lesson = sequelize.define('Lesson', {
  title: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING },
  body: { 
    type: DataTypes.TEXT, 
    validate: { len: [20, 5000] } 
  },
  order: { type: DataTypes.INTEGER, defaultValue: 0 }
});

const Enrollment = sequelize.define('Enrollment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: { 
    type: DataTypes.ENUM('active', 'pending'), 
    defaultValue: 'pending' 
  },
  score: { type: DataTypes.DECIMAL(5, 2), allowNull: true }
});

const Comment = sequelize.define('Comment', {
  body: { type: DataTypes.TEXT, allowNull: false }
});

// --- 2. HOOKS ---

Course.beforeValidate(course => {
  if (!course.slug && course.title) {
    course.slug = course.title.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');
  }
  if (course.title) course.title = course.title.trim();
});

Comment.beforeCreate(comment => {
  comment.body = comment.body.trim();
  if (comment.body.length === 0) throw new Error('El comentario no puede estar vacío');
});

Lesson.beforeValidate(lesson => {
  if (!lesson.slug && lesson.title) {
    lesson.slug = lesson.title.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');
  }
});

// --- 3. RELACIONES ---

// User (instructor) 1:N Course
User.hasMany(Course, { as: 'ownedCourses', foreignKey: 'ownerId' });
Course.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });

// Course 1:N Lesson
Course.hasMany(Lesson, { as: 'lessons', foreignKey: 'courseId' });
Lesson.belongsTo(Course, { foreignKey: 'courseId' });

// User N:M Course
User.belongsToMany(Course, { through: Enrollment, foreignKey: 'userId', otherKey: 'courseId' });
Course.belongsToMany(User, { through: Enrollment, foreignKey: 'courseId', otherKey: 'userId' });

// RELACIONES DIRECTAS CON ENROLLMENT (Necesarias para el include del GET)
Enrollment.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Enrollment, { foreignKey: 'userId' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId' });
Course.hasMany(Enrollment, { foreignKey: 'courseId' });

// Lesson 1:N Comment; User 1:N Comment
Lesson.hasMany(Comment, { foreignKey: 'lessonId' });
Comment.belongsTo(Lesson, { foreignKey: 'lessonId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { as: 'author', foreignKey: 'userId' });

module.exports = { sequelize, User, Course, Lesson, Enrollment, Comment };