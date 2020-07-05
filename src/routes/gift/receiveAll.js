const Database = require("../../../lib/Database");

// Instantiate a new database "connection"
const db = new Database();

// Get a reference to the item collection
const usergift = db.collection("usergift");

module.exports = (req, res, next) => {
    // Find usergifts with recipient ID
    const result = usergift.find({ recipientId: req.body.recipient });
    
    // Leave if there are no gifts for this user
    if(result.length < 1) return res.json([]);

    result.forEach( gift => {
        // Remove the gift from DB
        const index = usergift.data.indexOf(gift);
        if (index > -1) {
            usergift.data.splice(index, 1);
        }
    });

    res.json(result);
}