import type { NextApiRequest, NextApiResponse } from 'next';
const exec = require('child_process').exec;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    exec('docker compose up');
  };
}