const rp = require('request-promise');
require('dotenv').config()
const uri = `https://api.mlab.com/api/1/databases/groceries-amh/collections/cart?apiKey=${process.env.apiKey}`;

const addItem = async (item) => {
  try {
    await rp({
      method: 'POST',
      uri: uri,
      headers: {
        'content-type': "application/json"
      },
      body: item,
      json: true
    });

    console.log("Item added to the cart!");
  } catch(error) {
    console.error("Error: ", error);
  }
};

const getItems = async () => {
  try {
    const results = await rp({
      method: 'GET',
      uri: uri,
      headers: {
        'content-type': "application/json"
      },
      json: true
    });

    return results;
  } catch(error) {
    console.error("Error: ", error);
  }
};

const clearItems = async () => {
  try {
    await rp({
      method: 'PUT',
      uri: uri,
      headers: {
        'content-type': "application/json"
      },
      json: true,
      body: []
    });

    console.log('Cart emptied!');
  } catch(error) {
    console.error("Error: ", error);
  }
};

module.exports = { addItem, getItems, clearItems };