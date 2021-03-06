export const defaultAttributes = {
  user: [
    "dn",
    "userPrincipalName",
    "sAMAccountName",
    /*'objectSID',*/ "mail",
    "lockoutTime",
    "whenCreated",
    "pwdLastSet",
    "userAccountControl",
    "employeeID",
    "sn",
    "givenName",
    "initials",
    "cn",
    "displayName",
    "comment",
    "description",
    "distinguishedName",
    "whenChanged",
    "name",
    "nTSecurityDescriptor",
    "objectCategory",
    "objectClass",
  ],
  group: ["cn", "description"],
};
