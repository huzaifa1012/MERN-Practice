const express = require('express')
const app = express();
const port = 3000;
// This line is make browser and console to understand the json data
require('./DB/connection')
app.use(express.json())

app.use(require("./routers/register"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
