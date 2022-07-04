const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { jwtTokens } = require("./../../config/jwt");
const { query } = require("../../config/connection");

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await query(
            "INSERT INTO account(username, password, email, createdat, updatedat) VALUES ($1, $2, $3, now(), now()) RETURNING *",
            [req.body.username, hashedPassword, req.body.email.toLowerCase()]
        );

        const cargo = req.body.cargo;
        if (cargo?.toLowerCase() == "professor") {
            await query("INSERT INTO professor(idprofessor, createdat, updatedat) VALUES ($1, now(), now())", [newUser.rows[0].id]);
            newUser.rows[0].cargo = "Professor";

        } else {
            await query("INSERT INTO aluno(idaluno, createdat, updatedat) VALUES ($1, now(), now())", [newUser.rows[0].id]);
            newUser.rows[0].cargo = "Aluno";

        }
        
        return res.status(201).json({ error: false, tokens: jwtTokens(newUser.rows[0]), user: { username: newUser.rows[0].username, email: newUser.rows[0].email, cargo: cargo }});

    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });

    }
});

module.exports = app;
