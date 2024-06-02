const express = require('express');
const path = require('path');
const { PORT } = require('./config');
const connect = require('./db/db');
const apiAuth = require('./routes/auth');
const apiTask = require('./routes/task')

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.use('/api/auth', apiAuth);
app.use('/api/task', apiTask)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'register'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'login'));
});

app.get('/tasks', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'tasks.html'));
});

app.listen(PORT, () => {
    connect();
    console.log(`Server is started on port ${PORT}`);
});
