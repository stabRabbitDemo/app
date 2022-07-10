import type { NextApiRequest, NextApiResponse } from 'next'
import fakeData from '../../fakeData'
import {Data} from '../../types';
const ksqldb = require('ksqldb-js');

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const client = new ksqldb({ ksqldbURL: 'http://localhost:8088'});
    let data;
    try {
        const rawData = await client.pull('SELECT * FROM unpaidOrdersTable;');
        // remove meta data and return just row data
        data = rawData.slice(1);
    } catch (error) {
        console.log(error);
    };
    // console.log(data)
    res.status(200).json(data);
}