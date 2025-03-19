const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar cors
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Configurar CORS para permitir cualquier origen
app.use(cors({
  origin: '*', // Permitir cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
}));

// Middleware
app.use(bodyParser.json());

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/teachers', require('./routes/teacherRoutes'));
app.use('/api/groups', require('./routes/groupRoutes'));
app.use('/api/assistance', require('./routes/assistanceRoutes'));

const PORT = process.env.PORT || 5000;

// Exportar la instancia de app
module.exports = app;

// Iniciar el servidor
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
