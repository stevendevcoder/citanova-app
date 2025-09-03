const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const clienteController = require('../controllers/clienteController');

router.post('/', upload.single('imagen'), clienteController.crearCliente);

// Crear cliente
router.post('/', upload.single('imagen'), clienteController.crearCliente);

// Obtener todos
router.get('/', clienteController.obtenerClientes);

// Obtener uno
router.get('/:id', clienteController.obtenerClientePorId);

// Obtener imagen
router.get('/imagen/:id', clienteController.obtenerImagenCliente);

// Actualizar
router.put('/:id', upload.single('imagen'), clienteController.actualizarCliente);

// Eliminar
router.delete('/:id', clienteController.eliminarCliente);

module.exports = router;
