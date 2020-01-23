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

// always freeUp after you done the job!
adClient.freeUp();
```

## functionalities:

### findUser(username)

### findUsers(query)

### findGroup(groupName, options)

### getGroupMembershipForUser(username)

### bind()

returns a connected ldap client that is useful for use flexibility of [ldap.js](http://ldapjs.org/) directly

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

- add extra functionalities

## Credits

### inspired by package [activedirectory](https://www.npmjs.com/package/activedirectory)
