const express = require("express");
const cookieParse = require("cookie-parser");
const config = require("config");
const mongoose = require("mongoose");
const PORT = config.get("port");
const mainRouter = require("./routes/index.routes");
const erroe_handing_middlewere = require("./error_middlewe/erroe_handing_middlewere");
const exHbs = require("express-handlebars")
const viewRouter = require("./routes/view.route")
const hbs = exHbs.create({
  defaultLayout: "main",
  extname:"hbs"
})

const app = express();
app.use(express.json());
app.use(cookieParse());


app.engine("hbs",hbs.engine)
app.set("view engine","hbs")
app.set("views", "./views");
app.use(express.static("views"))


app.use("/",viewRouter)
app.use("/api", mainRouter);

app.use(erroe_handing_middlewere); //Error eng oxirida chaqirish kerak

async function start() {
  try {
    await mongoose.connect(config.get("dbatlasUri"));
    app.listen(PORT, () => {
      console.log(`server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("ulanishda xatolik");
  }
}

start();
