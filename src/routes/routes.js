const express = require('express');
const apiRouter = express();

apiRouter.use('/api/user', require("./login/login"));
apiRouter.use('/api/user', require("./register/register"));
apiRouter.use('/api/user', require("./user/user"));

module.exports = apiRouter;
