import * as express from "express";
import User from "./config/db.js";
import * as UserController from "./controller/userController.js";
const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

app.post("/encrypt", (req, res) => {
  UserController.encrypt(req, res);
});

app.post("/test", (req, res) => {
  UserController.decrypt(req, res);
});
