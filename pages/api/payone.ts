import type { NextApiRequest, NextApiResponse } from 'next'
import fakeData from '../../fakeData'
import {Data} from '../../types';
const ksqldb = require('ksqldb-js');

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = new ksqldb({ ksqldbURL: 'http://localhost:8088' });
  const rowValues = JSON.parse(req.body)
  let data
  try {
    const insertData = [];
    // each data in insertStream has to be in the format of {"orderId":"1", "productName":"brush", "unitPrice": "20", "quantity": 1, "status": "sa"}
    insertData.push({"orderId": rowValues[0], "productName": rowValues[1], "unitPrice": rowValues[2], "quantity": rowValues[3], "status": "PAID"})
    data = client.insertStream('ORDERS', insertData);

  } catch (error) {
    console.log(error);
  };
  res.status(200).json(data);
}