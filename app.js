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
var cameraRouter = require("./routes/camera");
var vintedRouter = require("./routes/vinteds");
var servicesRouter = require("./routes/services");

var app = express();

const fileUpload = require("express-fileupload");
app.use(fileUpload());

const cors = require("cors");
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/sitters", sittersRouter);
app.use("/assessment", assessmentRouter);
app.use("/messages", messagesRouter);
app.use("/camera", cameraRouter);
app.use("/vinteds", vintedRouter);
app.use("/services", servicesRouter);

module.exports = app;
