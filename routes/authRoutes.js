const express = require("express");
const router = express.Router();
const { registerUser, loginUser, updateUser, deleteUser, getAllUsers } = require("../controllers/authController");

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

module.exports = router;
