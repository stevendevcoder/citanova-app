// Importamos el modelo Cliente
const Cliente = require('../models/Cliente');

// Importamos el acceso a GridFS
const { gfs } = require('../config/db');

// Importamos mongoose para trabajar con ObjectId
const mongoose = require('mongoose');


// ===========================
// Crear un nuevo cliente
// ===========================
exports.crearCliente = async (req, res) => {
  try {
    const { razonSocial, direccion, pais, ubicacion } = req.body;

    // Creamos el objeto base para el nuevo cliente
    const nuevoCliente = {
      razonSocial,
      direccion,
      pais,
      ubicacion: JSON.parse(ubicacion)
    };

    // Si llega una imagen, agregamos el campo imagenId
    if (req.file && req.file.id) {
      nuevoCliente.imagenId = req.file.id;
    }

    // Guardamos en la base de datos
    const clienteCreado = await Cliente.create(nuevoCliente);

    // Enviamos el cliente creado como respuesta
    res.status(201).json(clienteCreado);
  } catch (error) {
    console.error('Error al crear el cliente:', error);
    res.status(500).json({ mensaje: 'Error al crear cliente', error });
  }
};


// ===========================
// Obtener todos los clientes
// ===========================
exports.obtenerClientes = async (req, res) => {
  try {
    // Obtenemos todos los clientes con sus sedes
    const clientes = await Cliente.find().populate('sedes').exec();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los clientes', error });
  }
};


// ===========================
// Obtener cliente por ID
// ===========================
exports.obtenerClientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findById(id).populate('sedes').exec();

    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el cliente', error });
  }
};


// ===========================
// Actualizar cliente por ID
// ===========================
exports.actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { razonSocial, direccion, pais, ubicacion } = req.body;
    const imagenId = req.file ? req.file.id : null;

    if (!req.file) {
      return res.status(400).json({ mensaje: 'No se envió ninguna imagen' });
    }

    // Actualizamos campos
    const clienteActualizado = await Cliente.findByIdAndUpdate(
      id,
      {
        razonSocial,
        direccion,
        pais,
        ubicacion: JSON.parse(ubicacion),
        ...(imagenId && { imagenId }) // Solo actualiza imagen si viene una nueva
      },
      { new: true }
    );

    if (!clienteActualizado) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    res.status(200).json(clienteActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el cliente', error });
  }
};


// ===========================
// Eliminar cliente por ID
// ===========================
exports.eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteEliminado = await Cliente.findByIdAndDelete(id);

    if (!clienteEliminado) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    res.status(200).json({ mensaje: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el cliente', error });
  }
};


// ===========================
// Obtener imagen desde GridFS
// ===========================
exports.obtenerImagenCliente = async (req, res) => {
  try {
    const { id } = req.params;

    // Convertimos a ObjectId de MongoDB
    const objectId = new mongoose.Types.ObjectId(id);

    // Buscamos el archivo en GridFS
    const file = await gfs.files.findOne({ _id: objectId });

    if (!file) {
      return res.status(404).json({ mensaje: 'Imagen no encontrada' });
    }

    // Creamos un stream de lectura y lo enviamos como respuesta
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la imagen', error });
  }
};