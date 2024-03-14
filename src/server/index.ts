//dotenv
import dotenv from "dotenv";
dotenv.config();

//setup express
import express from "express";

const app = express();

//setup template engine
import nunjucks from "nunjucks";
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

//add static assets
const oneWeek = 604800000;
app.use("/assets", express.static("assets", { maxAge: oneWeek }));

//add routes
app.get("/", (req, res) => {
  res.render("index.njk");
});

//start server
import http from "http";

http.createServer(app).listen(process.env.HTTP_PORT || 80);
