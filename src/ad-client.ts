import ldap from "ldapjs";
import { findUser } from "./services";

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
  private client?: ldap.Client;

  constructor(config: IClientConfig) {
    this.config = config;
    this.client = ldap.createClient(this.config);
  }

  public bind = (): Promise<ldap.Client> => {
    return new Promise((resolve, reject) => {
      this.client.bind(this.config.bindDN, this.config.secret, err => {
        if (err) {
          reject(err);
        }

        resolve(this.client);
      });
    });
  };

  public freeUp = () => {
    this.client.unbind();
  };

  public async findUser(username: string) {
    if (!this.client) {
      await this.bind();
    }
    return findUser({
      client: this.client,
      base: this.config.baseDN,
      username,
    });
  }
}
