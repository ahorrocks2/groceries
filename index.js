#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const { addItem, getItems } = require('./persistence.js');

const itemQuestions = [
  {
    type: 'input',
    name: 'unitOfMeasure',
    message: `How do you measure that?`,
  },
  {
    type: 'input',
    name: 'quantity',
    message: `What quantity would you like to add to the cart?`
  },
  {
    type: 'input',
    name: 'price',
    message: 'How much does one cost?'
  }
];

program
  .version('0.0.1')
  .description('Welcome to your cart - Use the commands below to start shopping.');

program
  .command('add <itemName>')
  .description('Add a named product to your cart.')
  .action((itemName) => {
    inquirer.prompt(itemQuestions).then(answers => {
      const newItem = {
        name: itemName,
        unitOfMeasure: answers.unitOfMeasure,
        quantity: answers.quantity,
        price: answers.price,
        subTotal: answers.quantity * answers.price
      }
      
      addItem(newItem);
    });
  });

program 
  .command('items')
  .description('Check what items have been added to your cart.')
  .action(() => {
    getItems().then(items => {
      console.log(items.length ? items : "Nothing yet!");
    });
  });

program.parse(process.argv)

