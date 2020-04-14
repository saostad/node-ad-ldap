# Active directory connection

LDAP Client to do low level promise base interaction with ldap server

- Promise based functions
- type-safe with [Typescript](https://www.typescriptlang.org/)

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

// do something with functionalities

// always free-Up after you done the job!
adClient.unbind();
```

## API DOC

for full API documentation look at [API Website](https://saostad.github.io/node-ad-ldap/classes/_index_.adclient.html)

## functionalities:

#### async queryAttributes()

```ts
/** get displayName of all users */
const users = await adClient.queryAttributes({
  options: {
    filter:
      "(&(|(objectClass=user)(objectClass=person))(!(objectClass=computer))(!(objectClass=group)))",
    attributes: ["displayName"],
    scope: "sub",
    paged: true,
  },
});

// always unbind after finish the operation to prevent memory leak
adClient.unbind();
```

### Advance Uses:

#### async query() (raw search to provided full flexibility)

```ts
/** get displayName and distinguished name  of empty groups */
const groups = await adClient.query({
  options: {
    filter: "(&(objectClass=group)(!(member=*)))",
    attributes: ["displayName", "dn"],
    scope: "sub",
    paged: true,
  },
});

// always unbind after finish the operation to prevent memory leak
adClient.unbind();
```

#### async bind() to access underlying api. returns a connected [ldap.js](http://ldapjs.org/) client.

#### NOTICE: lpad.js is using node EventEmitters not ES6 Promises

```ts
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

- [ ] remove dependency to [ldap.js](http://ldapjs.org/) package
- [ ] add Windows Integrated Authentication [Kerberos](https://github.com/mongodb-js/kerberos)
