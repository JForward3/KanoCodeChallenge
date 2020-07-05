const UserRouter = require('express').Router();

// Log in as user by provided user ID
UserRouter.route('/:userid').get(require('./getUser'));

module.exports = UserRouter;