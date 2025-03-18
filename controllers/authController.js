const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registrar un usuario
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Verifica si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Cifra la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crea el nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Guarda el usuario en la base de datos
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Hubo un error al registrar el usuario" });
  }
};

// Iniciar sesión
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Crear y firmar el token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Hubo un error al iniciar sesión" });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();
    res.json({ message: "Usuario actualizado con éxito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Hubo un error al actualizar el usuario" });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado con éxito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Hubo un error al eliminar el usuario" });
  }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Excluir la contraseña por seguridad
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Hubo un error al obtener los usuarios" });
  }
};
