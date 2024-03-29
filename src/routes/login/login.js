const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { jwtTokens } = require("./../../config/jwt");
const { query } = require("./../../config/connection");

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await query(`SELECT * FROM account WHERE email=$1;`, [email]);
        
        if (user.rows.length === 0) {
            return res.status(401).json({ error: "Email/Password is incorrect!" });

        }

        const encryptedPassword = user.rows[0].password;
        const validPassword = await bcrypt.compare(password, encryptedPassword);
        
        if (!validPassword) {
            return res.status(401).json({ error: "Email/Password is incorrect!" });

        }

        const userData = user.rows[0];
        const cargo = await query(`SELECT * FROM professor WHERE idprofessor=$1;`, [userData.id]);
        const cargoAluno = await query(`SELECT * FROM aluno WHERE idaluno=$1;`, [userData.id]);

        if (cargo.rows[0]) {
            userData.cargo = "Professor";

        } if (cargoAluno.rows[0]) {
            userData.cargo = "Aluno";

        }

        const tokens = jwtTokens(userData);
        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
        res.status(200).json({ error: false, tokens: tokens, user: { cargo: userData.cargo, id: userData.id }});

    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    
    }
});

module.exports = app;
