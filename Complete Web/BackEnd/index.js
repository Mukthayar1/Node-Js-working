const express = require('express');
const cors = require('cors')

//DATABASE
require('./db/config');
const UserSchema = require('./db/schemas/users')
const ProductSchema = require('./db/schemas/products')

//Tokens
const Jwt = require('jsonwebtoken');
const JwtKey = '01-nuk-09';


const app = express()
app.use(express.json())
app.use(cors());

//AuthToken Check

function VerifyJwtToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        Jwt.verify(token, JwtKey, (err, sucess) => {
            if (err) res.send('404 Token not valid');
            else next();
        })

        console.warn('MIDDLE WAR CALL', token)
    } else res.send('404 Token not found');
    
}


///AUTH APIS

app.post('/Register', async (req, res) => {
    let NewUser = new UserSchema(req.body)
    let Result = await NewUser.save();
    Result = Result.toObject();
    delete Result.Password
    res.send(Result)
})

app.post('/Login', async (req, res) => {
    let user = await UserSchema.find(req.body).select('-Password')

    if (user) {

        Jwt.sign({ data: user }, JwtKey, { expiresIn: '1h' }, (err, token) => {
            res.send({ user, AuthToken: token })
            if (err) res.send('Token Generation Failed');
        });
    } else res.send('No User Found');



})

///PRODUCT APIS

app.post('/AddProducts', async (req, res) => {
    let NewProduct = await ProductSchema(req.body);
    let Result = await NewProduct.save();
    res.send(Result)
})

app.get('/AllProducts', async (req, res) => {
    let ProductList = await ProductSchema.find({});
    if (ProductList.length > 0) {
        res.send(ProductList)
    }
    else {
        res.send('No Data Found')
    }
})

app.delete('/DeleteProduct/:id', async (req, res) => {
    const Result = await ProductSchema.deleteOne({ _id: req?.params.id });
    res.send(Result)
})

app.put('/UpdateProduct/:id', async (req, res) => {
    const Result = await ProductSchema.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(Result)
})

app.get('/Search/:key', VerifyJwtToken, async (req, res) => {

    const Result = await ProductSchema.find({
        '$or': [
            { Product_Name: { $regex: req.params.key } },
            { Services: { $regex: req.params.key } },
        ]
    });

    res.send(Result)
})


app.listen(5000)

