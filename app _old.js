const express = require("express");
const cookieParse = require("cookie-parser");
const config = require("config");
const mongoose = require("mongoose");
const PORT = config.get("port");
const mainRouter = require("./routes/index.routes");
const erroe_handing_middlewere = require("./error_middlewe/erroe_handing_middlewere");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const logger = require("./services/logger.service");
const winston = require("winston");
const expressWinston = require("express-winston");

// console.log(process.env.NODE_ENV);
// console.log(process.env.secret);
// console.log(config.get("secret"));

// process.on("uncaughtException", (exception) => {
//   console.log("uncaughtException", exception.message);
// });

// process.on("unhandledRejection", (rejection) => {
//   console.log("unhandledRejection", rejection);
// });

logger.log("info", "Log malumotlari");
logger.error("Error malumotlari");
logger.debug("Debug malumotlari");
logger.warn("Warn malumotlari");
logger.info("info malumotlari");
// console.trace("trace malumotlari");
// console.table([1, 2, 3]);
// console.table([
//   ["sobir", 3],
//   ["aziza", 20],
// ]);

const app = express();
app.use(express.json());
app.use(cookieParse());

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) {
      return false;
    },
  })
);

app.use("/api", mainRouter);

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

app.use(erroe_handing_middlewere); //Error eng oxirida chaqirish kerak

async function start() {
  try {
    await mongoose.connect(config.get("dbatlasUri"));
    app.listen(PORT, () => {
      console.log(`server started at: http:localhost:${PORT}`);
    });
  } catch (error) {
    console.log("ulanishda xatolik");
  }
}

start();
