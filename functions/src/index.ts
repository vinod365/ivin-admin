
import next from "next";
import * as path from 'path';

import { https, setGlobalOptions } from "firebase-functions/v2";



const dev = process.env.NODE_ENV !== "production";

setGlobalOptions({
  memory: "1GiB", 
  timeoutSeconds: 300,
});

const app = next({
  dev,
  conf: {
    distDir: path.join(__dirname, '..', '..', '.next', 'standalone')
  }
});

const handle = app.getRequestHandler();

let isAppReady = false;

async function initializeApp() {
  if (!isAppReady) {
    console.log("Preparing Next.js app for Cloud Function...");
    await app.prepare();
    isAppReady = true;
    console.log("Next.js app prepared.");
  }
}


export const nextApp = https.onRequest(async (req, res) => { // <--- req এবং res থেকে টাইপ সরিয়ে দিন
  await initializeApp();
  return handle(req, res);
});
