const User = require('../models/User');
const bcrypt = require('bcryptjs');

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

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }

        res.json({ mensaje: 'Login exitoso', userId: user._id });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
