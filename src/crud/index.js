const express = require("express");
const axios = require("axios");
const { authorize } = require("../auth/middleware");

const apiRouter = express.Router();

apiRouter.get("/artists/:genre", authorize, async (req, res, next) => {
  try {
    await axios
      .get(
        `https://deezerdevs-deezer.p.rapidapi.com/genre/` +
          req.params.genre +
          `/artists`,
        {
          headers: {
            "x-rapidapi-key": process.env.RAPID_KEY,
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          },
        }
      )
      .then((response) => res.send(response.data.data));
  } catch (error) {
    console.log(error);
    next(error);
  }
});

apiRouter.get("/album/:albumID", authorize, async (req, res, next) => {
  try {
    await axios
      .get(
        `https://deezerdevs-deezer.p.rapidapi.com/album/` + req.params.albumID,
        {
          headers: {
            "x-rapidapi-key": process.env.RAPID_KEY,
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          },
        }
      )
      .then((response) => res.send(response.data));
  } catch (error) {
    console.log(error);
    next(error);
  }
});

apiRouter.get(
  "/artists/:artistID/toptracks",
  authorize,
  async (req, res, next) => {
    try {
      await axios
        .get(
          `https://deezerdevs-deezer.p.rapidapi.com/artist/` +
            req.params.artistID +
            `/top?limit=50`,
          {
            headers: {
              "x-rapidapi-key": process.env.RAPID_KEY,
              "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            },
          }
        )
        .then((response) => res.send(response.data.data));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

apiRouter.get(
  "/artists/:artistID/albums",
  authorize,
  async (req, res, next) => {
    try {
      await axios
        .get(
          `https://deezerdevs-deezer.p.rapidapi.com/artist/` +
            req.params.artistID +
            `/albums`,
          {
            headers: {
              "x-rapidapi-key": process.env.RAPID_KEY,
              "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            },
          }
        )
        .then((response) => res.send(response.data.data));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

apiRouter.get(
  "/artists/:artistID/profile",
  authorize,
  async (req, res, next) => {
    try {
      await axios
        .get(
          `https://deezerdevs-deezer.p.rapidapi.com/artist/` +
            req.params.artistID,
          {
            headers: {
              "x-rapidapi-key": process.env.RAPID_KEY,
              "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            },
          }
        )
        .then((response) => res.send(response.data));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

module.exports = apiRouter;
