import dotenv from "dotenv";
dotenv.config();
import { findUser } from "./utils";

async function main() {
  const user1 = await findUser("aparente");
  console.log(`File: app.ts,`, `Line: 9 => `, user1);
}

main();
