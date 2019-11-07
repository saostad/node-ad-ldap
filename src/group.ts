export enum GroupAttributes {
  adminDescription = "adminDescription",
  adminDisplayName = "adminDisplayName",
  ADsPath = "ADsPath",
  authOrig = "authOrig",
  authOrigBL = "authOrigBL",
  cn = "cn",
  createTimeStamp = "createTimeStamp",
  delivContLength = "delivContLength",
  descritpion = "descritpion",
  displayName = "displayName",
  displayNamePrintable = "displayNamePrintable",
  distinguedName = "distinguishedName",
  dLMemRejectPerms = "dLMemRejectPerms",
  dLMemRejectPermsBL = "dLMemRejectPermsBL",
  dLMemSubmitPerms = "dLMemSubmitPerms",
  dLMemSubmitPermsBL = "dLMemSubmitPermsBL",
  extensionAttribute = "extensionAttribute",
  groupType = "groupType",
  homeMTA = "homeMTA",
  info = "info",
  isDeleted = "isDeleted",
  legacyExchangeDN = "legacyExchangeDN",
  mail = "mail",
  mailNickName = "mailNickName",
  managedBy = "managedBy",
  member = "member",
  memberOf = "memberOf",
  modifyTimeStamp = "modifyTimeStamp",
  msExchExpansionServerName = "msExchExpansionServerName",
  msExchHideFromAddressLists = "msExchHideFromAddressLists",
  msExchHomeServerName = "msExchHomeServerName",
  msExchRequireAuthToSendTo = "msExchRequireAuthToSendTo",
  msSFU30GidNumber = "msSFU30GidNumber",
  msSFU30Name = "msSFU30Name",
  msSFU30NisDomain = "msSFU30NisDomain",
  msSFU30PosixMember = "msSFU30PosixMember",
  name = "name",
  Name = "Name",
  nTSecurityDescriptor = "nTSecurityDescriptor",
  objectCategory = "objectCategory",
  objectClass = "objectClass",
  objectGUID = "objectGUID",
  objectSid = "objectSid",
  oOFReplyToOriginator = "oOFReplyToOriginator",
  Parent = "Parent",
  primaryGroupToken = "primaryGroupToken",
  proxyAddresses = "proxyAddresses",
  reportToOriginator = "reportToOriginator",
  reportToOwner = "reportToOwner",
  sAMAccountName = "sAMAccountName",
  telephoneNumber = "telephoneNumber",
  textEncodedORAddress = "textEncodedORAddress",
  unauthOrig = "unauthOrig",
  unauthOrigBL = "unauthOrigBL",
  uSNChanged = "uSNChanged",
  uSNCreated = "uSNCreated",
  whenChanged = "whenChanged",
  whenCreated = "whenCreated",
}

type GroupFieldsName = {
  [key in keyof typeof GroupAttributes]?: any;
};

export interface GroupFields extends GroupFieldsName {
  telephoneNumber?: number;
}

export class Group implements GroupFields {
  constructor(fields?: GroupFields) {
    if (fields) {
      for (const i of fields) {
        // this.[name] = fields.name;
      }
    }
  }
}

const g1 = new Group();
