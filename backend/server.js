require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const tasksRoute = require("./routes/tasks");

mongoose
  .connect("mongodb://mongo:27017/ToDoAppDb")
  .then(() => console.log("Connected"))
  .catch((error) => console.error("Connection error:", error));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("combined")); // Fixed deprecation warning for morgan

app.use(tasksRoute);

const port = process.env.PORT || 5000; // Updated port
app.listen(port, () => console.log(`Running on port ${port}`));
