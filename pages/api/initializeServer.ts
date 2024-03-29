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
      try {
        serverHealth = await serverInit.checkServerStatus();
        if (serverHealth.status !== undefined) {
          if (serverHealth.data.isHealthy === true) isRunning = true;
        };
      } catch (error) {
        console.log(error);
      }
    };
    let response;
    try {
      response = await serverInit.dropStream();
    } catch (error) {
      console.log(error);
    };

    if (response.commandStatus.status === 'SUCCESS') {
      const streamStatus: ClientResponse = await serverInit.createOrderStream();
      const unpaidTableStatus: ClientResponse = await serverInit.unpaidOrdersTable();
      const paidTableStatus: ClientResponse = await serverInit.paidOrdersTable();
      const archiveTableStatus: ClientResponse = await serverInit.archivedOrdersTable();
      if (streamStatus.status === 200 && unpaidTableStatus.status === 200 && paidTableStatus.status === 200 && archiveTableStatus.status === 200) return res.status(200).json({ status: 200 });
    }
    return res.status(200).json('Unsuccessful');
  };
}