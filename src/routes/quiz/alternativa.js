const express = require("express");
const app = express();
const { query } = require("./../../config/connection");
const { authenticateToken } = require("./../../middleware/auth");
const { decodeUser } = require("./../../config/decodeJWT");

app.put("/alternativa", authenticateToken, async (req, res) => {
    try {
        const alternativas = await query("SELECT * FROM alternativa WHERE idquestao=$1", [req.body.idquestao]);

        return res.json({ error: false, message: "Alternativas dessa questão", alternativas: alternativas.rows });


    } catch (error) {
        res.status(500).json({ error: true, message: error.message });

    }
});

app.post("/alternativa", authenticateToken, async (req, res) => {
    try {
        const user = decodeUser(req);
        
        if (user.cargo == "Aluno") {
            return res.json({ error: true, message: "Aluno não pode inserir alternativas nessa questão" });

        }

        const alternativas = req.body.alternativa;
        if(Array.isArray(alternativas)) {
            for (let i in alternativas) {
                if (alternativas[i].texto == undefined) {}
                else {
                    await query("INSERT INTO alternativa(idquestao, texto, correta) VALUES($1, $2, $3)", [req.body.idquestao, alternativas[i].texto, alternativas[i].correta]);
    
                }
                
            }
            return res.json({ error: false, message: "Alternativas dessa questão foram adicionadas", alternativas: alternativas });

        }

        return res.json({ error: true, message: "Aconteceu um erro, tente novamente mais tarde"});

    } catch (error) {
        res.status(500).json({ error: true, message: error.message });

    }
});

module.exports = app;
