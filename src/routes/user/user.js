const express = require("express");
const app = express();
const { query } = require("./../../config/connection");
const { authenticateToken } = require("./../../middleware/auth");

app.get('/dashboard', authenticateToken, async (req, res) => {
    try {
        return res.json({ message: "Success!" });

    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });
    }
});

module.exports = app;
