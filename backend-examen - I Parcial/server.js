const express = require('express');
const cors = require('cors'); // Para manejar CORS
const app = express();
const port = 5000;

// Middleware
app.use(express.json()); // Para parsear JSON
app.use(cors()); // Habilitar CORS

// Importar las rutas
const gastoRoutes = require('./routes/gasto');
app.use('/gasto', gastoRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});