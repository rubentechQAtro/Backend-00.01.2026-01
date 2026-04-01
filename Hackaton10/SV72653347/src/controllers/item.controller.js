const itemModel = require('../models/item.model');

// Crear
async function crear(req, res) {
    try {
        const result = await itemModel.crearItem(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Pendientes
async function pendientes(req, res) {
    try {
        const data = await itemModel.obtenerPendientes();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Completados
async function completados(req, res) {
    try {
        const data = await itemModel.obtenerCompletados();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Completar
async function completar(req, res) {
    try {
        const result = await itemModel.completarItem(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    crear,
    pendientes,
    completados,
    completar
};