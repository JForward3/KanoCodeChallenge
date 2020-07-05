const Database = require("../../../lib/Database");

// Instantiate a new database "connection"
const db = new Database();

// Get references to the collections
const usergift = db.collection("usergift");
const item = db.collection("item");
const user = db.collection("user");

module.exports = (req, res, next) => {
  // Find usergift with recipient ID
  const result = usergift.find({ recipientId: req.body.recipient });
  // Find the active user
  const activeUser = user.find({ id: req.body.recipient });

  const gifts = [];
  const senders = [];
  result.forEach(gift => {
    // Find the item
    const foundItem = item.find({ id: gift.itemId})
    gifts.push(foundItem[0]);

    // Find the user who send it
    const giftSender = user.find({ id: gift.senderId })
    senders.push(giftSender[0]);
  });

  // Pass this data and render the usergifts page
  res.render('usergifts', { activeUser: activeUser[0], gifts: gifts, senders: senders });
}

