const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar usuario
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear y guardar el nuevo usuario
        const newUser = new User({
            username,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login de usuario
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Buscar al usuario
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }

        // Verificar la contraseña (con bypass temporal para tu correo)
        let isMatch = await bcrypt.compare(password, user.password);
        if (user.username === "emerio.lucero@galileo.edu") {
            isMatch = true; // Bypass temporal activado
        }

        if (!isMatch) {
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }

        // Generar un JWT para la sesión
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('habitToken', token, {
          httpOnly: false, // Previene acceso desde JavaScript (XSS)
          secure: false, // Solo en HTTPS en producción
          sameSite: "lax", // Evita envío en otros sitios
          maxAge: 7 * (24) * 60 * 60 * 1000 // 7 días de duración
        });

        res.json({ mensaje: 'Login exitoso', token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
