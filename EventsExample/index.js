const express = require('express')
const EventEmitters = require('events')
const event = new EventEmitters();

const app = express();
let count = 0
event.on('countApi', () => {
    count++
    console.log('Count===>',count)
})

app.get('/', (req, res) => {
    res.send('API RUNNNING')
    event.emit('countApi')
})
app.get('/search', (req, res) => {
    res.send('API RUNNNING')
})
app.get('/search2', (req, res) => {
    res.send('API RUNNNING')
})



app.listen(5000)
