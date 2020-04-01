export * from "./ad-client";

/** HOW TO USE */
// import { AdClient } from "./ad-client";
// import { config } from "dotenv";
// import { createLogger, writeLog } from "fast-node-logger";
// config();

// let adClient: AdClient;

// async function main() {
//   const logger = await createLogger();

//   adClient = new AdClient({
//     bindDN: process.env.AD_USER,
//     secret: process.env.AD_Pass,
//     url: process.env.AD_URI,
//     baseDN: "dc=KI,dc=Local",
//     logger,
//   });

//   const data = await adClient
//     .findGroup("AB-ST2000")
//     .catch((err) => writeLog(err, { stdout: true }));

//   console.log(`File: app.ts,`, `Line: 9 => `, data);
// }
// main().finally(() => {
//   adClient.unbind();
// });
