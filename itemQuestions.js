const chalk = require('chalk');

module.exports = [
  {
    type: 'input',
    name: 'unitOfMeasure',
    message: chalk.magentaBright(`How do you measure that?`),
  },
  {
    type: 'input',
    name: 'quantity',
    message: chalk.magentaBright(`What quantity would you like to add to the cart?`),
    validate: value => {
      const input = (+value).toFixed();
      if(isNaN(input) || input < 1) {
        console.log(chalk.red(' Please input a number greater than 0 as a quantity.'));
        return false;
      } 
      return true;
    }
  },
  {
    type: 'input',
    name: 'price',
    message: chalk.magentaBright('How much does one cost?'),
    validate: value => {
      const input = (+value).toFixed(2);
      if(isNaN(input) || input <= 0 ) {
        console.log(chalk.red(' Please input a number greater than 0 as a price.'));
        return false;
      } 
      return true;
    }
  }
];