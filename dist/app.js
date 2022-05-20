"use strict";
exports.__esModule = true;
var express = require("express");
var UserController = require("./controller/userController.js");
var app = express();
app.use(express.json());
app.listen(3000, function () {
    console.log("Server listening on port 3000");
});
app.post("/encrypt", function (req, res) {
    UserController.encrypt(req, res);
});
app.post("/test", function (req, res) {
    UserController.decrypt(req, res);
});
