import { SearchOptions } from "ldapjs";
import { adClient, baseDN } from "./client";

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
  ],
  group: ["dn", "cn", "description"],
};

const isDistinguishedName = value => {
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

export const findUser = async (username: string) => {
  const opts: SearchOptions = {
    filter: getUserQueryFilter(username),
    scope: "sub",
    attributes: defaultAttributes.user,
  };
  const client = await adClient();
  client.search(baseDN, opts, (err, res) => {
    if (err) {
      console.log(`File: utils.ts,`, `Line: 82 => `, err);
    }
    res.on("searchEntry", function(entry) {
      entry.attributes.forEach(el => {
        console.log(el.toString());
      });
    });
    res.on("page", function(result) {
      console.log("page end", result);
    });
    res.on("error", function(resErr) {
      console.log(`File: app.ts,`, `Line: 40 => `, resErr);
    });
    res.on("end", function(result) {
      console.log("done ");
      client.unbind();
    });
  });
};
