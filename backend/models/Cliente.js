// Importamos mongoose para definir el esquema del cliente
const mongoose = require('mongoose');
 
// Definimos el esquema del cliente
const clienteSchema = new mongoose.Schema({
 
  // Razón social del cliente (nombre legal)
  razonSocial: {
    type: String,
    required: true // Campo obligatorio
  },
 
  // Dirección textual del cliente (ej. Calle 123)
  direccion: {
    type: String,
    required: true // Campo obligatorio
  },
 
  // Ubicación geográfica del cliente (GeoJSON tipo "Point")
  ubicacion: {
    type: {
      type: String,
      enum: ['Point'], // Solo se acepta tipo "Point"
      required: true
    },
    coordinates: {
      type: [Number], // Formato: [longitud, latitud]
      required: true
    }
  },

  pais: {
    type: String,
    required: true // Campo obligatorio
  },
 
  // ID del archivo almacenado en GridFS (opcional)
  imagenId: {
    type: mongoose.Schema.Types.ObjectId, // ID del archivo en uploads.files
    ref: 'uploads.files', // Referencia a colección de archivos
    required: false // Este campo es opcional
  },
 
  // Arreglo de referencias a las sedes del cliente (0 a muchas)
  sedes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sede' // Referencia al modelo Sede
  }]
});
 
// Creamos un índice espacial para mejorar las consultas geográficas
clienteSchema.index({ ubicacion: '2dsphere' });
 
// Exportamos el modelo Cliente para usarlo en controladores y rutas
module.exports = mongoose.model('Cliente', clienteSchema);
 