const express = require("express");
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");
const mongoose = require("mongoose");
//Route
const usersRouter = require("./users");
const apiRouter = require("./crud");
//Server
const server = express();
const port = process.env.PORT || 3007;
//Middlewares
server.use(cors());
server.use(express.json());
//
server.use("/users", usersRouter);
server.use("/deezer", apiRouter);
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
