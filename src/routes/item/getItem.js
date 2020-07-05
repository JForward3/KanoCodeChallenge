const Database = require("../../../lib/Database");

// Instantiate a new database "connection"
const db = new Database();

// Get a reference to the item collection
const item = db.collection("item");

module.exports = (req, res, next) => {
  // Find item with item ID
  const result = item.find({ id: req.params.itemid });
  res.json(result);
}