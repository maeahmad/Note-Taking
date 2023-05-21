const express = require('express');// import express
const path = require('path');// package that create connections between files
let dataBase = require('./db/db.json')
const PORT = process.env.PORT || 3001;// connection point, look for a live port and use it browser. 
const fs = require("fs")
const app = express();// hold express instance at variable

app.use(express.json());// let file use json data
app.use(express.urlencoded({ extended: true }));// let file be able use http structure

app.use(express.static('public'));// grape public folder items and run them through the server

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);
app.get('/api/notes', (req, res) => {
    res.json(dataBase)
})
app.post('/api/notes', (req, res) => {
    //model based on values from our input and defines how the data is put into the database
    let newNotes = {
        title: req.body.title, // changes the frontend is making 
        text: req.body.text,
        id: Math.random() * 500
    }
    dataBase.push(newNotes)
    fs.writeFileSync('./db/db.json', JSON.stringify(dataBase))
    res.json(dataBase)// it goes in circle sending from backend to front to be updated. 
})


// runs port 
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
