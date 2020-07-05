const GiftRouter = require('express').Router();

GiftRouter.route('/send_gift').post(require('./sendGift'));
GiftRouter.route('/send_all').post(require('./sendAll'));
GiftRouter.route('/receive_gift/').post(require('./receiveGift'));
GiftRouter.route('/receive_all/').post(require('./receiveAll'));
GiftRouter.route('/check_gifts').post(require('./checkGifts'));
module.exports = GiftRouter;