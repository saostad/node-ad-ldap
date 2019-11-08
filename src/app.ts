import dotenv from "dotenv";
import { IClientConfig, AdClient } from "./client";
import { Group } from "./group";
dotenv.config();

const bindDN = process.env.AD_USER;
const secret = process.env.AD_PASS;

export const baseDN = "dc=KI,dc=Local";

async function main() {
  //   const config: IClientConfig = {
  //     url: "ldap://ki.local",
  //     bindDN,
  //     secret,
  //     baseDN,
  //   };
  //   const adClient = new AdClient(config);
  //   const groups = await adClient.getGroupMembershipForUser("sostad");
  //   groups.map(el => console.log(`File: app.ts,`, `Line: 14 => `, el));

  const g1 = new Group({ Parent: "Ali" });
  console.log(`File: app.ts,`, `Line: 23 => `, g1);
}

main();
