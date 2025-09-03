const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const serviceController = require('../controllers/serviceController');

// router.post('/', upload.single('imagen'), clienteController.crearCliente);

// Crear uno
router.post('/', upload.single('imagen'), serviceController.crearServicio);

// Obtener todos
router.get('/', serviceController.obtenerServicios);



module.exports = router;
