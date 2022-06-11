const DbCollection = require('../database')

const read = async () => {

    let data = await DbCollection();
    data = await data.find({}).toArray();
    return data
}

module.exports = read