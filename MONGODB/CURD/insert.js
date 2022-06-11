const DbCollection = require('../database')

const insert = async () => {

    let db = await DbCollection()
    const insert = db.insertOne({
        name:'Appo',modal:'vivo12',company:'vivo',price:12000,categories:'Mobiles'
    })    
}

module.exports = insert