const express = require("express");
const app = express();
const {connect, query} = require("./../../config/connection");

app.get('/login', async (req, res) => {
    try {
        const users = await query("SELECT * FROM account;");
        res.json({ users : users.rows });

    } catch (error) {
        res.status(500).json({ error: error.message });
    
    }
});

module.exports = app;
