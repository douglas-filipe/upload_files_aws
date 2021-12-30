const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const path = require("path")
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("DB running");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(require("./routes"));
app.use("/files", express.static(path.join(__dirname, "..", "tmp", "uploads")))

app.listen(3000, () => {
  console.log("Running");
});
