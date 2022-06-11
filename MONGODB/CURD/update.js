const DbCollection = require('../database')

const update = async () => {

    let db = await DbCollection()
    const update = db.updateMany(
        { name: 'Appo' },
        {
            $set: { name: 'AppP' }
        }
    )
}

module.exports = update