// Importación de módulos necesarios
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env
const express = require('express'); // Framework web para Node.js
const mongoose = require('mongoose'); // ODM para MongoDB
const cors = require('cors'); // Middleware para habilitar CORS
const clienteRoutes = require('./routes/clienteRoutes'); // Rutas para la entidad Cliente
const sedeRoutes = require('./routes/sedeRoutes'); // Rutas para la entidad Sede

// Creación de la aplicación Express
const app = express();

// Middlewares
app.use(cors()); // Habilita CORS para permitir solicitudes desde diferentes dominios
app.use(express.json()); // Habilita el parseo de JSON en las solicitudes entrantes

// Conexión a la base de datos MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, // Usa el nuevo analizador de URL de MongoDB
  useUnifiedTopology: true, // Usa el nuevo motor de gestión de conexiones
})
.then(() => console.log('Conectado a MongoDB Atlas')) // Mensaje en consola si la conexión es exitosa
.catch(err => console.error('Error al conectar a MongoDB Atlas:', err)); // Manejo de errores en la conexión

// Rutas
app.use('/api/clientes', clienteRoutes); // Define las rutas bajo el prefijo /api/clientes
app.use('/api/sedes', sedeRoutes); // Define las rutas bajo el prefijo /api/sedes

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000; // Usa el puerto definido en las variables de entorno o el 3000 por defecto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`); // Mensaje en consola indicando el puerto en uso
});
