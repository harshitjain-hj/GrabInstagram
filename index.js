var express = require("express");
let Crawler = require("crawler");
let bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

let insta_feed = require("./routes/insta_feed");

const env = process.env.NODE_ENV || "development";

let app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
); // support encoded bodies

/**
 * @param /instagram/feed?url=<Feed url>
 */
app.use("/instagram/feed", insta_feed);

env === "production" && app.use(express.static("client/build"));

env === "production" &&
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server running at " + port);
});
