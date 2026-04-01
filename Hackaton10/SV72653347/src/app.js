require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());

// Rutas
app.use('/items', require('./routes/item.route'));

app.listen(process.env.PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${process.env.PORT}`);
});