const { sequelize, User, Course, Lesson } = require('./models');

async function runSeed() {
  try {
    console.log('Sincronizando modelos para el Seed...');
    await sequelize.sync({ alter: true });

    // 1. Crear Usuarios
    await User.bulkCreate([
      { 
        firstName: 'Ada', 
        lastName: 'Lovelace', 
        email: 'ada@dev.io', 
        passwordHash: 'hashed_pass_123', 
        role: 'instructor' 
      },
      { 
        firstName: 'Linus', 
        lastName: 'Torvalds', 
        email: 'linus@dev.io', 
        passwordHash: 'hashed_pass_456', 
        role: 'student' 
      }
    ], { ignoreDuplicates: true }); // Evita errores si lo corres dos veces

    console.log('✅ Usuarios insertados');

    // 2. Crear un Curso (asignado a Ada, que es el ID 1)
    const [course] = await Course.findOrCreate({
      where: { slug: 'intro-node' },
      defaults: { 
        title: 'Intro a Node', 
        description: 'Curso base para aprender Node.js y Express', 
        published: true, 
        ownerId: 1 
      }
    });

    console.log('✅ Curso insertado');

    // 3. Crear Lecciones para el Curso
    await Lesson.bulkCreate([
      { title: 'Setup del Entorno', slug: 'setup', body: 'Instalación de Node y NPM, configuración inicial...', order: 1, courseId: course.id },
      { title: 'Servidores HTTP', slug: 'http', body: 'Creando un servidor básico con el módulo http...', order: 2, courseId: course.id }
    ], { ignoreDuplicates: true });

    console.log('✅ Lecciones insertadas');

    console.log('🎉 ¡Base de datos poblada con éxito!');
    process.exit(0); // Cierra el script correctamente
  } catch (error) {
    console.error('❌ Error al correr el seed:', error);
    process.exit(1);
  }
}

runSeed();