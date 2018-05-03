module.exports = [
  {
    type: 'input',
    name: 'unitOfMeasure',
    message: `How do you measure that?`,
  },
  {
    type: 'input',
    name: 'quantity',
    message: `What quantity would you like to add to the cart?`,
    validate: value => {
      const input = (+value).toFixed();
      if(isNaN(input) || input < 1) {
        console.log(' Please input a number greater than 1 as a quantity.');
        return false;
      } 
      return true;
    }
  },
  {
    type: 'input',
    name: 'price',
    message: 'How much does one cost?',
    validate: value => {
      const input = (+value).toFixed();
      if(isNaN(input) || input < 1) {
        console.log(' Please input a number greater than 1 as a price.');
        return false;
      } 
      return true;
    }
  }
];