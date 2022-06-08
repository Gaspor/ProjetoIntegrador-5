const express = require('express');
const apiRouter = express();

apiRouter.use('/user', require("./login/login"));
apiRouter.use('/user', require("./register/register"));
apiRouter.use('/user', require("./user/user"));

module.exports = apiRouter;
