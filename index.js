const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/v1', require('./src/routes/routes'));

app.listen(PORT, err => {
    if(err) {
        console.log("Error: " , err);
        return;
    }

    console.log("Running in " + PORT);
});
