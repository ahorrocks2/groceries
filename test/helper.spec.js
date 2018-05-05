var assert = require('assert');
const { sortItems, validateQuantity, validatePrice } = require('../helpers/helper.js');

const items = [
  {
    name: 'SOME other item!',
    quantity: 2, 
    subTotal: 4
  },
  {
    name: 'test Item',
    quantity: 1,
    subTotal: 1
  },
  {
    name: 'atestitem',
    quantity: 3,
    subTotal: 3
  }
];

describe('Helper Tests', () => {
  describe('sortItems()', () => {
    it('should sort items by name asc', () => {
      const sortedItems = sortItems(items, { name: true });
      assert.equal(sortedItems[0].name, 'atestitem');
    });

    it('should sort items by subtotal asc', () => {
      const sortedItems = sortItems(items, { subtotal: true });
      assert.equal(sortedItems[0].name, 'test Item');
    });
  });

  describe('validateQuantity()', () => {
    it('should validate the quantity supplied is a number greater than 0', () => {
      assert.equal(validateQuantity('not a valid quantity'), false);
      assert.equal(validateQuantity(1), true);
      assert.equal(validateQuantity(0), false);
    });
  });

  describe('validatePrice()', () => {
    it('should validate the price supplied is a number greater than 0', () => {
      assert.equal(validateQuantity(.50), true);
      assert.equal(validateQuantity(1), true);
      assert.equal(validateQuantity('not a valid quantity'), false);
      assert.equal(validateQuantity(0), false);
      assert.equal(validateQuantity({}), false);
    });
  });
});