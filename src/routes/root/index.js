const RootRouter = require('express').Router();

RootRouter.get('/', (req, res) => {
    res.render('index', { title: "Gift Exchange" });
})

module.exports = RootRouter;