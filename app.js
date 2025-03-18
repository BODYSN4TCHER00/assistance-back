const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config(); // Carga las variables de entorno
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Importar rutas
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const groupRoutes = require("./routes/groupRoutes");


// Verificar que la variable DATABASE se cargó correctamente
console.log("DATABASE:", process.env.DATABASE || "No se encontró la variable DATABASE");

// Conexión a MongoDB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error de conexión a MongoDB:", err));

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(cors());

// Seguridad
app.use(mongoSanitize());
app.use(helmet());
app.use(hpp());

// Limitar solicitudes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 peticiones
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/groups", groupRoutes);


// Ruta no encontrada (404)
app.use((req, res, next) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Middleware de manejo de errores
const errorHandler = (err, req, res, next) => {
  console.error(err); // Solo para depuración
  res.status(500).json({ message: "Error interno del servidor" });
};
app.use(errorHandler);

// Servir archivos estáticos en producción
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// Configurar Socket.io
io.on("connection", (socket) => {
  console.log(`🟢 Usuario conectado: ${socket.id}`);
  socket.on("comment", (msg) => {
    io.emit("new-comment", msg);
  });
});

// Puerto del servidor
const port = process.env.PORT || 9000;

// Iniciar servidor
server.listen(port, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${port}`);
});

exports.io = io;
