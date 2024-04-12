const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRoute = require('./routes/authRoute')
dbConnect();
app.use('/api/user',authRoute)
app.use("/", (req, res) => {
  res.send("Hello from the server");
});
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
