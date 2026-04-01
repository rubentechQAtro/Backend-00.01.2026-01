const express = require('express');
const router = express.Router();
const controller = require('../controllers/item.controller');

router.post('/', controller.crear);
router.get('/pendientes', controller.pendientes);
router.get('/completados', controller.completados);
router.put('/:id', controller.completar);

module.exports = router;