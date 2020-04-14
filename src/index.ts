import ldap, { SearchOptions, Control, SearchEntryObject } from "ldapjs";
import type { Logger } from "pino";
import {
  findUser,
  findUsers,
  findGroup,
  getGroupMembershipForUser,
} from "./services";
import { UserAttributes } from "./entities/user";
import { GroupAttributes } from "./entities/group";
import { search } from "./services/shared";

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
interface QueryFnInput {
  options?: SearchOptions;
  controls?: Control | Control[];
  base?: string;
}

/** @description this is a class to provide low level promise base interaction with ldap server */
export class AdClient {
  private config: IClientConfig;
  private client!: ldap.Client;
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

  /** @return a connected ldap client that is useful for use flexibility of [ldap.js](http://ldapjs.org/) directly. */
  public bind = async (): Promise<ldap.Client> => {
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

  /** @deprecated will be remove in next major version. this functionality will be added to another package soon
   * @description return first found user
   */
  public async findUser(username: string, options?: FindUsersInputOptions) {
    process.emitWarning(
      "deprecated",
      "findUser deprecated. this functionality will be added to another package soon",
    );
    this.logger?.trace("findUser()");
    await this.connect();
    return findUser({
      client: this.client,
      base: this.config.baseDN,
      username,
      attributes: options.attributes,
    });
  }

  /** @deprecated will be remove in next major version. this functionality will be added to another package soon
   * @description return array of users based on UPN
   */
  public async findUsers(
    searchCriteria: string,
    options?: FindUsersInputOptions,
  ) {
    process.emitWarning(
      "deprecated",
      "findUsers deprecated. this functionality will be added to another package soon",
    );
    this.logger?.trace("findUsers()");
    const query = `userPrincipalName=*${searchCriteria}`;
    await this.connect();
    return findUsers({
      client: this.client,
      base: this.config.baseDN,
      query,
      attributes: options?.attributes,
    });
  }

  /** @deprecated will be remove in next major version. this functionality will be added to another package soon
   * @description return first found group or fail
   */
  public async findGroup(groupName: string, options?: FindGroupsInputOptions) {
    process.emitWarning(
      "deprecated",
      "findGroup deprecated. this functionality will be added to another package soon",
    );
    this.logger?.trace("findGroup()");
    await this.connect();
    return findGroup({
      client: this.client,
      base: this.config.baseDN,
      groupName,
      attributes: options?.attributes,
    });
  }

  /** @deprecated will be remove in next major version. this functionality will be added to another package soon
   * @description return array of groups
   */
  public async getGroupMembershipForUser(
    username: string,
    options?: FindGroupsInputOptions,
  ) {
    process.emitWarning("deprecated", "getGroupMembershipForUser deprecated");
    this.logger?.trace("getGroupMembershipForUser()");
    await this.connect();
    return getGroupMembershipForUser({
      client: this.client,
      base: this.config.baseDN,
      username,
      attributes: options?.attributes,
    });
  }

  /** @description raw search to provided full flexibility */
  public async query({ options, controls, base }: QueryFnInput) {
    this.logger?.trace("query()");
    await this.connect();

    return search({
      client: this.client,
      base: base ?? this.config.baseDN,
      options,
      controls,
    });
  }

  /** @description raw search returns just attributes */
  public async queryAttributes({
    options,
    controls,
    base,
  }: QueryFnInput): Promise<SearchEntryObject[]> {
    this.logger?.trace("queryAttributes()");
    await this.connect();

    const data = await search({
      client: this.client,
      base: base ?? this.config.baseDN,
      options,
      controls,
    });

    return data.map((entry) => entry.object);
  }
}
