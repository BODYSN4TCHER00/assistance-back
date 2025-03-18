const express = require("express");
const router = express.Router();
const { registerUser, loginUser, updateUser, deleteUser, getAllUsers } = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const authController = require("../controllers/authController");

// Registrar un usuario
router.post("/register", registerUser);

// Iniciar sesión (login)
router.post("/login", loginUser);

// Obtener todos los usuarios
router.get("/users", getAllUsers);

// Actualizar un usuario
router.put("/update/:id", updateUser);

// Eliminar un usuario
router.delete("/delete/:id", deleteUser);

// Ruta para verificar el token
router.get("/verify", protect, authController.verifyToken);

module.exports = router;
