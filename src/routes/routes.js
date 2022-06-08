const express = require('express');
const apiRouter = express();

apiRouter.use('/user', require("./login/login"));
apiRouter.use("/user", require("./register/register"));

module.exports = apiRouter;
