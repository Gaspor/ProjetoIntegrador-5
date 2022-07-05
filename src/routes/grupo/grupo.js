const express = require("express");
const app = express();
const { query } = require("./../../config/connection");
const { authenticateToken } = require("./../../middleware/auth");
const { decodeUser } = require("./../../config/decodeJWT");

app.post("grupo", authenticateToken, async (req, res) => {
    try {
        const user = decodeUser(req);

        if (user.cargo == "Aluno") {
            return res.json({ error: true, message: "Usuário não pode criar grupos" });

        }

        /* TODO: Tratar erros */
        await query("INSERT INTO grupo(nome, turmaid, createdat, updatedat) VALUES($1, $2, now(), now())", [req.body.nome, req.body.turmaid]);
        return res.json({ error: false, message: "Grupo criado com sucesso!" });

    } catch (error) {
        res.status(500).json({ error: true, message: error.message });

    }
});

app.post("addaluno", authenticateToken, async (req, res) => {
    try {
        const user = decodeUser(req);

        if (user.cargo == "Aluno") {
            return res.json({ error: true, message: "Usuário não pode adicionar pessoas grupos" });

        }

        /* TODO: Tratar erros */
        await query("INSERT INTO grupo_aluno(idaluno, idgrupo, createdat, updatedat) VALUES($1, $2, now(), now())", [req.body.idaluno, req.body.idgrupo]);
        return res.json({ error: false, message: "Aluno adicionado com sucesso!" });

    } catch (error) {
        res.status(500).json({ error: true, message: error.message });

    }
});

module.exports = app;