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
  telephoneNumber?: string;
}

export class Group implements GroupFields {
  adminDescription?: string;
  adminDisplayName?: string;
  ADsPath?: string;
  authOrig?: string;
  authOrigBL?: string;
  cn?: string;
  createTimeStamp?: string;
  delivContLength?: string;
  descritpion?: string;
  displayName?: string;
  displayNamePrintable?: string;
  distinguedName?: string;
  dLMemRejectPerms?: string;
  dLMemRejectPermsBL?: string;
  dLMemSubmitPerms?: string;
  dLMemSubmitPermsBL?: string;
  extensionAttribute?: string;
  groupType?: string;
  homeMTA?: string;
  info?: string;
  isDeleted?: string;
  legacyExchangeDN?: string;
  mail?: string;
  mailNickName?: string;
  managedBy?: string;
  member?: string;
  memberOf?: string;
  modifyTimeStamp?: string;
  msExchExpansionServerName?: string;
  msExchHideFromAddressLists?: string;
  msExchHomeServerName?: string;
  msExchRequireAuthToSendTo?: string;
  msSFU30GidNumber?: string;
  msSFU30Name?: string;
  msSFU30NisDomain?: string;
  msSFU30PosixMember?: string;
  name?: string;
  Name?: string;
  nTSecurityDescriptor?: string;
  objectCategory?: string;
  objectClass?: string;
  objectGUID?: string;
  objectSid?: string;
  oOFReplyToOriginator?: string;
  Parent?: string;
  primaryGroupToken?: string;
  proxyAddresses?: string;
  reportToOriginator?: string;
  reportToOwner?: string;
  sAMAccountName?: string;
  telephoneNumber?: string;
  textEncodedORAddress?: string;
  unauthOrig?: string;
  unauthOrigBL?: string;
  uSNChanged?: string;
  uSNCreated?: string;
  whenChanged?: string;
  whenCreated?: string;

  constructor(fields?: GroupFields) {
    if (fields) {
      for (const [key, value] of Object.entries(fields)) {
        this.[key] = value;
      }
    }
  }
}

