export * from "./ad-client";

/** HOW TO USE */
import { AdClient } from "./ad-client";

async function main() {
  const ad = new AdClient({
    baseDN: "kiadquery",
    secret: "DFe;0gy@8:DLV*yW",
    url: "ldap://ki.local",
  });
  const user = await ad.findUser("sostad");
  console.log(`File: app.ts,`, `Line: 9 => `, user);
}
main();
