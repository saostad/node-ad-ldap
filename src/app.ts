import dotenv from "dotenv";
dotenv.config();
import { findUser, findGroup } from "./utils";

async function main() {
  const group = await findGroup("Users");
  console.log(`File: app.ts,`, `Line: 7 => `, group);
}

main();
