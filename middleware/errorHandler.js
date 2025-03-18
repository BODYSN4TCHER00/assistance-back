// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err); // Muestra el error en la consola
  
    // Verifica si es un error de 404 (ruta no encontrada)
    if (err.message === 'Not Found') {
      return res.status(404).json({ message: "Ruta no encontrada" });
    }
  
    // Manejo de errores generales
    res.status(err.status || 500).json({
      message: err.message || 'Algo salió mal en el servidor',
      error: process.env.NODE_ENV === 'development' ? err : {} // Muestra detalles del error solo en desarrollo
    });
  };
  
  module.exports = errorHandler;
  