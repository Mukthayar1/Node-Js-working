const express = require('express');
const connection = require('./dbconnection');


const app = express();

app.use(express.json())

app.get('/GetUsers', (req, res) => {
    connection.query('select * from Users', (err, result) => {
        res.send(result)
    })

});

app.post('/PostData', (req, res) => {

    connection.query('INSERT INTO Users SET ? ', req.body, (err, result, fields) => {
        if (err) res.send(res);
        else res.send(result)
    })

});

app.put('/Update/:id', (req, res) => {
    const data = [req.body.Name, req.body.Email, req.body.age, req.params.id]
    connection.query('UPDATE Users SET Name = ? , Email = ? , age = ? WHERE id = ? ', data, (err, result, fields) => {

        if (err) res.send(err)
        else res.send(result)
    })
});

app.delete('/Delete/:id', (req, res) => {

    connection.query('DELETE FROM Users WHERE ID =' + req.params.id, (err, result, fields) => {
        if (err) res.send(res);
        else res.send(result)
    })

});

app.listen(5000)

