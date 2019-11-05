import { SearchOptions, SearchEntry } from "ldapjs";
import { adClient, baseDN } from "./client";
import { rejects } from "assert";

// Precompile some common, frequently used regular expressions.
const re = {
  isDistinguishedName: /(([^=]+=.+),?)+/gi,
  isUserResult: /CN=Person,CN=Schema,CN=Configuration,.*/i,
  isGroupResult: /CN=Group,CN=Schema,CN=Configuration,.*/i,
};

const defaultAttributes = {
  user: [
    "dn",
    "userPrincipalName",
    "sAMAccountName",
    /*'objectSID',*/ "mail",
    "lockoutTime",
    "whenCreated",
    "pwdLastSet",
    "userAccountControl",
    "employeeID",
    "sn",
    "givenName",
    "initials",
    "cn",
    "displayName",
    "comment",
    "description",
    "distinguishedName",
    "whenChanged",
    "name",
    "nTSecurityDescriptor",
    "objectCategory",
    "objectClass",
  ],
  group: ["dn", "cn", "description"],
};

const isDistinguishedName = (value: string) => {
  if (!value || value.length === 0) return false;
  re.isDistinguishedName.lastIndex = 0; // Reset the regular expression
  return re.isDistinguishedName.test(value);
};

const parseDistinguishedName = (dn: string) => {
  if (!dn) return dn;

  dn = dn.replace(/"/g, '\\"');
  return dn.replace("\\,", "\\\\,");
};

export const getUserQueryFilter = (username: string) => {
  if (!username) return "(objectCategory=User)";
  if (isDistinguishedName(username)) {
    return (
      "(&(objectCategory=User)(distinguishedName=" +
      parseDistinguishedName(username) +
      "))"
    );
  }

  return (
    "(&(objectCategory=User)(|(sAMAccountName=" +
    username +
    ")(userPrincipalName=" +
    username +
    ")))"
  );
};

const getUserDistinguishedName = (username: string) => {};

const getGroupMembershipForUser = (username: string) => {
  //getUserDistinguishedName(username)
};

const isUserMemberOf = (username: string, groupName: string) => {
  //getGroupMembershipForUser(username)
};

interface FindUserResult {
  type: string;
  vals: string[];
}
export const findUser = (username: string): Promise<FindUserResult[]> => {
  return new Promise((resolve, reject) => {
    const opts: SearchOptions = {
      filter: getUserQueryFilter(username),
      scope: "sub",
      attributes: defaultAttributes.user,
    };
    adClient().then(client => {
      client.search(baseDN, opts, (err, res) => {
        if (err) {
          reject(err);
        }
        res.on("searchEntry", function(entry) {
          resolve(entry.attributes.map(el => el.json));
        });
        res.on("error", function(resErr) {
          reject(resErr);
        });
        res.on("end", function(result) {
          client.unbind();
        });
      });
    });
  });
};
