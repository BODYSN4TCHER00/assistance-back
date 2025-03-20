const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar cors
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

<<<<<<< HEAD
<<<<<<< HEAD
// Configurar CORS para permitir cualquier origen
app.use(cors({
  origin: '*', // Permitir cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
}));
=======
// Configurar CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Reemplaza con la URL de tu frontend
  credentials: true, // Permitir credenciales (cookies, tokens, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
};
app.use(cors(corsOptions));
>>>>>>> d59855b (app.js con cors)
=======
// Configurar CORS para permitir cualquier origen
app.use(cors({
  origin: '*', // Permitir cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
}));
>>>>>>> 4312ccc (3v)

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
<<<<<<< HEAD
}
=======
}
>>>>>>> d59855b (app.js con cors)
