const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const app = express();

// Settings del servidor
app.set("port", process.env.port || 4000);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use("/work",require("./routes/works.routes"));

module.exports = app;
