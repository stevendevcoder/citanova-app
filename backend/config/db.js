// Importamos el módulo mongoose para interactuar con MongoDB
const mongoose = require('mongoose');
 
// Importamos el módulo Grid para trabajar con GridFS, que permite el almacenamiento de archivos grandes en MongoDB
const Grid = require('gridfs-stream');
 
// Obtenemos la conexión por defecto de mongoose
const conn = mongoose.connection;
 
// Declaramos una variable para almacenar la instancia de GridFS
let gfs;
 
// Una vez que la conexión a la base de datos esté abierta, inicializamos GridFS
conn.once('open', () => {
  // Inicializamos GridFS pasando la conexión de la base de datos y el objeto de mongoose
  gfs = Grid(conn.db, mongoose.mongo);
  // Especificamos el nombre de la colección donde se almacenarán los archivos
  gfs.collection('uploads');
});
 
// Exportamos el objeto gfs para que pueda ser utilizado en otros módulos
module.exports = { gfs };
 