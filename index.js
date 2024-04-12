const express = require("express");
const dbConnect = require("./config/dbConnect");
const bodyParser = require('body-parser');
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRoute = require('./routes/authRoute')
dbConnect();
app.use(bodyParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/user',authRoute)
app.use("/", (req, res) => {
  res.send("Hello from the server");
});
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
