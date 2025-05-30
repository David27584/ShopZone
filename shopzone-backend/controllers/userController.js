// Simular base de datos temporal
const usuarios = [
    { id: 1, nombre: 'Carlos', correo: 'carlos@example.com' },
    { id: 2, nombre: 'Maria', correo: 'maria@example.com' },
    { id: 3, nombre: 'Luis', correo: 'luis@example.com' }
];

// GET /api/usuarios
const obtenerUsuarios = (req, res) => {
    res.json(usuarios);
};

// POST /api/usuarios
const registrarUsuario = (req, res) => {
    const { nombre, correo, contrasena } = req.body;
  
    if (!nombre || !correo || !contrasena) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    const nuevoUsuario = {
      id: Date.now(),
      nombre,
      correo
    };
  
    usuarios.push(nuevoUsuario);
  
    res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      usuario: nuevoUsuario
    });
};

module.exports = {
    obtenerUsuarios,
    registrarUsuario
};
