export * from "./ad-client";

/** HOW TO USE */
// import { AdClient, UserLdapAttributes, GroupLdapAttributes } from "./ad-client";
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
//     baseDN: "DC=ki,DC=local",
//     logger,
//   });

//   const users = await adClient
//     .findUsers("kajimausa.com", {
//       attributes: [
//         UserLdapAttributes.mobile,
//         UserLdapAttributes.streetAddress,
//         UserLdapAttributes.postOfficeBox,
//         UserLdapAttributes.countryCode,
//         UserLdapAttributes.title,
//         UserLdapAttributes.department,
//         UserLdapAttributes.manager,
//         UserLdapAttributes.cn,
//         UserLdapAttributes.telephoneNumber,
//       ],
//     })
//     .catch((err) => writeLog(err, { stdout: true }));

//   console.log(`File: app.ts,`, `Line: 40 => `, users);

//   const group = await adClient
//     .findGroup("Domain Users", {
//       attributes: [
//         GroupLdapAttributes.cn,
//         GroupLdapAttributes.groupType,
//         GroupLdapAttributes.memberOf,
//         GroupLdapAttributes.member,
//       ],
//     })
//     .catch((err) => writeLog(err, { stdout: true }));

//   console.log(`File: app.ts,`, `Line: 54 => `, group);

//   const client = await adClient.bind();
//   let counter = 0;
//   client.search(
//     "CN=Schema,CN=Configuration,DC=ki,DC=local",
//     {
//       filter: "&(objectClass=classSchema)(cn=User)",
//       scope: "one",
//       attributes: ["mayContain"],
//     },
//     (err, res) => {
//       if (err) {
//         throw err;
//       }
//       if (!err) {
//         res.on("searchEntry", (entry) => {
//           counter++;
//           console.log(
//             `File: app.ts,`,
//             `Line: 73 => `,
//             counter,
//             entry.json.attributes.map((el) => el.vals.join()),
//           );
//         });
//       }
//       res.on("end", (res) => {
//         adClient.unbind();
//       });
//     },
//   );
// }
// main().finally(() => {
//   // adClient.unbind();
// });
