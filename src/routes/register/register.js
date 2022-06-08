const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { query } = require("../../config/connection");

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await query(
            "INSERT INTO account (username, password, email, cargo, createdat, updatedat) VALUES ($1, $2, $3, $4, now(), now()) RETURNING *",
            [req.body.username, hashedPassword, req.body.email, req.body.cargo]
        );
        
        res.status(201).json({ message: "success" });

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
});

module.exports = app;
