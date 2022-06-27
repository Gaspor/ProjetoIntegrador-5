const express = require('express');
const apiRouter = express();

apiRouter.use('/user', require("./login/login"));
apiRouter.use('/user', require("./register/register"));
apiRouter.use('/user', require("./user/user"));
apiRouter.use('/user', require("./refresh_token/refresh_token"));

/* Exam routes */
apiRouter.use('/quiz', require("./quiz/quiz"));
apiRouter.use('/quiz', require("./quiz/questao"));
apiRouter.use('/quiz', require("./quiz/alternativa"));

module.exports = apiRouter;
