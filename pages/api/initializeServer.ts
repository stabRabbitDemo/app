import type { NextApiRequest, NextApiResponse } from 'next';
const serverInit = require('../../serverInit');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await serverInit.dropStream();
    // await serverInit.createOrderStream();
    // await serverInit.unpaidOrdersTable();
    // await serverInit.paidOrdersTable();
    // await serverInit.unusualActivities();
    return res.status(200).json('Initialized');
  };
}