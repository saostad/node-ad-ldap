import ldap from "ldapjs";

const bindDN = process.env.AD_USER;
const secret = process.env.AD_PASS;

export const baseDN = "dc=KI,dc=Local";

export const adClient: Promise<ldap.Client> = new Promise((resolve, reject) => {
  const config: ldap.ClientOptions = {
    url: "ldap://ki.local",
    bindDN,
  };

  const client = ldap.createClient(config);

  client.bind(bindDN, secret, (err, result) => {
    if (err) {
      reject(err);
    }
    resolve(client);
  });
});

// const searchOption: ldap.SearchOptions = {
//   scope: "sub",
//   filter: "(objectclass=Container)",
//   paged: true,
//   sizeLimit: 20,
// };

// client.search(baseDN, searchOption, (err, res) => {
//   if (err) {
//     console.log(`File: app.ts,`, `Line: 29 => `, err);
//   }

//   res.on("searchEntry", function(entry) {
//     console.log(`File: app.ts,`, `Line: 35 => `, entry.objectName);
//   });
//   res.on("page", function(result) {
//     console.log("page end", result);
//   });
//   res.on("error", function(resErr) {
//     console.log(`File: app.ts,`, `Line: 40 => `, resErr);
//   });
//   res.on("end", function(result) {
//     console.log("done ");
//   });
// });
