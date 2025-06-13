require('dotenv').config();

const express = require('express');
const conectarDB = require ('./config/db')
const userRoutes = require('./routes/userRoutes');

const app = express();

// 🔌 Conectar a MongoDB
conectarDB();

// 🧱 Middleware para parsear JSON
app.use(express.json());

// 🛣️ Rutas
app.use('/api/usuarios', userRoutes);

// 🌐 Ruta raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a ShopZone API');
});

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});