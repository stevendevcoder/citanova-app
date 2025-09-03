// Importamos el modelo de Sede y Cliente
const Sede = require('../models/Sede');
const Cliente = require('../models/Cliente');

// Importamos acceso a GridFS
const { gfs } = require('../config/db');

// Importamos mongoose para manejo de ObjectId
const mongoose = require('mongoose');


// ====================================
// Crear una nueva sede para un cliente
// ====================================
exports.crearSede = async (req, res) => {
  try {
    // Extraemos campos del cuerpo
    console.log(req.body);
    const { clienteId, nombre, direccion, ubicacion } = req.body;
    const imagenId = req.file ? req.file.id : null;
    
    // Verificamos que el cliente exista
    const cliente = await Cliente.findById({"_id":clienteId});
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    // Creamos nueva sede
    const nuevaSede = new Sede({
      cliente: clienteId,
      nombre,
      direccion,
      ubicacion: JSON.parse(ubicacion),
      imagenId,
    });

    // Guardamos la sede
    const sedeGuardada = await nuevaSede.save();

    // Asociamos la sede al cliente
    cliente.sedes.push(sedeGuardada._id);
    await cliente.save();

    res.status(201).json(sedeGuardada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la sede', error });
  }
};


// =======================
// Obtener sede por su ID
// =======================
exports.obtenerSedePorId = async (req, res) => {
  try {
    console.log(req.params);
    
    const { id } = req.params;
    const sede = await Sede.findById(id).populate('cliente').exec();

    if (!sede) {
      return res.status(404).json({ mensaje: 'Sede no encontrada' });
    }

    res.status(200).json(sede);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la sede', error });
  }
};


// ===========================
// Actualizar sede por su ID
// ===========================
exports.actualizarSede = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, ubicacion } = req.body;
    const imagenId = req.file ? req.file.id : null;

    const sedeActualizada = await Sede.findByIdAndUpdate(
      id,
      {
        nombre,
        direccion,
        ubicacion: JSON.parse(ubicacion),
        ...(imagenId && { imagenId })
      },
      { new: true }
    );

    if (!sedeActualizada) {
      return res.status(404).json({ mensaje: 'Sede no encontrada' });
    }

    res.status(200).json(sedeActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la sede', error });
  }
};


// ==========================
// Eliminar sede por su ID
// ==========================
exports.eliminarSede = async (req, res) => {
  try {
    const { id } = req.params;
    const sede = await Sede.findByIdAndDelete(id);

    if (!sede) {
      return res.status(404).json({ mensaje: 'Sede no encontrada' });
    }

    // Remover referencia en el cliente
    await Cliente.findByIdAndUpdate(sede.cliente, {
      $pull: { sedes: sede._id }
    });

    res.status(200).json({ mensaje: 'Sede eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la sede', error });
  }
};


// ==================================
// Obtener imagen asociada a la sede
// ==================================
exports.obtenerImagenSede = async (req, res) => {
  try {
    const { id } = req.params;
    const objectId = new mongoose.Types.ObjectId(id);
    const file = await gfs.files.findOne({ _id: objectId });

    if (!file) {
      return res.status(404).json({ mensaje: 'Imagen no encontrada' });
    }

    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la imagen de la sede', error });
  }
};
