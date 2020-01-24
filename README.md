# Active directory connection

Connection to Microsoft Active Directory using [LDAPjs](https://www.npmjs.com/package/ldapjs)

- Promise based functions
- type-safe with [Typescript](https://www.typescriptlang.org/)
- high-level functions to query from MS AD easily

## How to use it:

- `npm i node-ad-ldap`

```js
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

## functionalities:

### findUser(username)

```js
/** return first found user or fail */
const user = await adClient.findUser("USER_NAME");
```

### findUsers(query)

```js
/** return array of users based on UPN */
const users = await adClient.findUsers("DOMAIN.COM");
```

### findGroup(groupName, options)

```js
/**return group or fail */
const group = await adClient.findGroup("GROUP_NAME");
```

### getGroupMembershipForUser(username)

```js
/**return array of groups */
const groups = await adClient.getGroupMembershipForUser("USER_NAME");
```

### bind()

returns a connected ldap client that is useful for use flexibility of [ldap.js](http://ldapjs.org/) directly.
NOTICE: lpad.js is using node EventEmitters not ES6 Promises

```js
adClient.bind().then(client => {
  client.search(this.config.baseDN, opts, (err, res) => {
    if (err) {
      reject(err);
    }
    res.on("searchEntry", entry => {});
    res.on("error", err => {});
    res.on("end", function(result) {
      client.unbind();
    });
  });
});
```

## TODO

- [ ] make baseDN optional
- [ ] add where param to queries to be able of search base on fields
- [ ] get list of members of a group
- [ ] add options to have better flexibility on filters and controls and return attributes

## Credits

### inspired by package [activedirectory](https://www.npmjs.com/package/activedirectory)
