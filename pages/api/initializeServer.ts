import type { NextApiRequest, NextApiResponse } from 'next';
const serverInit = require('../../serverInit');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const response = await serverInit.dropStream();
    if (response.commandStatus.status === 'SUCCESS') {
      await serverInit.createOrderStream();
      await serverInit.unpaidOrdersTable();
      await serverInit.paidOrdersTable();
      return res.status(200).json('Initialized');
    }
    return res.status(200).json('Unsuccessful');
  };
}