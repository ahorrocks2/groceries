const rp = require('request-promise');
const chalk = require('chalk');
require('dotenv').config()

const uri = `https://api.mlab.com/api/1/databases/groceries-amh/collections/cart?apiKey=${process.env.apiKey}`;
const headers = { 'content-type': "application/json" };

const showErr = error => console.error(chalk.red('Error: ', error.message));
const showSuccess = msg => console.log(chalk.green('Success: ', msg));

const addItem = async (item) => {
  try {
    await rp({
      method: 'POST',
      uri: uri,
      headers: headers,
      body: item,
      json: true
    });

    showSuccess('Item added!');
  } catch(error) {
    showErr(error);
  }
};

const getItems = async () => {
  try {
    const results = await rp({
      method: 'GET',
      uri: uri,
      headers: headers,
      json: true
    });

    return results;
  } catch(error) {
    showErr(error);
  }
};

const clearItems = async () => {
  try {
    await rp({
      method: 'PUT',
      uri: uri,
      headers: headers,
      json: true,
      body: []
    });

    showSuccess('Items removed!');
  } catch(error) {
    showErr(error);
  }
};

const removeItem = async (itemName) => {
  try {
    const items = await getItems();
    const item = items.find(i => i.name.toLowerCase() === itemName.toLowerCase());
    
    if(!item) {
      const itemNames = items.map(i => i.name);
      throw new Error(`Looks like that item isn't in your cart! Here's what is, try double checking your spelling: ${itemNames}`);
    }

    const itemId = item._id.$oid;

    await rp({
      method: 'DELETE',
      uri: `https://api.mlab.com/api/1/databases/groceries-amh/collections/cart/${itemId}?apiKey=${process.env.apiKey}`,
      headers: headers,
      json: true
    });
    
    showSuccess('Item removed!');
  } catch (error) {
    showErr(error);
  }
}

module.exports = { addItem, getItems, clearItems, removeItem };