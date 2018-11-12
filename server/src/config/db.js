const mongoose = require('mongoose');

const db = mongoose.connect(process.env.DB_URL,
    {
        useNewUrlParser: true
    });

module.exports = db;    