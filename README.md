# Active directory connection

Connection to Microsoft Active Directory using [LDAPjs](https://www.npmjs.com/package/ldapjs)

- Promise based functions
- type-safe with [Typescript](https://www.typescriptlang.org/)
- high-level functions to query from MS AD easily

## How to use it:

- `npm i node-ad-ldap`

```ts
import { IClientConfig, AdClient } from "node-ad-ldap";

const config: IClientConfig = {
  url: "ldap://Domain.com" /** Domain name here */,
  bindDN: "{USER_NAME}" /** user name to connect to AD server */,
  secret: "{PASSWORD}" /** password for account */,
  baseDN: "{ROOT_OF_TREE}" /** root of tree that want to query */,
};

const adClient = new AdClient(config);

const items = await adClient.findUser("USER_NAME");

// always free-Up after you done the job!
adClient.unbind();
```

## API DOC

for full API documentation look at [API Website](https://saostad.github.io/node-ad-ldap/classes/_index_.adclient.html)

## functionalities:

### findUser(username)

```ts
/** return first found user or fail */
const user = await adClient.findUser("USER_NAME");
```

### findUsers(query)

```ts
/** return array of users based on UPN */
const users = await adClient.findUsers("DOMAIN.COM");
```

### findGroup(groupName, options)

```ts
/**return group or fail */
const group = await adClient.findGroup("GROUP_NAME");
```

### getGroupMembershipForUser(username)

```ts
/**return array of groups */
const groups = await adClient.getGroupMembershipForUser("USER_NAME");
```

### bind()

returns a connected ldap client that is useful for use flexibility of [ldap.js](http://ldapjs.org/) directly.
NOTICE: lpad.js is using node EventEmitters not ES6 Promises

### Advance Users:

```js
adClient.bind().then((client) => {
  client.search(this.config.baseDN, opts, (err, res) => {
    if (err) {
      reject(err);
    }
    res.on("searchEntry", (entry) => {});
    res.on("error", (err) => {});
    res.on("end", function (result) {
      client.unbind();
    });
  });
});
```

## TODO

- [ ] make baseDN optional
- [ ] get list of members of a group
- [ ] add options to have better flexibility on filters and controls
- [x] specify return attributes
- [ ] add Windows Integrated Authentication [Kerberos](https://github.com/mongodb-js/kerberos)

## Credits

### inspired by package [activedirectory](https://www.npmjs.com/package/activedirectory)
