const express = require("express");
const app = express();
const { query } = require("./../../config/connection");
const { authenticateToken } = require("./../../middleware/auth");
const { decodeUser } = require("./../../config/decodeJWT");

app.put("/questao", authenticateToken, async (req, res) => {
    try {
        const questoes = await query("SELECT * FROM questao WHERE idquestionario=$1", [req.body.idquestionario]);

        return res.json({ error: false, message: "Todas as questões desse questionario", questoes: questoes.rows });

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

        const idQuestao = await query("INSERT INTO questao(idquestionario, enunciado, createdat, updatedat) VALUES($1, $2, now(), now()) RETURNING id", [req.body.idquestionario, req.body.enunciado]);
        return res.json({ error: false, message: "Questão inserida com sucesso", idQuestao: idQuestao });

    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });

    }
});

app.post("/responderquestao", authenticateToken, async (req, res) => {
    try {
        const user = decodeUser(req);

        if (user.cargo == "Aluno") {
            await query("INSERT INTO questao_aluno(idaluno, idquestao, idalternativa, createdat, updatedat) VALUES($1, $2, $3, now(), now())", [req.body.idaluno, req.body.idquestao, req.body.idalternativa]);
            return res.json({ error: false, message: "Questão respondida com sucesso" });

        }

        return res.json({ error: true, message: "Professor não pode responder a questão" });

    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });

    }
});

app.get("/acertos", authenticateToken, async (req, res) => {
    try {
        const user = decodeUser(req);

        if (user.cargo == "Aluno") {
            const questionario = await query("SELECT * FROM questionario WHERE id=$1", [req.body.idquestionario]);
            const questoes = await query("SELECT * FROM questao WHERE idquestionario=$1", [questionario.rows[0].id]);
            let corretas = 0;
            questoes.rows.forEach(async element => {
                const questoesRespondidas = await query("SELECT * FROM questao_aluno WHERE idquestao=$1 AND idaluno=$2", [element.id, req.body.idaluno]);
                questoesRespondidas.rows.forEach(async element => {
                    await countAlternativas(element, corretas);
                    return res.json({ error: false, message: "Questões corretas: " + corretas });

                });
            });
        }

        return res.json({ error: true, message: "Professor não tem questões para serem verificadas" });

    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });

    }
});

app.delete("/questao", authenticateToken, async (req, res) => {
    try {
        const user = decodeUser(req);
        if (user.cargo == "Professor") {
            const questao = await query("DELETE FROM questao WHERE id=$1 AND idquestionario=$2", [req.body.idquestao, req.body.idquestionario]);
            if (questao.rowCount > 0) {
                return res.json({ error: false, message: "Questão deletada" });

            }

            return res.json({ error: true, message: "Não existe questão com este id" });
            
        }
        return res.json({ error: true, message: "Aluno não pode deletar questão" });

    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });

    }
});

async function countAlternativas(element, corretas) {
    const alternativa = await query("SELECT correta FROM alternativa WHERE idalternativa=$1", [element.idalternativa]);
    for (let index = 0; index < alternativa.rowCount; index++) {
        const element = alternativa.rows[index];
        if (element.correta) {
            corretas++;

        }
    }

    return corretas;

}

module.exports = app;
