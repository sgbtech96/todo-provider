const chalk = require("chalk");
const mongoose = require("mongoose");
const { DB_PASS } = process.env;
mongoose
  .connect(
    `mongodb+srv://sgbtech96:${DB_PASS}@cluster0-hluvl.mongodb.net/todo_application?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() =>
    console.log(chalk.greenBright(`Successfully established a connection to db!`))
  )
  .catch((e) =>
    console.log(chalk.redBright(`Something went wrong while connecting to db!`, e))
  );
