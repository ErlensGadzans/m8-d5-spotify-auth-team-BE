const express = require("express");
const UserModel = require("../users/schema");
const { authenticate } = require("../auth/");
const { authorize } = require("../auth/middleware");
const passport = require("passport");

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
    console.log(req.body);
    const user = await UserModel.findByCredentials(email, password);
    const accessToken = await authenticate(user);
    res.send({ accessToken });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//END PIONTS
usersRouter.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

usersRouter.get(
  "/googleRedirect",
  passport.authenticate("google"),
  async (req, res, next) => {
    res.cookie("accessToken", req.user.accessToken, { httpOnly: true });
    res.redirect(process.env.LOCAL_URL + "accessToken" + req.user.accessToken); //FROM FRONTEND JS IS NOT ABLE CHECK CONTENT. PROTECTING TOKENS.
  }
);

module.exports = usersRouter;
