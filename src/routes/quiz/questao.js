const express = require("express");
const app = express();
const { query } = require("./../../config/connection");
const { authenticateToken } = require("./../../middleware/auth");
const { decodeUser } = require("./../../config/decodeJWT");

app.get("/getquestao", authenticateToken, async (req, res) => {
    try {
        const questoes = await query("SELECT * FROM questao WHERE idquestionario=$1", [req.body.idquestionario]);

        return res.json({ error: false, message: "Todos as questões desse question", questoes: questoes.rows });

    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });
    
    }
});

app.post("/questao", authenticateToken, async (req, res) => {
    try {
        const user = decodeUser(req);

        if (user.cargo == "Aluno") {
            return res.json({ error: true, message: "Aluno não pode inserir questões" });

        }
        
        await query("INSERT INTO questao(idquestionario, enunciado, createdat, updatedat) VALUES($1, $2, now(), now())", [req.body.idquestionario, req.body.enunciado]);
        return res.json({ error: false, message: "Questão inserida com sucesso" });

    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });
    
    }
});

module.exports = app;
