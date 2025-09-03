// Importamos mongoose para definir el esquema del cliente
const mongoose = require('mongoose');
 
// Definimos el esquema del cliente
const servicioSchema = new mongoose.Schema({
 
  title: {
    type: String,
    required: true
  },
 
  text: {
    type: String,
    required: true
  },

  imgSrc: [String],

  priceRange: {
    type: Number,
    required: true 
  },

  features: [String],
 
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
 
//   profesional: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Profesional' // Referencia al modelo Sede
//   }

});
 
// Creamos un índice espacial para mejorar las consultas geográficas
servicioSchema.index({ ubicacion: '2dsphere' });
 
// Exportamos el modelo Cliente para usarlo en controladores y rutas
module.exports = mongoose.model('Servicio', servicioSchema);
 