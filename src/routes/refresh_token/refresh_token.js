const express = require("express");
const app = express();
const { jwtTokens } = require("./../../config/jwt");
const jwt = require("jsonwebtoken");

app.get('/refresh_token', async (req, res) => {
    try {
        const refresh_token = req.cookies.refresh_token;
        
        if (refresh_token == null) {
            return res.status(401).json({ error: "Unauthorized!" });
        
        }

        jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
            if (error) {
                return res.status(403).json({error:error.message});
            
            }

            const tokens = jwtTokens(user);
            res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
            return res.json(tokens);
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    
    }
});

module.exports = app;
