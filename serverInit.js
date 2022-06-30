const ksqldb = require('ksqldb-js');
const client = new ksqldb({ ksqldbURL: 'http://localhost:8088' });

//drop all tables/streams/topic
const dropStream = async () => {
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
const createOrderStream = async () => {
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
        5
      );
  } catch (error) {
    console.log(error);
  };
};

//create materialized view for open orders
const unpaidOrdersTable = async () => {
  try {
    const data = await client.createTableAs(
      'unpaidOrdersTable',
      'ORDERS',
      [
        'orderId AS Order ID',
        'productName AS Product Name',
        'unitPrice AS Unit Price',
        'LATEST_BY_OFFSET(status) AS Status'
      ],
      {
        topic: 'orderTopic',
        value_format: 'json',
        partitions: '3'
      },
      {
        WHERE: 'status = UNPAID',
        GROUP_BY: 'orderId'
      }
    );
  } catch (error) {
    console.log(error);
  };
};

//create materialized view for paid orders
const paidOrdersTable = async () => {
  try {
    const data = await client.createTableAs(
      'paidOrdersTable',
      'ORDERS',
      [
        'orderId',
        'LATEST_BY_OFFSET(status) AS recentStatus'
      ],
      {
        topic: 'orderTopic',
        value_format: 'json',
        partitions: '3'
      },
      {
        WHERE: 'status = PAID',
        GROUP_BY: 'orderId'
      }
    );
  } catch (error) {
    console.log(error);
  };
};

//create materialized view for unusual activities
const unusualActivities = async () => {
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
          partitions: '3'
        },
        {
          WHERE: 'status = PAID',
          GROUP_BY: 'orderId'
        }
      );
  } catch (error) {
    console.log(error);
  };
};

dropStream();
createOrderStream();
paidOrdersTable();
unpaidOrdersTable();
unusualActivities();