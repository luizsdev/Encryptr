import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../config/db";

export const encrypt = (req: Request, res: Response) => {
  const stringed = JSON.stringify(req.body);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(stringed, salt, (err, hash) => {
      if (err) {
        res.send("Encryptying failed");
      } else {
        const substring = hash.substring(7, 11);
        User.create({ hash: hash, code: substring });
        res.send(
          "Encrypted and stored sucessfully\n save this code so you can retrieve your password in the future -> " +
            substring
        );
      }
    });
  });
};
export const decrypt = (req: Request, res: Response) => {
  const code = req.params.code;
  const user = User.findOne({ code: code });
  res.send(user);
};
