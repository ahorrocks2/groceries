#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const { addItemToCart, getAndSortItems, emptyCart, removeItemFromCart } = require('./logic.js');

program
  .version('0.0.1')
  .description(chalk.blueBright('Welcome to your cart - Use the commands below to start shopping'));

program
  .command('add <itemName>')
  .description('Add an item to your cart')
  .action((itemName) => {
    addItemToCart(itemName);
  });

program
  .command('remove <itemName>')
  .description('Remove an item from your cart')
  .action((itemName) => {
    removeItemFromCart(itemName);
  });

program 
  .command('items [direction]')
  .option('-n, --name', 'Optionl: sort cart items by name')
  .option('-s, --subtotal', 'Optional: sort cart items by subtotal')
  .description(`List the item(s) in your cart with optional sorting by name (-n) or subtotal (-s) and direction ascending (asc) or descending (desc)`)
  .action((direction, options) => {
    getAndSortItems(direction, options);
  });

program 
  .command('empty')
  .description('Empty your cart')
  .action(() => {
    emptyCart();
  });

program.parse(process.argv);
