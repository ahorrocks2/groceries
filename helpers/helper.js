const chalk = require('chalk');

const sortItems = (items, options) => {
  options.name === true ? items.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1) : 
    options.subtotal === true ? items.sort((a, b) => a.subTotal - b.subTotal) : 
      null;
  
  return items;
};

const validateQuantity = value => {
  const input = (+value).toFixed();
  if(isNaN(input) || input < 1) {
    console.log(chalk.red(' Please input a number greater than 0 as a quantity.'));
    return false;
  } 
  return true;
};

const validatePrice = value => {
  const input = (+value).toFixed(2);
  if(isNaN(input) || input <= 0 ) {
    console.log(chalk.red(' Please input a number greater than 0 as a price.'));
    return false;
  } 
  return true;
};

module.exports = { validateQuantity, validatePrice, sortItems };