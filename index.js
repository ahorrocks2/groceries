#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const { addItem, getItems, clearItems } = require('./persistence.js');
const itemQuestions = require('./itemQuestions.js');

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
  .command('items [direction]')
  .description('Check what items have been added to your cart.')
  .option('-n, --name', 'Optionl: sort cart items by name')
  .option('-s, --subtotal', 'Optional: sort cart items by subtotal')
  .parse(process.argv)
  .action((direction, options) => {
    getItems().then(items => {
      options.name === true ? items.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1) : 
        options.subtotal === true ? items.sort((a, b) => a.subTotal - b.subTotal) : 
          null;

      if(direction === 'desc') items.reverse();

      if(items.length) {
        console.log(items.map(i => { return { name: i.name, quantity: `${i.quantity} ${i.unitOfMeasure}`, subtotal: `$${i.subTotal}` }}));
        console.log(`Cart total: $${items.map(x => x.subTotal).reduce((acc, curr) => acc + curr)}`);
      } else {
        console.log('Nothing in your cart yet!')
      }
    });
  });

program.parse(process.argv);
