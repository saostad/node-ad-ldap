import ldap from "ldapjs";
import {
  findUser,
  findUsers,
  findGroup,
  getGroupMembershipForUser,
} from "./services";

/** copied code from @types/pino */
interface LogFn {
  (msg: string, ...args: any[]): void;
  (obj: object, msg?: string, ...args: any[]): void;
}

/** minimum requirement for logging */
interface Logger {
  info: LogFn;
  error: LogFn;
}

export interface IClientConfig extends ldap.ClientOptions {
  /**Password to connect to AD */
  secret: string;
  /**User to connect to AD */
  bindDN: string;
  /**Root of tree for search */
  baseDN?: string;
  /** Domain name with format: ldap://{domain.com} */
  url: string;
  /**instance for preferred logger */
  logger?: Logger;
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
    this.logger?.info("bind()");
    return new Promise((resolve, reject) => {
      this.client.bind(this.config.bindDN, this.config.secret, err => {
        if (err) {
          reject(err);
        }

        resolve(this.client);
      });
    });
  };

  public unbind = () => {
    this.logger?.info("unbind()");
    this.client.unbind();
  };

  private async connect() {
    this.logger?.info("connect()");
    if (this.client && this.client.connected) {
      return this.client;
    }
    const client = await this.bind();
    return client;
  }

  /**return first found user */
  public async findUser(username: string) {
    this.logger?.info("findUser()");
    await this.connect();
    return findUser({
      client: this.client,
      base: this.config.baseDN,
      username,
    });
  }

  /**return array of users based on UPN */
  public async findUsers(userPrincipalName: string) {
    this.logger?.info("findUsers()");
    const query = `userPrincipalName=*${userPrincipalName}`;
    await this.connect();
    return findUsers({
      client: this.client,
      base: this.config.baseDN,
      query,
    });
  }

  /** return first found group or fail */
  public async findGroup(groupName: string) {
    this.logger?.info("findGroup()");
    await this.connect();
    return findGroup({
      client: this.client,
      base: this.config.baseDN,
      groupName,
    });
  }

  /** return array of groups */
  public async getGroupMembershipForUser(username: string) {
    this.logger?.info("getGroupMembershipForUser()");
    await this.connect();
    return getGroupMembershipForUser({
      client: this.client,
      base: this.config.baseDN,
      username,
    });
  }
}
