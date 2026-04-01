const { getDB } = require("../../db");
const { ObjectId } = require("mongodb");

const getCollection = async() => {
    const db = await getDB();
    return db.collection("compras");
};

const crear = async(data) => {
    const col = await getCollection();
    return await col.insertOne(data)
};

const obtenerPendientes = async() => {
    const col = await getCollection();
    return await col.find({ esCompletado: false }).toArray();
};

const obtenerCompletados = async() => {
    const col = await getCollection();
    return await col.find({ esCompletado:true}).toArray();
}

const completar = async(id) => {
    const col = await getCollection();
    return await col.updateOne(
        {_id: new ObjectId(id)},
        {$set: {esCompletado:true}} 
    );
};

module.exports = {
    crear,
    obtenerPendientes,
    obtenerCompletados,
    completar
}; 