const express = require("express");
const app = express();
const { query } = require("./../../config/connection");
const { authenticateToken } = require("./../../middleware/auth");

let refreshTokens = [];

app.get('/logged', authenticateToken, async (req, res) => {
    try {
        res.json({ message: "Success!" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
