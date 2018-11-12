require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

require('./config/db');

app.use((req, res, next) => {
    req.io = io;
    return next();
});
app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server started on port ${process.env.SERVER_PORT}`);
});