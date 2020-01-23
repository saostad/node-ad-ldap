import { SearchResultAttribute } from "../typings/general-types";

export function isDistinguishedName(value: string) {
  if (!value || value.length === 0) return false;
  this.re.isDistinguishedName.lastIndex = 0; // Reset the regular expression
  return this.re.isDistinguishedName.test(value);
}

export function parseDistinguishedName(dn: string) {
  if (!dn) return dn;

  dn = dn.replace(/"/g, '\\"');
  return dn.replace("\\,", "\\\\,");
}

export function getUserQueryFilter(username?: string): string {
  if (!username) return "(objectCategory=User)";
  if (this.isDistinguishedName(username)) {
    return (
      "(&(objectCategory=User)(distinguishedName=" +
      this.parseDistinguishedName(username) +
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
  if (this.isDistinguishedName(groupName)) {
    return (
      "(&(objectCategory=Group)(distinguishedName=" +
      this.parseDistinguishedName(groupName) +
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

export async function getDistinguishedNames(filter: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const opts = {
      filter: filter,
      scope: "sub",
      attributes: ["dn"],
    };

    this.bind().then(client => {
      client.search(this.config.baseDN, opts, function(err, results) {
        if (err) {
          reject(err);
        }

        // Extract just the DN from the results
        const dns = [];
        results.on("searchEntry", entry => dns.push(entry.dn));
        results.on("end", () => resolve(dns[0]));
      });
    });
  });
}

export async function getUserDistinguishedName(
  username: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Already a dn?
    if (this.isDistinguishedName(username)) {
      resolve(username);
    }
    const query = this.getUserQueryFilter(username);

    this.getDistinguishedNames(query).then(dn => resolve(dn));
  });
}

export function joinAttributes(...args) {
  for (let index = 0, length = args.length; index < length; index++) {
    if (args[index]) {
      return [];
    }
  }
  return _.union(args);
}

export async function getGroupMembershipForDN(
  dn: string,
): Promise<SearchResultAttribute[][]> {
  return new Promise((resolve, reject) => {
    const opts = {
      filter: "(member=" + this.parseDistinguishedName(dn) + ")",
      scope: "sub",
      attributes: this.joinAttributes(this.defaultAttributes.group, [
        "groupType",
      ]),
    };

    this.bind().then(client => {
      client.search(this.config.baseDN, opts, function(err, results) {
        if (err) {
          reject(err);
          return;
        }

        const groups = [];
        results.on("searchEntry", entry =>
          groups.push(entry.attributes.map(el => el.json)),
        );
        results.on("end", () => {
          resolve(groups);
          client.unbind();
        });
      });
    });
  });
}
