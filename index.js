const express = require('express')
const { PORT } = require('./config');
const connect = require('./db/db');

const app = express()

app.use(express.json())

app.listen(PORT, ()=>{
    connect();
    console.log(`Server is started on port ${PORT}`);
});