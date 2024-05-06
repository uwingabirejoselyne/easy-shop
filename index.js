const express = require("express");
const dbConnect = require("./config/dbConnect");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;

const morgan = require('morgan')
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute")
const blogRoute = require('./routes/blogRoute')
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require("./middlewares/errorHandler");
dbConnect();

app.use(morgan("dev"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/user", authRoute);
app.use("/api/product", productRoute);
app.use("/api/blog", productRoute);
app.use(notFound);
app.use(errorHandler);
app.use(cookieParser());
app.use("/", (req, res) => {
  res.send("Hello from the server");
});
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
