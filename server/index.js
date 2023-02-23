const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");
dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());

const port = process.env.port;
// This line is make browser and console to understand the json data
require("./DB/connection");
app.use(express.json());

app.use(require("./routers/auth"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
