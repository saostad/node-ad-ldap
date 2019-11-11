# Active directory connection

Connection to Microsoft Active Directory using [LDAPjs](https://www.npmjs.com/package/ldapjs)

- type-safe with [Typescript](https://www.typescriptlang.org/)
- high-level functions to query from MS AD easily

inspired by package [activedirectory](https://www.npmjs.com/package/activedirectory)

## How to use it:

```
import { IClientConfig, AdClient } from "./client";

const config: IClientConfig = {
  url: "ldap://ki.local",
  bindDN,
  secret,
  baseDN,
};
const adClient = new AdClient(config);
const items = await adClient.getGroupMembershipForUser("sostad");
items.map(el => console.log(`File: app.ts,`, `Line: 20 => `, el.cn));
```

## Available functions:

- bind
- findUser
- findUsers
- findGroup
- getGroupMembershipForUser

## TODO

- add extra functionalities
