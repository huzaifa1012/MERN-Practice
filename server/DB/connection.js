const mongoose = require("mongoose");
const db =
  "mongodb+srv://huzaifa:asdasd@cluster0.abevgn8.mongodb.net/users?retryWrites=true&w=majority";
mongoose
  .connect(db)
  .then(()=>{console.log("Database Connceted")})
  .catch(()=>{console.log("failed to connect Database")});
