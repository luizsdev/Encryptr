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
        User.create({ info: stringed, hash: hash, code: substring });
        res.send(
          "Encrypted and stored sucessfully\n save this code so you can retrieve your password in the future -> " +
            substring
        );
      }
    });
  });
};
export const decrypt = async (req: Request, res: Response) => {
  const code = req.params.code;
  const user = await User.findOne({ code: code });
  if (user) {
    const whatToSend = "Here's your info -> " + user.info;
    res.send(whatToSend);
  } else {
    res.send("Couldn't authenticate your code");
  }
};
