import type { NextApiRequest, NextApiResponse } from "next";
import fakeData from "../../fakeData";
import { Data } from "../../types";
const ksqldb = require("ksqldb-js");

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const client = new ksqldb({ ksqldbURL: "http://localhost:8088" });
    let data;
    try {
        const unpaidList = await client.pull("SELECT * FROM unpaidOrdersTable;");
        const paidList = await client.pull("SELECT * FROM paidOrdersTable;");
        const insertData = [];
        // fill insert data with both lists
        for (let i = 1; i < unpaidList.length; i++){
            insertData.push({
                orderId: unpaidList[i][0],
                productName: unpaidList[i][1],
                unitPrice: unpaidList[i][2],
                quantity: unpaidList[i][3],
                status: "ARCHIVED"
            });
        }
        for (let i = 1; i < paidList.length; i++){
            insertData.push({
                orderId:paidList[i][0],
                productName: paidList[i][1],
                unitPrice: paidList[i][2],
                quantity: paidList[i][3],
                status: "ARCHIVED"
            });
        }
        data = client.insertStream("ORDERS", insertData);
    } catch (error) {
        console.log(error);
    }
    res.status(200).json(data)
}