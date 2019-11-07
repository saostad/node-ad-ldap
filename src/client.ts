import ldap from "ldapjs";
import _ from "lodash";

export interface IClientConfig extends ldap.ClientOptions {
  secret: string;
  baseDN: string;
}
export interface SearchResultAttribute {
  type: string;
  vals: string[];
}

export class AdClient {
  private config: IClientConfig;
  private client: ldap.Client;

  private re = {
    isDistinguishedName: /(([^=]+=.+),?)+/gi,
    isUserResult: /CN=Person,CN=Schema,CN=Configuration,.*/i,
    isGroupResult: /CN=Group,CN=Schema,CN=Configuration,.*/i,
  };

  private defaultAttributes = {
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

  constructor(config: IClientConfig) {
    this.config = config;
  }

  bind = (): Promise<ldap.Client> => {
    return new Promise((resolve, reject) => {
      this.client = ldap.createClient(this.config);

      this.client.bind(this.config.bindDN, this.config.secret, err => {
        if (err) {
          reject(err);
        }
        resolve(this.client);
      });
    });
  }; /**end bind() */

  private isDistinguishedName = (value: string) => {
    if (!value || value.length === 0) return false;
    this.re.isDistinguishedName.lastIndex = 0; // Reset the regular expression
    return this.re.isDistinguishedName.test(value);
  };

  private parseDistinguishedName = (dn: string) => {
    if (!dn) return dn;

    dn = dn.replace(/"/g, '\\"');
    return dn.replace("\\,", "\\\\,");
  };

  private getUserQueryFilter = (username?: string): string => {
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
  };

  findUser = (username: string): Promise<SearchResultAttribute[]> => {
    return new Promise((resolve, reject) => {
      const opts: ldap.SearchOptions = {
        filter: this.getUserQueryFilter(username),
        scope: "sub",
        attributes: this.defaultAttributes.user,
      };
      this.bind().then(client => {
        client.search(this.config.baseDN, opts, (err, res) => {
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

  private getGroupQueryFilter = (groupName: string) => {
    if (!groupName) return "(objectCategory=Group)";
    if (this.isDistinguishedName(groupName)) {
      return (
        "(&(objectCategory=Group)(distinguishedName=" +
        this.parseDistinguishedName(groupName) +
        "))"
      );
    }
    return "(&(objectCategory=Group)(cn=" + groupName + "))";
  };

  findGroup = (
    groupName: string,
    options: { attributes: string[] },
  ): Promise<SearchResultAttribute[]> => {
    return new Promise((resolve, reject) => {
      const opts = {
        filter: this.getGroupQueryFilter(groupName),
        scope: "sub",
        attributes: options.attributes
          ? options.attributes
          : this.defaultAttributes.group,
      };

      this.bind().then(client => {
        client.search(this.config.baseDN, opts, function onSearch(
          err,
          results,
        ) {
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

  private getCompoundFilter = (filter: string) => {
    if (filter.charAt(0) === "(" && filter.charAt(filter.length - 1) === ")") {
      return filter;
    }
    return "(" + filter + ")";
  };

  findUsers = (query: string): Promise<SearchResultAttribute[][]> => {
    return new Promise((resolve, reject) => {
      const defaultUserFilter =
        "(|(objectClass=user)(objectClass=person))(!(objectClass=computer))(!(objectClass=group))";

      const opts = {
        filter: "(&" + defaultUserFilter + this.getCompoundFilter(query) + ")",
        scope: "sub",
        attributes: this.defaultAttributes.user,
      };

      this.bind().then(client => {
        client.search(this.config.baseDN, opts, function onSearch(
          err,
          results,
        ) {
          if (err) {
            reject(err);
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

  private getDistinguishedNames = (filter: string): Promise<string> => {
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
  };

  private getUserDistinguishedName = (username: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Already a dn?
      if (this.isDistinguishedName(username)) {
        resolve(username);
      }
      const query = this.getUserQueryFilter(username);

      this.getDistinguishedNames(query).then(dn => resolve(dn));
    });
  };

  private joinAttributes = (...args) => {
    for (let index = 0, length = args.length; index < length; index++) {
      if (args[index]) {
        return [];
      }
    }
    return _.union(args);
  };

  private getGroupMembershipForDN = async (
    dn: string,
  ): Promise<SearchResultAttribute[][]> => {
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
  };

  getGroupMembershipForUser = async (username: string) => {
    const dn = await this.getUserDistinguishedName(username);

    const groups = await this.getGroupMembershipForDN(dn);
    return groups;
  };
}
