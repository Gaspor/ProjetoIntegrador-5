const express = require("express");
const app = express();
const { query } = require("./../../config/connection");
const { authenticateToken } = require("./../../middleware/auth");
const { decodeUser } = require("./../../config/decodeJWT");

app.post("/turma", authenticateToken, async (req, res) => {
    try {
        const user = decodeUser(req);

        if (user.cargo == "Aluno") {
            return res.json({ error: true, message: "Aluno não pode criar turma" });

        }

        const turma = await query("INSERT INTO turma(escola, grau, periodo, professor, createdat, updatedat) VALUES($1, $2, $3, $4, now(), now()) RETURNING id", [req.body.escola, req.body.grau, req.body.periodo, user.id]);
        return res.json({ error: false, message: "Turma criada com sucesso!", turmaid: turma.rows[0].id });

    } catch (error) {
        res.status(500).json({ error: true, message: error.message });

    }
});

app.post("/addaluno", authenticateToken, async (req, res) => {
    try {
        const user = decodeUser(req);

        if (user.cargo == "Aluno") {
            return res.json({ error: true, message: "Usuário não pode adicionar aluno na turma" });

        }

        await query("INSERT INTO aluno_turma(idaluno, idturma, createdat, updatedat) VALUES($1, $2, now(), now())", [req.body.idaluno, req.body.idturma]);
        return res.json({ error: false, message: "Aluno adicionado com sucesso!" });

    } catch (error) {
        res.status(500).json({ error: true, message: error.message });

    }
});

module.exports = app;
