import ldap from "ldapjs";

const bindDN = process.env.AD_USER;
const secret = process.env.AD_PASS;

export const baseDN = "dc=KI,dc=Local";

export const adClient = (): Promise<ldap.Client> => {
  return new Promise((resolve, reject) => {
    const config: ldap.ClientOptions = {
      url: "ldap://ki.local",
      bindDN,
    };

    const client = ldap.createClient(config);

    client.bind(bindDN, secret, (err, result) => {
      if (err) {
        reject(err);
      }
      client.on("end", () => client.unbind());
      resolve(client);
    });
  });
};
