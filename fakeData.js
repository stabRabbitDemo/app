const ksqldb = require('ksqldb-js');
const { faker } = require('@faker-js/faker');
const fakeData = {};

const client = new ksqldb({ksqldbURL: 'http://localhost:8088'})

fakeData.createOrder = () => {
  const productName = faker.commerce.product();
  const unitPrice = parseInt(faker.commerce.price());
  const quantity = Math.floor(Math.random() * 100);
  const status = 'UNPAID';
  const orderId = faker.datatype.uuid();
  return {
    orderId,
    productName,
    unitPrice,
    quantity,
    status
  };
};

fakeData.addToOpenOrder = (dataArr) => {
  // insert the newly created order into the ORDERS stream with orderTopic
  // client.insertStream('ORDERS', dataArr);
  return;
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