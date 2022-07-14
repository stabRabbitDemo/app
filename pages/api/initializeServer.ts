import type { NextApiRequest, NextApiResponse } from 'next';
import { ClientResponse } from '../../types'
const serverInit = require('../../serverInit');

const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    let isRunning = false;
    let serverHealth;

    while (!isRunning) {
      await sleep(5000);
      serverHealth = await serverInit.checkServerStatus();
      if (serverHealth !== undefined) {
        if (serverHealth.status === 200) isRunning = true;
      };
    };

    const response = await serverInit.dropStream();
    if (response.commandStatus.status === 'SUCCESS') {
      const streamStatus: ClientResponse = await serverInit.createOrderStream();
      const unpaidTableStatus: ClientResponse = await serverInit.unpaidOrdersTable();
      const paidTableStatus: ClientResponse = await serverInit.paidOrdersTable();

      if (streamStatus.status === 200 && unpaidTableStatus.status === 200 && paidTableStatus.status === 200) return res.status(200).json({ status: 200 });
    }
    return res.status(200).json('Unsuccessful');
  };
}