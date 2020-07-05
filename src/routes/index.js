// Initialize a new Express router
const Router = require('express').Router();

// Bind our gift and user routes to the router
Router.use("/", require('./root'));
Router.use("/item", require('./item'));
Router.use("/user", require('./user'));
Router.use("/gift", require('./gift'));

module.exports = Router;