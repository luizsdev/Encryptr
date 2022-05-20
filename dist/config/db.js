"use strict";
exports.__esModule = true;
exports.UserSchema = void 0;
var mongoose = require("mongoose");
var uri = "mongodb://localhost:27017/encryptr";
mongoose.connect(uri, function (err) {
    if (err) {
        console.log("Couldn't connect to database");
    }
    else {
        console.log("Connected to database");
    }
});
exports.UserSchema = new mongoose.Schema({
    info: { type: String },
    hash: { type: String },
    code: { type: String }
});
var User = mongoose.model("User", exports.UserSchema);
exports["default"] = User;
