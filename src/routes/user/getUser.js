const Database = require("../../../lib/Database");

// Instantiate a new database "connection"
const db = new Database();

// Get a reference to the user collection
const user = db.collection("user");

module.exports = (req, res, next) => {
  // Find users with user ID
  const result = user.find({ id: req.params.userid });

  if(result.length < 1) res.json([]);
  else {
    // Grab the looked up user
    const resultUser = result[0];

    // Grab the result user's friend ID's
    const friendIds = resultUser.friends;

    // Array to hold friend data
    const friendData = [];

    // Iterate friend ID's and get data for each
    friendIds.forEach(friendId => {
      // Find user based on ID
      const friendResult = user.find({id: friendId});

      // No user found, skip this iteration
      if(friendResult.length < 1) return;

      // Push the resulting user
      const friend = friendResult[0];
      friendData.push(friend);
    });

    // Render the logged in user view
    res.render('user', { user: resultUser, friends: friendData });
  }

}