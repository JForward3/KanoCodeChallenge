const Database = require("../../../lib/Database");

// Instantiate a new database "connection"
const db = new Database();

// Get references to the database collections
const usergift = db.collection("usergift");
const user = db.collection("user");

module.exports = (req, res, next) => {
  // Grab params passed in through POST request
  const senderId = req.body.sender;
  const recipientId = req.body.recipient;
  const itemId = req.body.item;

  // Check the recipients friends list to see if the sender is a friend
  let giftFromFriend = false;
  const recipient = user.find({ id: recipientId});
  if(recipient.length < 1){
    console.log("Failed: No user found");
    return res.json([]);
  }
  const recipientsFriends = recipient[0].friends;
  recipientsFriends.forEach(friend => {
    if(senderId == friend){
      giftFromFriend = true;
    }
  });

  if(giftFromFriend === false){
    // Attempting to send a gift to not a friend
    console.log("Failed: Can only send gifts to friends!");
    return res.json([]);
  }

  // Create Gift
  const gift = {
    senderId,
    recipientId,
    itemId,
    ts: +Date.now()
  };

  // Check to see if it has been at least a day since you last sent a gift to this user
  const giftTS = recipient[0].giftsTS;
  if((giftTS[senderId]+86400000) < gift.ts){
    console.log(`Success! Sending gift to ${recipient[0].name}!`);

    // Update the gift time stamp with the new time
    giftTS[senderId] = gift.ts;

    // Insert the user gift into the usergift collection
    usergift.insert(gift);

    // Return the user gift as the request response
    res.json(gift);
  } else {
    // Attemping to send a gift to the same user twice in one day
    console.log(`Failed for ${recipient[0].name}: Double Sending is not allowed!`)
    res.json([]);
  }
  
}