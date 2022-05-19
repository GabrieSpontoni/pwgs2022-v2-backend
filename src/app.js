const express = require("express");
const app = express();
const cors = require("cors");

var index = require("./routes/index");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", index);

module.exports = app;
