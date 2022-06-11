const express = require('express');
require('./config');
const Product = require('./Product/product');
const multer = require('multer');
const os = require('os')

console.log('Processer', os.arch())
console.log('Ram Free', os.freemem() / (1024 * 1024 * 1024))
console.log('Total Ram', os.freemem() / (1024 * 1024 * 1024))
console.log('System Namw', os.hostname())
console.log('Plateform', os.platform())
console.log('UserInfo', os.userInfo())


const app = express();
app.use(express.json());

const UploadFile = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.filename + "-" + Date.now() + ".jpg")
        }
    })
}).single('file');


app.post('/CreateProduct', async (req, res) => {
    let data = new Product(req.body);
    let result = await data.save()
    res.send(result)
});

app.get('/ReadProducts', async (req, res) => {
    let data = (await Product.find({}));
    res.send(data)
});

app.delete('/DeleteProduct/:_id', async (req, res) => {
    let deletedata = await Product.deleteOne(req.params)
    res.send(deletedata)
});

app.put('/Update/:_id', async (req, res) => {
    let deletedata = await Product.updateOne(

        req.params,
        {
            $set: req.body
        }
    )
    res.send(deletedata)
});


app.get('/SearchProduct/:key', async (req, res) => {

    let SearchKey = req.params.key
    let data = await Product.find({
        '$or': [
            { 'company': { $regex: SearchKey } },
            { 'name': { $regex: SearchKey } },
        ]
    })

    res.send(data)
});

app.post('/UploadFile', UploadFile, async (req, res) => {

    res.send('Uploaded')
});



app.listen(5000)