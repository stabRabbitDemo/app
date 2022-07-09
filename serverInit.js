const ksqldb = require('ksqldb-js');
const client = new ksqldb({ ksqldbURL: 'http://localhost:8088' });

const serverInit = {};

//drop all tables/streams/topic
serverInit.dropStream = async () => {
  try {
    await client.ksql('DROP TABLE IF EXISTS unpaidOrdersTable;');
    await client.ksql('DROP TABLE IF EXISTS paidOrdersTable;');
    await client.ksql('DROP TABLE IF EXISTS unusualActivities;');
    await client.ksql('DROP STREAM IF EXISTS ORDERS DELETE TOPIC;');
  } catch (error) {
    console.log(error);
  };
};

//Create order stream
serverInit.createOrderStream = async () => {
  try {
    const result = await client.createStream
      (
        'ORDERS',
        [
          'orderId VARCHAR',
          'productName VARCHAR',
          'unitPrice INTEGER',
          'quantity INTEGER',
          'status STRING'
        ],
        'orderTopic',
        'json',
        1
      );
  } catch (error) {
    console.log(error);
  };
};

//create materialized view for open orders
serverInit.unpaidOrdersTable = async () => {
  try {
    const data = await client.createTableAs(
      'unpaidOrdersTable',
      'ORDERS',
      [
        'orderId AS Order_ID',
        'LATEST_BY_OFFSET(productName) AS Product_Name',
        'LATEST_BY_OFFSET(unitPrice) AS Unit_Price',
        'SUM(quantity) AS Quantity',
        'LATEST_BY_OFFSET(status) AS Status'
      ],
      {
        topic: 'orderTopic',
        value_format: 'json',
        partitions: '1'
      },
      {
        WHERE: "LATEST_BY_OFFSET(status) = 'UNPAID'",
        GROUP_BY: 'orderId'
      }
    );
  } catch (error) {
    console.log(error);
  };
};

//create materialized view for paid orders
serverInit.paidOrdersTable = async () => {
  try {

    // const data = await client.ksql(`CREATE TABLE paidOrdersTable 
    // WITH (kafka_topic='orderTopic', value_format='json', partitions='1') 
    // AS SELECT orderId AS Order_ID, LATEST_BY_OFFSET(productName) AS Product_Name, LATEST_BY_OFFSET(unitPrice) AS Unit_Price, 
    // SUM(quantity) AS Quantity, 
    // LATEST_BY_OFFSET(status) AS Status FROM ORDERS 
    // WHERE status = 'PAID' GROUP BY orderId EMIT CHANGES;`);
    const data = await client.createTableAs(
      'paidOrdersTable',
      'ORDERS',
      [
        'orderId AS Order_ID',
        'LATEST_BY_OFFSET(productName) AS Product_Name',
        'LATEST_BY_OFFSET(unitPrice) AS Unit_Price',
        'SUM(quantity) AS Quantity',
        'LATEST_BY_OFFSET(status) AS Status'
      ],
      {
        topic: 'orderTopic',
        value_format: 'json',
        partitions: '1'
      },
      {
        WHERE: `LATEST_BY_OFFSET(status) = 'PAID'`,
        GROUP_BY: 'orderId'
      }
    );
  } catch (error) {
    console.log(error);
  };
};

//create materialized view for unusual activities
serverInit.unusualActivities = async () => {
  try {
    const data = await client.createTableAs
      (
        'unusualActivities',
        'ORDERS',
        [
          'orderId',
          'productName',
          'unitPrice',
          'quantity',
          'status',
          'count(*) AS attempts',
          'WINDOWSTART AS start_boundary',
          'WINDOWEND as end_boundary'
        ],
        {
          topic: 'orderTopic',
          value_format: 'json',
          partitions: '1'
        },
        {
          WHERE: `status = 'PAID'`,
          GROUP_BY: 'orderId'
        }
      );
  } catch (error) {
    console.log(error);
  };
};

const runserverInit = async () => {
// await serverInit.dropStream(); // <- RUN FIRST ALONE
// await serverInit.createOrderStream();
// await serverInit.unpaidOrdersTable();
// await serverInit.paidOrdersTable();
// await serverInit.unusualActivities();
}

runserverInit()

module.exports = serverInit;