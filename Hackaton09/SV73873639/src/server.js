require('dotenv').config(); // Carga las variables de entorno
const express = require('express');
const { sequelize } = require('./models'); // Importamos la conexión y los modelos

const app = express();
app.use(express.json()); // Permite que nuestra API entienda formato JSON

// --- RUTAS DE LA API ---
const userRoutes = require('./routes/users.routes');
app.use('/users', userRoutes);

const courseRoutes = require('./routes/courses.routes');
app.use('/courses', courseRoutes);

// Las siguientes rutas las montamos en la raíz ('/') porque 
// adentro de sus archivos ya definimos la URL larga exacta que pide la rúbrica 
// (Ej: /courses/:courseId/lessons o /lessons/:lessonId/comments)
const enrollmentRoutes = require('./routes/enrollments.routes');
app.use('/', enrollmentRoutes); 

const lessonRoutes = require('./routes/lessons.routes');
app.use('/', lessonRoutes);

const commentRoutes = require('./routes/comments.routes');
app.use('/', commentRoutes);
// ------------------------

// Endpoint básico de prueba (Bienvenida)
app.get('/', (req, res) => {
  res.send('API Mini-Learning Platform Funcionando 🚀');
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Sincroniza los modelos con la base de datos
    // { alter: true } actualiza las tablas sin borrar los datos si modificamos algo
    await sequelize.sync({ alter: true });
    console.log('✅ Base de datos conectada y modelos sincronizados.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
}

startServer();