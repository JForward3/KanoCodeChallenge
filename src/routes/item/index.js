const ItemRouter = require('express').Router();

ItemRouter.route('/:itemid').get(require('./getItem'));

module.exports = ItemRouter;