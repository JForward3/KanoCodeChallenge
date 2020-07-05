const Database = require("../../../lib/Database");

// Instantiate a new database "connection"
const db = new Database();

// Get a reference to the item collection
const usergift = db.collection("usergift");

module.exports = (req, res, next) => {
    // Find usergifts with recipient ID
    const result = usergift.find({ recipientId: req.body.recipient });
  
    // Out of the found gifts, find all from the sender
    if(result.length < 1){ return res.json([]);
    } else {
    const giftFromUser = [];
    result.forEach(gift => {
        if(gift.senderId == req.body.sender){
            giftFromUser.push(gift);
        }
    })

    //if(giftFromUser.length > 1){
        // Need to send the ts value to be able to remove the correct one
        // Remove the oldest item
    //}else{
        // Remove the gift from DB
        const index = usergift.data.indexOf(giftFromUser[0]);
        if (index > -1) {
            usergift.data.splice(index, 1);
        }
    //}
    if(giftFromUser.length < 1) return res.json([]);
    res.json(giftFromUser);
  }
}