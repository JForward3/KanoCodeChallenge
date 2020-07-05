const Database = require("../../../lib/Database");

// Instantiate a new database "connection"
const db = new Database();

// Get references to the database collections
const usergift = db.collection("usergift");
const user = db.collection("user");

module.exports = (req, res, next) => {
    const senderId = req.body.sender;
    const itemId = req.body.item;
    const responseArray = [];

    // Find the user who sent the items
    const result = user.find({ id: senderId});
    if(result.length < 1){
        console.log("Failed: Sender not found");
        return res.json([]);
    }
    const sender = result[0];

    // Find the friends of the user and attempt to send the gift to each of them
    const sendersFriends = sender.friends;
    sendersFriends.forEach(friend => {
        recipientId = friend;
        const recipient = user.find({ id: recipientId});

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

            // Add the gift to the response array
            responseArray.push(gift);
        } else {
            // Attemping to send a gift to the same user twice in one day
            console.log(`Failed for ${recipient[0].name}: Double Sending is not allowed!`);
            
            // Add an empty array to the response array
            responseArray.push([]);
        }
    });
    // Send the array of gifts as the request response
    res.json(responseArray);
}