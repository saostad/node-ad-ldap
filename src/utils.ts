import { SearchOptions } from "ldapjs";
import { adClient, baseDN } from "./client";

// Pre-compile some common, frequently used regular expressions.
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

export const getUserQueryFilter = (username?: string): string => {
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

interface SearchResultAttribute {
  type: string;
  vals: string[];
}
export const findUser = (
  username: string,
): Promise<SearchResultAttribute[]> => {
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

const getGroupQueryFilter = (groupName: string) => {
  if (!groupName) return "(objectCategory=Group)";
  if (isDistinguishedName(groupName)) {
    return (
      "(&(objectCategory=Group)(distinguishedName=" +
      parseDistinguishedName(groupName) +
      "))"
    );
  }
  return "(&(objectCategory=Group)(cn=" + groupName + "))";
};

export const findGroup = (
  groupName: string,
): Promise<SearchResultAttribute[]> => {
  return new Promise((resolve, reject) => {
    const opts = {
      filter: getGroupQueryFilter(groupName),
      scope: "sub",
      attributes: defaultAttributes.group,
    };

    adClient().then(client => {
      client.search(baseDN, opts, function onSearch(err, results) {
        if (err) {
          reject(err);
        }

        if (!results) {
          reject(`Group ${groupName} not found`);
        }
        results.on("searchEntry", entry =>
          resolve(entry.attributes.map(el => el.json)),
        );
        results.on("error", err => reject(err));
        results.on("end", () => client.unbind());
      });
    });
  });
};

const getCompoundFilter = (filter: string) => {
  if (filter.charAt(0) === "(" && filter.charAt(filter.length - 1) === ")") {
    return filter;
  }
  return "(" + filter + ")";
};

export const findUsers = (
  query: string,
): Promise<SearchResultAttribute[][]> => {
  return new Promise((resolve, reject) => {
    const defaultUserFilter =
      "(|(objectClass=user)(objectClass=person))(!(objectClass=computer))(!(objectClass=group))";

    const opts = {
      filter: "(&" + defaultUserFilter + getCompoundFilter(query) + ")",
      scope: "sub",
      attributes: defaultAttributes.user,
    };
    console.log(`File: utils.ts,`, `Line: 170 => `, opts.filter);

    adClient().then(client => {
      client.search(baseDN, opts, function onSearch(err, results) {
        if (err) {
          reject(err);
        }

        if (!results) {
          console.log(`No users found matching query ${opts.filter} `);
        }

        const users: SearchResultAttribute[][] = [];
        results.on("searchEntry", entry =>
          users.push(entry.attributes.map(el => el.json)),
        );
        results.on("end", () => {
          client.unbind();
          resolve(users);
        });
      });
    });
  });
};
