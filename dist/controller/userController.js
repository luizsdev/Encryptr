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
                var substring = hash.substring(7, 11);
                db_1["default"].create({ hash: hash, code: substring });
                res.send("Encrypted and stored sucessfully\n save this code so you can retrieve your password in the future -> " +
                    substring);
            }
        });
    });
};
exports.encrypt = encrypt;
var decrypt = function (req, res) {
    var code = req.params.code;
    var user = db_1["default"].findOne({ code: code });
    res.send(user);
};
exports.decrypt = decrypt;
