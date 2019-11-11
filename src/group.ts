import { SearchResultAttribute } from "./client";
import ldap from "ldapjs";

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
  telephoneNumber?: string[];
}

export class Group implements GroupFields {
  readonly adminDescription?: string[];
  readonly adminDisplayName?: string[];
  readonly ADsPath?: string[];
  readonly authOrig?: string[];
  readonly authOrigBL?: string[];
  readonly cn?: string[];
  readonly createTimeStamp?: string[];
  readonly delivContLength?: string[];
  readonly descritpion?: string[];
  readonly displayName?: string[];
  readonly displayNamePrintable?: string[];
  readonly distinguedName?: string[];
  readonly dLMemRejectPerms?: string[];
  readonly dLMemRejectPermsBL?: string[];
  readonly dLMemSubmitPerms?: string[];
  readonly dLMemSubmitPermsBL?: string[];
  readonly extensionAttribute?: string[];
  readonly groupType?: string[];
  readonly homeMTA?: string[];
  readonly info?: string[];
  readonly isDeleted?: string[];
  readonly legacyExchangeDN?: string[];
  readonly mail?: string[];
  readonly mailNickName?: string[];
  readonly managedBy?: string[];
  readonly member?: string[];
  readonly memberOf?: string[];
  readonly modifyTimeStamp?: string[];
  readonly msExchExpansionServerName?: string[];
  readonly msExchHideFromAddressLists?: string[];
  readonly msExchHomeServerName?: string[];
  readonly msExchRequireAuthToSendTo?: string[];
  readonly msSFU30GidNumber?: string[];
  readonly msSFU30Name?: string[];
  readonly msSFU30NisDomain?: string[];
  readonly msSFU30PosixMember?: string[];
  readonly name?: string[];
  readonly Name?: string[];
  readonly nTSecurityDescriptor?: string[];
  readonly objectCategory?: string[];
  readonly objectClass?: string[];
  readonly objectGUID?: string[];
  readonly objectSid?: string[];
  readonly oOFReplyToOriginator?: string[];
  readonly Parent?: string[];
  readonly primaryGroupToken?: string[];
  readonly proxyAddresses?: string[];
  readonly reportToOriginator?: string[];
  readonly reportToOwner?: string[];
  readonly sAMAccountName?: string[];
  readonly telephoneNumber?: string[];
  readonly textEncodedORAddress?: string[];
  readonly unauthOrig?: string[];
  readonly unauthOrigBL?: string[];
  readonly uSNChanged?: string[];
  readonly uSNCreated?: string[];
  readonly whenChanged?: string[];
  readonly whenCreated?: string[];

  setFields(fields: GroupFields) {
    for (const [key, value] of Object.entries(fields)) {
      this[key] = value;
    }
    return this;
  }

  rawToObj(
    data: SearchResultAttribute | SearchResultAttribute[] | ldap.Attribute[],
  ) {
    if (Array.isArray(data)) {
      data.forEach(el => {
        const fields: GroupFields = {};
        fields[el.type] = el.vals;
        this.setFields(fields);
      });
    } else {
      const fields: GroupFields = {};
      fields[data.type] = data.vals;
      this.setFields(fields);
    }
    return this;
  }
}
