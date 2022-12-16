require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("./models/connection");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var sittersRouter = require("./routes/sitters");
var assessmentRouter = require("./routes/assessment");
var messagesRouter = require("./routes/messages");

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
<<<<<<< HEAD
>>>>>>> bce1a192ef6f7054e5d3fc70be6ae327dba2f8f3
app.use("/sitters", sittersRouter);
app.use("/assessment", assessmentRouter);
=======
app.use("/sistters", sittersRouter);
app.use("/assessment", assessmentRouter);
app.use("/messages", messagesRouter);

>>>>>>> map
module.exports = app;
