const router = require('express').Router();
const asyncHandler = require('../utils/asyncHandler');
const apiKey = require('../middlewares/apiKey');
const controller = require('../controllers/ticket.controller');



//Rutas Publicas

router.get('/',asyncHandler(controller.listTickets));
router.get('/:id',asyncHandler(controller.getTicketById));

//Rutas Protegidas

router.post('/', apiKey, asyncHandler(controller.createTicket));
router.put('/:id',apiKey,asyncHandler(controller.replaceTicket));
router.patch('/:id',apiKey,asyncHandler(controller.updateTicket));

router.delete('/:id',apiKey,asyncHandler(controller.deleteTicket));
router.post('/:id/close',apiKey,asyncHandler(controller.closeTicket));

module.exports = router;