async function sendGift(senderID, recipientID, itemID){
  axios.post("../gift/send_gift", {
    sender: senderID,
    recipient: recipientID,
    item: itemID
  })
  .then((response) => {
    console.log(response.data)
  }).catch((err) => {
    console.error('There was an error: ' + err)
  })
}

async function sendAll(senderID, itemID){
  axios.post("../gift/send_all", {
    sender: senderID,
    item: itemID
  })
  .then((response) => {
    console.log(response.data)
  }).catch((err) => {
    console.error('There was an error: ' + err)
  })
}

async function receiveGift(recipientID, senderID){
  axios.post("../gift/receive_gift", {
    recipient: recipientID,
    sender: senderID
  })
  .then((response) => {
    window.location.reload();
    console.log(response.data)
  }).catch((err) => {
    console.error('There was an error: ' + err)
  })
}

async function receiveAll(recipientID){
  axios.post("../gift/receive_all", {
    recipient: recipientID,
  })
  .then((response) => {
    window.location.reload();
    console.log(response.data)
  }).catch((err) => {
    console.error('There was an error: ' + err)
  })
}
