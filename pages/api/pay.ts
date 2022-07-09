import type { NextApiRequest, NextApiResponse } from 'next'
import fakeData from '../../fakeData'
import {Data} from '../../types';
const ksqldb = require('ksqldb-js');

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = new ksqldb({ ksqldbURL: 'http://localhost:8088' });
  
  try {
    const rawData = client.pull('SELECT * FROM paidOrdersTable');
    const insertData = [];
    // each data in insertStream has to be in the format of {"orderId":"1", "productName":"brush", "unitPrice": "20", "quantity": 1, "status": "sa"}

    for (let i = 1; i < rawData.length; i++){
      insertData.push({"orderId":rawData[i][0], "productName":rawData[i][1],
       "unitPrice": rawData[i][2], "quantity": rawData[i][3], "status": "PAID"});
    }  
    client.insertStream('ORDERS', insertData);

  } catch (error) {
    console.log(error);
  };
  // res.status(200).json(data);
}