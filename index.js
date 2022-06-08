const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(require('./src/routes/routes'));

app.listen(process.env.PORT || 3000, err => {
    if(err) {
        console.log("Error: " , err);
        return;
    }

    console.log("Running...");
});
