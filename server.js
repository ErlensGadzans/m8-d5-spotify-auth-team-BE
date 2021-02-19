const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const listEndpoints = require("express-list-endpoints");
const mongoose = require("mongoose");
const usersRouter = require("./src/users");

const server = express();

const port = process.env.PORT || 3007;

server.use(express.json());
server.use(cors());
server.use("/users", usersRouter);

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
