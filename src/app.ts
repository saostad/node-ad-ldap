/** HOW TO USE */
import { AdClient, UserLdapAttributes, GroupLdapAttributes } from "./index";
import { config } from "dotenv";
import { createLogger, writeLog } from "fast-node-logger";

config();

let adClient: AdClient;

async function main() {
  const logger = await createLogger({ prettyPrint: { colorize: true } });

  adClient = new AdClient({
    bindDN: process.env.AD_USER,
    secret: process.env.AD_Pass,
    url: process.env.AD_URI,
    baseDN: "DC=ki,DC=local",
    logger,
  });

  // /** get displayName and distinguished name  of empty groups */
  // const groups = await adClient.query({
  //   options: {
  //     filter: "(&(objectClass=group)(!(member=*)))",
  //     attributes: ["displayName", "dn"],
  //     scope: "sub",
  //     paged: true,
  //   },
  // });
  // console.log(`File: app.ts,`, `Line: 28 => `, groups);

  // const groupMemberships = await adClient.getGroupMembershipForUser(`sostad`, {
  //   attributes: [GroupLdapAttributes.displayName],
  // });
  // console.log(`File: app.ts,`, `Line: 24 => `, groupMemberships);

  // const users = await adClient
  //   .findUsers("kajimausa.com", {
  //     attributes: [
  //       UserLdapAttributes.mobile,
  //       UserLdapAttributes.streetAddress,
  //       UserLdapAttributes.postOfficeBox,
  //       UserLdapAttributes.countryCode,
  //       UserLdapAttributes.title,
  //       UserLdapAttributes.department,
  //       UserLdapAttributes.manager,
  //       UserLdapAttributes.cn,
  //       UserLdapAttributes.telephoneNumber,
  //     ],
  //   })
  //   .catch((err) => writeLog(err, { stdout: true }));

  // console.log(`File: app.ts,`, `Line: 40 => `, users);

  // const group = await adClient
  //   .findGroup("Domain Users", {
  //     attributes: [
  //       GroupLdapAttributes.cn,
  //       GroupLdapAttributes.groupType,
  //       GroupLdapAttributes.memberOf,
  //       GroupLdapAttributes.member,
  //     ],
  //   })
  //   .catch((err) => writeLog(err, { stdout: true }));

  // console.log(`File: app.ts,`, `Line: 54 => `, group);

  // const client = await adClient.bind();
  // let counter = 0;
  // client.search(
  //   "",
  //   {
  //     filter: "(&(objectClass=*))",
  //     scope: "base",
  //     attributes: ["supportedSASLMechanisms:"],
  //   },
  //   (err, res) => {
  //     if (err) {
  //       throw err;
  //     }
  //     if (!err) {
  //       res.on("searchEntry", (entry) => {
  //         counter++;
  //         console.log(`File: app.ts,`, `Line: 73 => `, counter, entry.object);
  //       });
  //     }
  //     res.on("end", (res) => {
  //       adClient.unbind();
  //     });
  //   },
  // );
}
main().finally(() => {
  adClient.unbind();
});
