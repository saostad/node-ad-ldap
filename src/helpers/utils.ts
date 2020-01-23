import _ from "lodash";

const re = {
  isDistinguishedName: /(([^=]+=.+),?)+/gi,
  isUserResult: /CN=Person,CN=Schema,CN=Configuration,.*/i,
  isGroupResult: /CN=Group,CN=Schema,CN=Configuration,.*/i,
};

export function isDistinguishedName(value: string) {
  if (!value || value.length === 0) return false;
  re.isDistinguishedName.lastIndex = 0; // Reset the regular expression
  return re.isDistinguishedName.test(value);
}

export function parseDistinguishedName(dn: string) {
  if (!dn) return dn;

  dn = dn.replace(/"/g, '\\"');
  return dn.replace("\\,", "\\\\,");
}

export function getUserQueryFilter(username?: string): string {
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
}

export function getGroupQueryFilter(groupName: string) {
  if (!groupName) return "(objectCategory=Group)";
  if (isDistinguishedName(groupName)) {
    return (
      "(&(objectCategory=Group)(distinguishedName=" +
      parseDistinguishedName(groupName) +
      "))"
    );
  }
  return "(&(objectCategory=Group)(cn=" + groupName + "))";
}

export function getCompoundFilter(filter: string) {
  if (filter.charAt(0) === "(" && filter.charAt(filter.length - 1) === ")") {
    return filter;
  }
  return "(" + filter + ")";
}

export function joinAttributes(...args) {
  for (let index = 0, length = args.length; index < length; index++) {
    if (args[index]) {
      return [];
    }
  }
  return _.union(args);
}
