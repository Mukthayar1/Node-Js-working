const DbCollection = require('../database')

const Delete = async () => {
    let db = await DbCollection()
    const Delete = await db.deleteMany({ name: 'AppP' })

    console.log('Delete',Delete)
}

module.exports = Delete