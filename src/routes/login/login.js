const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { query } = require("./../../config/connection");

app.post('/login', async (req, res) => {
    try {
        const user = await query(`SELECT password FROM account WHERE email=$1;`, [req.body.email]);
        const encryptedPassword = user.rows[0].password;
        
        res.status(200).json(await bcrypt.compare(req.body.password, encryptedPassword));

    } catch (error) {
        res.status(500).json({ error: error.message });
    
    }
});

module.exports = app;
