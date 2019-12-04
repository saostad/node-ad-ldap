# Active directory connection

Connection to Microsoft Active Directory using [LDAPjs](https://www.npmjs.com/package/ldapjs)

- type-safe with [Typescript](https://www.typescriptlang.org/)
- high-level functions to query from MS AD easily

inspired by package [activedirectory](https://www.npmjs.com/package/activedirectory)

## How to use it:

- `npm i node-ad-ldap`

```
import { IClientConfig, AdClient } from "node-ad-ldap";

const config: IClientConfig = {
  url: "ldap://Domain.com" /** Domain name here */,
  bindDN: "" /** user name to connect to AD server */,
  secret: "" /** password for account */,
  baseDN: "" /** root of tree that want to query */,
};
const adClient = new AdClient(config);
const items = await adClient.getGroupMembershipForUser("USER_NAME");
items.map(el => console.log(el.cn));
```

## Available functions:

- bind
- findUser
- findUsers
- findGroup
- getGroupMembershipForUser

## TODO

- add extra functionalities
