const express = require("express");
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");
const mongoose = require("mongoose");
//Route
const usersRouter = require("./users");
const apiRouter = require("./crud");
const oauth = require("./auth/oauth"); // ATTACHING GOOGLE STRATEGY TO PASSPORT
const passport = require("passport");
//Server
const server = express();
const port = process.env.PORT || 3007;
//Middlewares
server.use(cors());
server.use(express.json());
//
server.use("/users", usersRouter);
server.use("/deezer", apiRouter);
server.use(passport.initialize()); //INITIALIZE PASSPORT
//
console.log(listEndpoints(server));

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("This server is running on port", port);
    })
  )
  .catch((error) => console.log(error));
