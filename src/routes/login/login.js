const express = require("express");
const app = express();
const {connect, query} = require("./../../config/connection");

app.get('/login', async (req, res) => {
    const quer = await query("SELECT * FROM account;");
    res.send(quer);

});

module.exports = app;
