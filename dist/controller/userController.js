"use strict";
exports.__esModule = true;
exports.decrypt = exports.encrypt = void 0;
var bcrypt = require("bcrypt");
var db_1 = require("../config/db");
var encrypt = function (req, res) {
    var stringed = JSON.stringify(req.body);
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(stringed, salt, function (err, hash) {
            if (err) {
                res.send("Encryptying failed");
            }
            else {
                db_1["default"].create({ hash: hash });
                res.send("Encrypted and stored sucessfully\n save this code so you can retrieve your password in the future -> " +
                    hash.substring(7, 11));
            }
        });
    });
};
exports.encrypt = encrypt;
var decrypt = function (req, res) {
    var check = req.body;
    res.send(JSON.stringify(check));
};
exports.decrypt = decrypt;
