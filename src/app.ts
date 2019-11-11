import dotenv from "dotenv";
dotenv.config();

import { IClientConfig, AdClient } from "./client";

const bindDN = process.env.AD_USER;
const secret = process.env.AD_PASS;

export const baseDN = "dc=KI,dc=Local";

async function main() {
  const config: IClientConfig = {
    url: "ldap://ki.local",
    bindDN,
    secret,
    baseDN,
  };
  const adClient = new AdClient(config);
  const items = await adClient.getGroupMembershipForUser("sostad");
  items.map(el => console.log(`File: app.ts,`, `Line: 20 => `, el.cn));
}

main();
