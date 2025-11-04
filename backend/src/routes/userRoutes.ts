import { Router } from 'express';
import { User } from '../models/User';
//import bcrypt from 'bcrypt';
import bcrypt from "bcryptjs";
const router = Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verifica que no exista un usuario con el mismo correo
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      results: [] // inicializa el historial vacío
    });

    await user.save();
    res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(400).json({ error: 'No se pudo registrar el usuario.' });
  }
});

// Inicio de sesión (con username o email)
router.post('/login', async (req, res) => {
  try {
    const { loginValue, password } = req.body;

    let user;
    if (loginValue.includes('@')) {
      user = await User.findOne({ email: loginValue });
    } else {
      user = await User.findOne({ username: loginValue });
    }

    if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(400).json({ error: 'No se pudo iniciar sesión.' });
  }
});

// Obtener usuario por ID (con resultados)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
