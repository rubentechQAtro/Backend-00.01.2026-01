console.log("Inicio de la aplicacion");
require("dotenv").config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        const db = client.db('sample_airbnb');
        const collection = db.collection('listingsAndReviews');
        const filtro = {
            property_type: "House"
        }
        const first = await collection.find(filtro).toArray();
        console.log(first.length)
    } catch (error) {
        console.log(error);
    }finally{
        client.close();
    }
}

run().catch(error=>{
    console.log(error);
})
