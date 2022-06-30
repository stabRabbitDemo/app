const { faker } = require('@faker-js/faker');
const fakeData = {};

fakeData.createOrder = () => {
  const productName = faker.commerce.product();
  const unitPrice = faker.commerce.price();
  const quantity = Math.floor(Math.random() * 100);
  const status = 'UNPAID';
  const orderId = uuid();
  return {
    orderId,
    productName,
    unitPrice,
    quantity,
    status
  };
};

fakeData.addToOpenOrder = (dataArr) => {

};

fakeData.updateOrderQty = (dataArr) => {
  //get unpaid orders from materialized view 
  //update all unpaid order quantities

};

fakeData.payOrder = (dataArr) => {
  //get all orders and pay them
};

console.log(fakeData.createOrder());

module.exports = fakeData;