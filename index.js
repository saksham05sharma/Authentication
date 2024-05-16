const express = require('express')
const { PORT } = require('./config');
const connect = require('./db/db');
const apiAuth = require('./routes/auth')

const app = express()

app.use(express.json())

app.use('/api/auth',apiAuth)

app.listen(PORT, ()=>{
    connect();
    console.log(`Server is started on port ${PORT}`);
});