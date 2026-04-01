const express = require("express");
const router = express.Router();

const {
    crearItem,
    getPendientes,
    getCompletados,
    completarItem
} = require("../controllers/listaController");

router.post("/lista", crearItem);
router.get("/pendientes", getPendientes);
router.get("/completados", getCompletados);
router.put("/completar/:id", completarItem);

module.exports = router;