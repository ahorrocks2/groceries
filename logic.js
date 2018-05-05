const inquirer = require('inquirer');
const chalk = require('chalk');

const { addItem, getItems, clearItems, removeItem } = require('./persistence.js');
const itemQuestions = require('./helpers/itemQuestions.js');
const { sortItems } = require('./helpers/helper.js');

const error = err => console.log(chalk.red(err));

const displayCommands = () => {
  console.log(chalk.blueBright('Welcome to your cart - Use the commands below to start shopping'));

  const commands = [
    ['add', '<itemName>', 'Add an item to your cart.'],
    ['remove', '<itemName>', 'Remove an item from your cart.'],
    ['items', '-n [direction]', 'List and sort items by name, optional asc (default) or desc'],
    ['items', '-s [direction]', 'List and sort items by subtotal, optional asc (default) or desc'],
    ['empty', '', 'Remove all items from your cart.']
  ];

  commands.forEach(c => {
    console.log(chalk.magenta(c[0]), chalk.yellow(`  ${c[1]}`), c[2]);
  });
};

const addItemToCart = itemName => {
  inquirer.prompt(itemQuestions).then(answers => {
    const newItem = {
      name: itemName,
      unitOfMeasure: answers.unitOfMeasure,
      quantity: (+answers.quantity).toFixed(),
      price: (+answers.price).toFixed(2),
    };

    newItem.subTotal = (+newItem.quantity * newItem.price).toFixed(2);

    addItem(newItem);
  }).catch(err => {
    error(err);
  });
};

const getAndSortItems = (direction, options) => {
  getItems().then(items => {
    if(items.length) {
      sortItems(items, options);

      if(direction === 'desc') items.reverse();
      
      console.log(items.map(i => { return { name: i.name, quantity: `${i.quantity} ${i.unitOfMeasure}${i.quantity > 1 ? 's' : ''}`, price: `$${i.price}`, subtotal: `$${i.subTotal}` }}));
      console.log(chalk.green(`Cart total: $${items.map(x => +x.subTotal).reduce((acc, curr) => acc + curr).toFixed(2)}`));
    } else {
      console.log(chalk.cyan('Nothing in your cart yet!'));
    }
  }).catch(err => {
    error(err);
  });
};

const emptyCart = () => {
  inquirer.prompt({
    type: 'list',
    name: 'confirm',
    message: chalk.yellow('Are you sure you want to empty your cart? You will loose all your items.'),
    choices: ['no', 'yes']
  }).then(result => {
    result.confirm === 'yes' ? clearItems() : null;
  }).catch(err => {
    error(err);
  });
};

const removeItemFromCart = itemName => {
  const items = getItems().then(items => {
    if(!items.length) throw new Error('There is nothing in your cart to remove!');

    const item = items.find(i => i.name.toLowerCase() === itemName.toLowerCase());
    
    if(!item) {
      const itemNames = items.map(i => i.name);
      throw new Error(`Looks like that item isn't in your cart! Here's what is, try double checking your spelling: ${itemNames}`);
    }
    
    const itemId = item._id.$oid;
    removeItem(itemId);
  }).catch(err => {
    error(err);
  });
};

module.exports = { addItemToCart, removeItemFromCart, emptyCart, getAndSortItems, displayCommands };