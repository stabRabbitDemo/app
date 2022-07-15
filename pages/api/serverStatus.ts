import type { NextApiRequest, NextApiResponse } from "next";
import fakeData from "../../fakeData";
import { Data } from "../../types";
const ksqldb = require("ksqldb-js");
const serverInit = require("../../serverInit");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Boolean>
) {
  const client = new ksqldb({ ksqldbURL: "http://localhost:8088" });

  let serverHealth;
  let isRunning = false;
  try {
    // to clear we can drop stream and rerun it or
    serverHealth = await serverInit.checkServerStatus();
    if (serverHealth.status !== undefined) {
      if (serverHealth.data.isHealthy === true) isRunning = true;
    }
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json(isRunning);
}
