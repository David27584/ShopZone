const Usuario = require ('../models/userModel')

/* Simular base de datos temporal
const usuarios = [
    { id: 1, nombre: 'Carlos', correo: 'carlos@example.com' },
    { id: 2, nombre: 'Maria', correo: 'maria@example.com' },
    { id: 3, nombre: 'Luis', correo: 'luis@example.com' }
];*/

// GET /api/usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, '-contrasena');
    res.json(usuarios);
  } catch {
    res.status(500).json({ mensaje : 'Error al obtener usuarios' });
    }
};

// GET /api/usuario:id
const obtenerUsuarioId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-contrasena');

    if(!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el usuario' });
  }
};

// POST /api/usuarios
const registrarUsuario = async (req, res) => {
  const { nombre, correo, contrasena } = req.body;
  
  if (!nombre || !correo || !contrasena) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  
  try {
    const existeUsuario = await Usuario.findOne({ correo });
    if (existeUsuario) {
      return res.status(400).json({ error: 'El correo ya est´s registrado' });
    }

    const nuevoUsuario = new Usuario ({
      nombre,
      correo,
      contrasena
    });

    const usuarioGuardado = await nuevoUsuario.save();

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      usuario: usuarioGuardado
    });
  } catch {
    res.status(500).json({ error: 'Error al registrar usuario' })
  }
};

// PUT /api/usuario:id
const actualizarUsuario = async (req, res) => {
  const { nombre, correo } = req.body;

  try {
    const usuario = await Usuario.findById(req.params.id);

    if(!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar los campos
    usuario.nombre = nombre || usuario.nombre;
    usuario.correo = correo || usuario.correo;

    const usuarioActualizado = await usuario.save();

    res.json({
      mensaje: 'Usuario actualizado correctamente',
      usuario: {
        _id: usuarioActualizado._id,
        nombre: usuarioActualizado.nombre,
        correo: usuarioActualizado.correo,
        fechaRegistro: usuarioActualizado.fechaRegistro
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// DELETE /api/usuario:id
const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encotrado' });
    }

    // Eliminar el cliente
    await usuario.deleteOne();
    res.json({ mensaje: 'Usuario eliminado correctamente' });

  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioId,
    registrarUsuario,
    actualizarUsuario,
    eliminarUsuario
};
