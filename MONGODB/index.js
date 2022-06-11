const express = require('express')
const DbCollection = require('./database')
const mongodb = require('mongodb')

const app = express();
const route = express.Router()

app.use(express.json())

// const data = require('./database');
const insert = require('./CURD/insert')
const update = require('./CURD/update')
const Delete = require('./CURD/delete')
const read = require('./CURD/read')

// const FilterMe = (req, res, next) => {
//     if (!req.query.age) {
//         res.send('Please Provide Age')
//     }
//     else if (req.query.age < 18) {
//         res.send('You can not acces')
//     }
//     else {
//         next()
//     }
// }

// route.use(FilterMe)

app.get('', (req, res) => {
    res.send('HOME PAGE')
})

app.get('/Products', async (req, res) => {
    await read().then((e) => {
        res.send(e);
    })
})

app.post('/AddProduct', async (req, res) => {
    let db = await DbCollection()
    const insert = await db.insertOne(req.body)
    res.send(insert);
})

app.put('/UpDate', async (req, res) => {
    let key_id;
    for (const key in req.query) {
        key_id = key;
    }

    console.log('key_id', key_id)

    let db = await DbCollection()
    const Update = await db.updateOne(
        { _id: new mongodb.ObjectId(key_id) },
        {
            $set: { name: req.body.name }
        }
    )
    res.send(Update)
})


app.delete('/delete', async (req, res) => {

    let key_id;
    for (const key in req.query) {
        key_id = key;
    }
    let db = await DbCollection()
    const Delete = await db.deleteMany({ _id: new mongodb.ObjectId(key_id) })
    res.send(Delete)
})

// route.get('/Private', (req, res) => {
//     res.send('Private PAGE');
// })



// app.use('/', route)


// data();
// insert();
// update();
// Delete();



app.listen(5000)