// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fakeData from "../../fakeData";
import { Data } from "../../types";
const ksqldb = require("ksqldb-js");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = new ksqldb({ ksqldbURL: "http://localhost:8088" });

  // when button is clicked, a random order data is inserted into the ORDERS stream
  const data = fakeData.createOrder();
  // console.log("fake data in createOrder:", data);
  let responsedata;
  try {
    // data has to be in the format of {"orderId":"1", "productName":"brush", "unitPrice": "20", "quantity": 1, "status": "sa"}
    const response = await client.insertStream("ORDERS", [data]);
    // console.log(response);
    responsedata = response;
    // client.push(
    //   'SELECT * FROM ORDERS EMIT CHANGES;',
    //   (result: Object) => { console.log(result) }
    // );
  } catch (error) {
    console.log(error);
  }
  res.status(200).json(responsedata);
}
