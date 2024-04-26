const express = require("express");
const morgan = require("morgan");

require("dotenv").config();

const app = express();

const userRouter = require("./src/routes/users");
const todoListRouter = require("./src/routes/todolist2");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/users", userRouter);
app.use("/todolists2", todoListRouter);

app.listen(process.env.PORT, () => {
  console.log(`server running on http://localhost:${process.env.PORT}`);
});

module.export = app;
