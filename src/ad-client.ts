import ldap from "ldapjs";
import type { Logger } from "pino";
import {
  findUser,
  findUsers,
  findGroup,
  getGroupMembershipForUser,
} from "./services";
import { UserAttributes } from "./entities/user";
import { GroupAttributes } from "./entities/group";

export const UserLdapAttributes = UserAttributes;
export const GroupLdapAttributes = GroupAttributes;

export interface IClientConfig extends ldap.ClientOptions {
  /**Password to connect to AD */
  secret: string;
  /**User to connect to AD */
  bindDN: string;
  /**Root of tree for search */
  baseDN?: string;
  /** Domain name with format: ldap://{domain.com} */
  url: string;
  /**instance of pino logger */
  logger?: Logger;
}

interface FindUsersInputOptions {
  attributes?: Partial<UserAttributes[]>;
}
interface FindGroupsInputOptions {
  attributes?: Partial<GroupAttributes[]>;
}

export class AdClient {
  private config: IClientConfig;
  private client?: ldap.Client;
  private logger?: Logger;
  public baseDN: string;

  constructor(config: IClientConfig) {
    this.config = config;
    this.baseDN = config.baseDN;
    this.client = ldap.createClient({
      ...this.config,
      log: this.config.logger,
    });
    this.bind();
  }

  public bind = (): Promise<ldap.Client> => {
    this.logger?.trace("bind()");
    return new Promise((resolve, reject) => {
      this.client.bind(this.config.bindDN, this.config.secret, (err) => {
        if (err) {
          reject(err);
        }

        resolve(this.client);
      });
    });
  };

  public unbind = () => {
    this.logger?.trace("unbind()");
    this.client.unbind();
  };

  private async connect() {
    this.logger?.trace("connect()");
    if (this.client && this.client.connected) {
      return this.client;
    }
    const client = await this.bind();
    return client;
  }

  /**return first found user */
  public async findUser(username: string, options?: FindUsersInputOptions) {
    this.logger?.trace("findUser()");
    await this.connect();
    return findUser({
      client: this.client,
      base: this.config.baseDN,
      username,
      attributes: options.attributes,
    });
  }

  /**return array of users based on UPN */
  public async findUsers(
    searchCriteria: string,
    options?: FindUsersInputOptions,
  ) {
    this.logger?.trace("findUsers()");
    const query = `userPrincipalName=*${searchCriteria}`;
    await this.connect();
    return findUsers({
      client: this.client,
      base: this.config.baseDN,
      query,
      attributes: options.attributes,
    });
  }

  /** return first found group or fail */
  public async findGroup(groupName: string, options?: FindGroupsInputOptions) {
    this.logger?.trace("findGroup()");
    await this.connect();
    return findGroup({
      client: this.client,
      base: this.config.baseDN,
      groupName,
      attributes: options.attributes,
    });
  }

  /** return array of groups */
  public async getGroupMembershipForUser(
    username: string,
    options?: FindGroupsInputOptions,
  ) {
    this.logger?.trace("getGroupMembershipForUser()");
    await this.connect();
    return getGroupMembershipForUser({
      client: this.client,
      base: this.config.baseDN,
      username,
      attributes: options.attributes,
    });
  }
}
