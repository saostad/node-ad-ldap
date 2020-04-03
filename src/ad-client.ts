import ldap from "ldapjs";
import { Logger } from "pino";
import {
  findUser,
  findUsers,
  findGroup,
  getGroupMembershipForUser,
} from "./services";
import { UserAttributes } from "./entities/user";

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

interface FindUsersInput {
  searchCriteria: string;
  attributes?: Partial<UserAttributes[]>;
}

export class AdClient {
  private config: IClientConfig;
  private client?: ldap.Client;
  private logger?: Logger;

  constructor(config: IClientConfig) {
    this.config = config;
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
  public async findUser(username: string) {
    this.logger?.trace("findUser()");
    await this.connect();
    return findUser({
      client: this.client,
      base: this.config.baseDN,
      username,
    });
  }

  /**return array of users based on UPN */
  public async findUsers({ searchCriteria, attributes }: FindUsersInput) {
    this.logger?.trace("findUsers()");
    const query = `userPrincipalName=*${searchCriteria}`;
    await this.connect();
    return findUsers({
      client: this.client,
      base: this.config.baseDN,
      query,
      attributes,
    });
  }

  /** return first found group or fail */
  public async findGroup(groupName: string) {
    this.logger?.trace("findGroup()");
    await this.connect();
    return findGroup({
      client: this.client,
      base: this.config.baseDN,
      groupName,
    });
  }

  /** return array of groups */
  public async getGroupMembershipForUser(username: string) {
    this.logger?.trace("getGroupMembershipForUser()");
    await this.connect();
    return getGroupMembershipForUser({
      client: this.client,
      base: this.config.baseDN,
      username,
    });
  }
}
