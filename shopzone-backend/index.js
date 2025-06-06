require('dotenv').config();

const express = require('express');
const conectarDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

conectarDB();

// Middleware para parsear JSON
app.use(express.json());

// Usar rutas de usuario
app.use('/api/usuarios', userRoutes);

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a ShopZone API');
});

// Iniciar Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});