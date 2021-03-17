const chalk = require("chalk");
const express = require("express");
const app = express();

const { PORT: port = 8000 } = process.env;
require("./db/connection");
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(`Server is up on port ${port}!!`);
  console.log("incoming request!");
});
app.use("/api/v1", require("./api/v1"));

app.listen(port, () => {
  console.log(chalk.greenBright(`Server is up on port ${port}!!`));
});
