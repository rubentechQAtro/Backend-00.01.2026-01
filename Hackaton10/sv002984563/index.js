console.log("Inicio de la aplicacion");
require("dotenv").config();
const express = require('express');
const { getDB } = require("./db");

getDB();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const listaRoute = require(`./src/routes/listaRoute`);

app.use("/", listaRoute);

app.get('/',(req,res)=>{
    res.send({message: "online"})
})

app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});