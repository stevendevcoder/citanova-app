const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const sedeController = require('../controllers/sedeController');

// Crear sede
router.post('/', upload.single('imagen'), sedeController.crearSede);

// Obtener sede por ID
router.get('/:id', sedeController.obtenerSedePorId);

// Obtener imagen de sede
router.get('/imagen/:id', sedeController.obtenerImagenSede);

// Actualizar sede
router.put('/:id', upload.single('imagen'), sedeController.actualizarSede);

// Eliminar sede
router.delete('/:id', sedeController.eliminarSede);

module.exports = router;
