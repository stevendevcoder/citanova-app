// Importamos el modelo Cliente
const Servicio = require('../models/Services');

// Importamos el acceso a GridFS
const { gfs } = require('../config/db');

// Importamos mongoose para trabajar con ObjectId
const mongoose = require('mongoose');

exports.crearServicio = async (req, res) => {
  try {
    console.log(req.body);
    
    const { title, text, imgSrc, rating, priceRange, features, ubicacion } = req.body;

    const nuevoServicio = {
      title,
      text,
      imgSrc,
      rating,
      priceRange,
      features,
      ubicacion
    };

    const servicioCreado = await Servicio.create(nuevoServicio);

    res.status(201).json(servicioCreado);
  } catch (error) {
    console.error('Error al crear el servicio:', error);
    res.status(500).json({ mensaje: 'Error al crear servicio', error });
  }
};

exports.obtenerServicios = async (req, res) => {
  try {
    // Obtenemos todos los clientes con sus sedes
    const servicios = await Servicio.find().exec();
    res.status(200).json(servicios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los servicios', error });
  }
};


