const rp = require('request-promise');
require('dotenv').config()

const addItem = async (item) => {
  try {
    const results = await rp({
      method: 'POST',
      uri: `https://api.mlab.com/api/1/databases/groceries-amh/collections/cart?apiKey=cyfgCVnWh1Aw7-6DOqvIgogYsemiiyWg`,
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
      uri: `https://api.mlab.com/api/1/databases/groceries-amh/collections/cart?apiKey=${process.env.apiKey}`,
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

module.exports = { addItem, getItems };