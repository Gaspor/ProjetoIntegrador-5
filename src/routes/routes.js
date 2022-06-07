const express = require('express');
const apiRouter = express();

apiRouter.use('/', require("./login/login"));

module.exports = apiRouter;
