#!/usr/bin/env node

const program = require('commander');
const argv = require('yargs').argv;

program
  .version('0.0.1')
  .description('Groceries are fun');

program
  .command('test')
  .action(() => {
    console.log('test');
  });

program.parse(process.argv)

