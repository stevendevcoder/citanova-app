// Importamos multer, necesario para gestionar archivos form-data
const multer = require('multer');

// Importamos GridFsStorage desde multer-gridfs-storage
const { GridFsStorage } = require('multer-gridfs-storage');

// Importamos crypto para generar nombres únicos
const crypto = require('crypto');

// Importamos path para obtener la extensión del archivo
const path = require('path');

// Cargamos variables de entorno desde .env
require('dotenv').config();

// Configuramos el almacenamiento GridFS con multer-gridfs-storage
const storage = new GridFsStorage({
  // Usamos la URI de MongoDB definida en .env
  url: process.env.MONGO_URI,

  // Configuramos cómo se guardarán los archivos
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // Generamos un nombre aleatorio para el archivo
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);

        // Combinamos el hash con la extensión original del archivo
        const filename = buf.toString('hex') + path.extname(file.originalname);

        // Definimos los metadatos del archivo
        resolve({
          filename: filename,
          bucketName: 'uploads', // colección donde GridFS guardará los archivos
        });
      });
    });
  },
});

// Creamos el middleware de subida usando multer con nuestro almacenamiento configurado
const upload = multer({ storage });

// Exportamos el middleware para usarlo en las rutas
module.exports = upload;
