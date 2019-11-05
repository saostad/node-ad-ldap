import dotenv from "dotenv";
dotenv.config();
import { findUser, findGroup, findUsers } from "./utils";

async function main() {
  const users = await findUsers("userPrincipalName=*kajimausa*");
  users.forEach(el => console.log(`File: app.ts,`, `Line: 7 => `, el));
}

main();
