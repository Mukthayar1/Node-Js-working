const { MongoClient } = require("mongodb");
const databaseUrl = 'mongodb://localhost:27017';
const databaseString = 'ecommerce'
const connection = new MongoClient(databaseUrl)

async function DbCollection() {
    let result = await connection.connect()
    let db = result.db(databaseString)
    return db.collection('products')
}


module.exports = DbCollection