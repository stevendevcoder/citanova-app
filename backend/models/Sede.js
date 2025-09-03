const mongoose = require('mongoose');

// Definición del esquema para Sede
const SedeSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true }, // Referencia al cliente propietario de la sede
  nombre: { type: String, required: true }, // Nombre de la sede
  direccion: { type: String, required: true }, // Dirección de la sede
  ubicacion: {
    type: { type: String, enum: ['Point'], required: true }, // Tipo de geometría (punto)
    coordinates: { type: [Number], required: true }, // Coordenadas [longitud, latitud]
  },
  imagenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Imagen' }, // Referencia a la imagen almacenada en GridFS
});

// Creación de un índice geoespacial en el campo 'ubicacion' para consultas eficientes
SedeSchema.index({ ubicacion: '2dsphere' });

// Exportación del modelo Sede basado en el esquema definido
module.exports = mongoose.model('Sede', SedeSchema);
