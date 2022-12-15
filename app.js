require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("./models/connection");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
<<<<<<< HEAD
=======
var sittersRouter = require("./routes/sitters");
>>>>>>> ecd4d461a147b000f3bb8a7b799a40136472dc88
var assessmentRouter = require("./routes/assessment");

var app = express();

const cors = require("cors");
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
<<<<<<< HEAD
app.use("/assessment", assessmentRouter);
=======
app.use("/sitters", sittersRouter);
>>>>>>> ecd4d461a147b000f3bb8a7b799a40136472dc88

module.exports = app;
