const express = require('express');
const app = express();
const PORT = 3000;
const userRoutes = require('./routes/userRoutes');

// Middleware para parsear JSON
app.use(express.json());

// Usar rutas de usuario
app.use('/api/usuarios', userRoutes);

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a ShopZone API');
});

// Iniciar Servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});