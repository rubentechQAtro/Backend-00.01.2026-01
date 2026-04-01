const { getDB } = require('../db');

// Crear item
async function crearItem(data) {
    const db = await getDB();

    const result = await db.collection('items').insertOne({
        nombre: data.nombre,
        descripcion: data.descripcion,
        fecha: new Date(),
        esCompletado: false
    });

    return result;
}

// Obtener pendientes
async function obtenerPendientes() {
    const db = await getDB();
    return await db.collection('items')
        .find({ esCompletado: false })
        .toArray();
}

// Obtener completados
async function obtenerCompletados() {
    const db = await getDB();
    return await db.collection('items')
        .find({ esCompletado: true })
        .toArray();
}

// Completar item
async function completarItem(id) {
    const db = await getDB();
    const { ObjectId } = require('mongodb');

    return await db.collection('items').updateOne(
        { _id: new ObjectId(id) },
        { $set: { esCompletado: true } }
    );
}

module.exports = {
    crearItem,
    obtenerPendientes,
    obtenerCompletados,
    completarItem
};