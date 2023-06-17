require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./server/config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Templating Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use("/", require("./server/routes/user"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
