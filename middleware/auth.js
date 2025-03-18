// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Acceso denegado, no se proporcionó token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Almacenar la información del usuario en `req.user`
    next();
  } catch (err) {
    res.status(400).json({ error: "Token no válido" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "No tienes permisos de administrador" });
  }
  next();
};

module.exports = {
  protect,
  isAdmin,
};
