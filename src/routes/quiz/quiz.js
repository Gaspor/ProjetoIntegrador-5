const express = require("express");
const app = express();
const { query } = require("./../../config/connection");
const { authenticateToken } = require("./../../middleware/auth");
const { decodeUser } = require("./../../config/decodeJWT");

app.put("/quiz", authenticateToken, async (req, res) => {
    try {
        const questionarios = await query("SELECT id, titulo, status FROM questionario WHERE professor=$1", [req.body.idprofessor]);

        return res.json({ error: false, message: "Todos os questionários desse professor", questionarios: questionarios.rows });

    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });
    
    }
});

app.post('/quiz', authenticateToken, async (req, res) => {
    try {
        const user = decodeUser(req);

        if (user.cargo == "Aluno") {
            return res.json({ error: true, message: "Unauthorized!" });

        }

        const idQuestionario = await query("INSERT INTO questionario(professor, titulo, status, createdat, updatedat) VALUES($1, $2, $3, now(), now()) RETURNING id", [user.id, req.body.titulo, "Criado"])
        return res.json({ error: false, message: "Criado um questionário para o professor/a com o titulo " + req.body.titulo, idQuestionario: idQuestionario });

    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });

    }
});

app.delete("/quiz", authenticateToken, async (req, res) => {
    try {
        const user = decodeUser(req);

        if (user.cargo == "Aluno") {
            return res.json({ error: true, message: "Unauthorized!" });

        }

        const deleteQuestionario = await query("DELETE FROM questionario WHERE (id=$1 AND professor=$2)", [req.body.id, user.id]);

        if (!deleteQuestionario.rowCount > 0) {
            return res.json({ error: true, message: "Não foi possível deletar esse questionário" });

        }

        return res.json({ error: false, message: "Questionário deletado"});

    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });

    }

});

module.exports = app;
