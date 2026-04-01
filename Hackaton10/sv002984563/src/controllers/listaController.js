const listaModel = require("../models/listaModel");

const crearItem = async (req, res) => {
    try{
        const data = req.body;
        data.esCompletado = false;

        const resultado = await listaModel.crear(data);
        res.json(resultado);
    }catch (error) {
        res.status(500).json({ error: "Error al crear"});
    }
};

const getPendientes = async (req, res) => {
    try{
        const data = await listaModel.obtenerPendientes();
        res.json(data);
    }catch (error) {
        res.status(500).json({ error: "Error" });
    }
};

const getCompletados = async (req, res) => {
    try {
        const data = await listaModel.obtenerCompletados();
        res.json(data);
    }catch (error) {
        res.status(500).json({ error: "Error" });
    }
}

const completarItem = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await listaModel.completar(id);
        res.json(resultado);
    }catch (error) {
        res.status(500).json({ error: "Error" });
    }
};

module.exports = {
    crearItem,
    getPendientes,
    getCompletados, 
    completarItem
} 