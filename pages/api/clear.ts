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
    // to clear we can drop stream and rerun it or 

  } catch (error) {
    console.log(error);
  };
}