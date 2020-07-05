// Utilize Express for request routing
const express = require("express");
const path = require("path");

// Instantiate a new database
const Database = require("../lib/Database");
const db = new Database();

// Get a reference to the user collection
const user = db.collection("user");
const item = db.collection("item");

// Instantiate Express instance
const app = express();

// Initialize Express view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Some Express config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use public to serve stylesheets, etc.
app.use(express.static(path.join(__dirname, "../public")));

// Use the routes index on our Express app
app.use("/", require("./routes"));

// Catch 404
app.use((req, res, next) => {
  res.status(404);
  res.end();
});

module.exports = app;
