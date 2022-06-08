const express = require("express");
const app = express();
const {connect, query} = require("./../../config/connection");

app.post('/register', async (req, res) => {
    res.json({ error: false });

});

module.exports = app;
