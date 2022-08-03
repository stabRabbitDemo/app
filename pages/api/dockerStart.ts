import type { NextApiRequest, NextApiResponse } from 'next';
const exec = require('child_process').exec;

const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let isRunning = false;
  let tries: number = 0;
  let execResponse, inspectStatus;
  if (req.method === 'POST') {
    exec('docker-compose up');
    while (!isRunning || tries === 10) {
      await sleep(3000);
      execResponse = exec('docker container inspect ksqldb-server', (error: string, stdout: string, stderr: string) => {
        if (error) console.log(error);
        inspectStatus = JSON.parse(stdout);
        isRunning = inspectStatus[0].State.Running;
      });
      tries++;
    };
    if (tries === 10) return res.status(200).json({ isRunning });
    return res.status(200).json({ isRunning });
  }
}