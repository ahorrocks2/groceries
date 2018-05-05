#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const { addItemToCart, getAndSortItems, emptyCart, removeItemFromCart, displayCommands } = require('./logic.js');

program
  .version('0.0.1');

program 
  .command('help')
  .description('List available commands.')
  .action(() => {
    displayCommands();
  });

program
  .command('add <itemName>')
  .action((itemName) => {
    addItemToCart(itemName);
  });

program
  .command('remove <itemName>')
  .action((itemName) => {
    removeItemFromCart(itemName);
  });

program 
  .command('items [direction]')
  .option('-n, --name')
  .option('-s, --subtotal')
  .parse(process.argv)
  .action((direction, options) => {
    getAndSortItems(direction, options);
  });

program 
  .command('empty')
  .action(() => {
    emptyCart();
  });

program.parse(process.argv);
