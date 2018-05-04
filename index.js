#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');

const error = err => console.log(chalk.red(err));
const { addItem, getItems, clearItems, removeItem } = require('./persistence.js');
const itemQuestions = require('./itemQuestions.js');

program
  .version('0.0.1')
  .description(chalk.blueBright('Welcome to your cart - Use the commands below to start shopping'));

program
  .command('add <itemName>')
  .description('Add an item to your cart')
  .action((itemName) => {
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
  });

program
  .command('remove <itemName>')
  .description('Remove an item from your cart')
  .action((itemName) => {
    removeItem(itemName);
  });

program 
  .command('items [direction]')
  .option('-n, --name', 'Optionl: sort cart items by name')
  .option('-s, --subtotal', 'Optional: sort cart items by subtotal')
  .description(`List the item(s) in your cart with optional sorting by name (-n) or subtotal (-s) and direction ascending (asc) or descending (desc)`)
  .action((direction, options) => {
    getItems().then(items => {
      if(items.length) {
        options.name === true ? items.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1) : 
          options.subtotal === true ? items.sort((a, b) => a.subTotal - b.subTotal) : 
            null;

        if(direction === 'desc') items.reverse();
        
        console.log(items.map(i => { return { name: i.name, quantity: `${i.quantity} ${i.unitOfMeasure}${i.quantity > 1 ? 's' : null}`, price: `$${i.price}`, subtotal: `$${i.subTotal}` }}));
        console.log(chalk.green(`Cart total: $${items.map(x => +x.subTotal).reduce((acc, curr) => acc + curr).toFixed(2)}`));
      } else {
        console.log(chalk.cyan('Nothing in your cart yet!'));
      }
    }).catch(err => {
      error(err);
    });
  });

program 
  .command('empty')
  .description('Empty your cart')
  .action(() => {
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
  });

program.parse(process.argv);
