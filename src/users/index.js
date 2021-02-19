const express = require("express");
const UserModel = require("../users/schema");
const { authenticate } = require("../auth/");
const { authorize } = require("../auth/middleware");

const usersRouter = express.Router();

usersRouter.get("/", authorize, async (req, res, next) => {
  try {
    const user = await UserModel.find();
    res.send(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body);
    const { _id } = await newUser.save();
    res.status(201).send(_id);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findByCredentials(email, password);
    const accessToken = await authenticate(user);
    res.send({ accessToken });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = usersRouter;
