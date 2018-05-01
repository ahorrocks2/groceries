#!/usr/bin/env node

const program = require('commander');
const argv = require('yargs').argv;

let store = [];

program
  .version('0.0.1')
  .description('Groceries are fun');

program
  .command('test')
  .action(() => {
    console.log('test');
  });

program
  .command('add <itemName>')
  .description('Add a product to your store')
  .action((itemName) => {
    const newItem = { itemName };
    store.push(newItem);
    console.log(store);
  });

program.parse(process.argv)

