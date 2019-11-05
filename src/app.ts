import dotenv from "dotenv";
dotenv.config();
import {
  findUser,
  findGroup,
  findUsers,
  getGroupMembershipForUser,
} from "./utils";

async function main() {
  const groups = await getGroupMembershipForUser("sostad");
  groups.map(el => console.log(`File: app.ts,`, `Line: 14 => `, el));
}

main();
