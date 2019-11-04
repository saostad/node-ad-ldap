import dotenv from "dotenv";
dotenv.config();
import { findUser } from "./utils";

async function main() {
  const testUserName = "SOstad";

  await findUser(testUserName);
}

main();
