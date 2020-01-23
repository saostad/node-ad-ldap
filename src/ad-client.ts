import ldap from "ldapjs";
import _ from "lodash";
import { Group } from "./group";
import { User } from "./user";
import { SearchResultAttribute } from "./typings/general-types";

export interface IClientConfig extends ldap.ClientOptions {
  /**Password to connect to AD */
  secret: string;
  /**User to connect to AD */
  baseDN: string;
  /** Domain name with format: ldap://{domain.com} */
  url: string;
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

  public bind = (): Promise<ldap.Client> => {
    return new Promise((resolve, reject) => {
      this.client = ldap.createClient(this.config);

      this.client.bind(this.config.bindDN, this.config.secret, err => {
        if (err) {
          reject(err);
        }
        resolve(this.client);
      });
    });
  };

  public findUser = (username: string): Promise<User> => {
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
            resolve(new User().rawToObj(entry.attributes));
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

  public findGroup = (
    groupName: string,
    options?: { attributes: string[] },
  ): Promise<Group> => {
    return new Promise((resolve, reject) => {
      const opts = {
        filter: this.getGroupQueryFilter(groupName),
        scope: "sub",
        attributes: options?.attributes
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
            resolve(new Group().rawToObj(entry.attributes)),
          );
          results.on("error", err => reject(err));
          results.on("end", () => client.unbind());
        });
      });
    });
  };

  public findUsers = (query: string): Promise<User[]> => {
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
            resolve(users.map(el => new User().rawToObj(el)));
          });
        });
      });
    });
  };

  public getGroupMembershipForUser = async (
    username: string,
  ): Promise<Group[]> => {
    const dn = await this.getUserDistinguishedName(username);

    const groups = await this.getGroupMembershipForDN(dn);
    const groupsObj = groups.map(el => new Group().rawToObj(el));
    return groupsObj;
  };
}
