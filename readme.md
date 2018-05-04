# GroceryCart
This simple console application with a not so creative name allows you add and remove items from a grocery cart. You can also empty the cart or view all items in your cart. 

## Getting Started
After cloning the repository: 

- Install dependencies `npm install`
- Create a  symlink `npm link`
- Add a `.env` file in the root directory and add the APIKey provided by me 
- Run `grocerycart --help` for more information on available commands:
  - add [item name]
  - remove [item name]
  - items [--name or --subtotal] [asc or desc]
  - empty

### Built With:

* [Commander](https://www.npmjs.com/package/commander) - CLI Interface
* [Inquirer](https://www.npmjs.com/package/inquirer) - Interactive CLI tool
