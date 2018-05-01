#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');

const itemQuestions = [
  {
    type: 'input',
    name: 'unitOfMeasure',
    message: `How do you measure that?`,
  },
  {
    type: 'input',
    name: 'quantity',
    message: `What quantity would you like to add to the store?`
  },
  {
    type: 'input',
    name: 'price',
    message: 'How much does one sell for?'
  }
];

let store = [];

program
  .version('0.0.1')
  .description('Groceries are fun');

program
  .command('add <itemName>')
  .description('Add a named product to your store.')
  .action((itemName) => {
    inquirer.prompt(itemQuestions).then(answers => {
      let newItem = {
        name: itemName,
        unitOfMeasure: answers.unitOfMeasure,
        quantity: answers.quantity,
        price: answers.price
      }
      
      store.push(newItem);
    });
  });

program.parse(process.argv)

