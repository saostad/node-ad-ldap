import ldap from "ldapjs";
import { SearchResultAttribute } from "../typings/general-types";

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
  telephoneNumber?: string[] | string;
}

export class Group implements GroupFields {
  readonly adminDescription?: string[] | string;
  readonly adminDisplayName?: string[] | string;
  readonly ADsPath?: string[] | string;
  readonly authOrig?: string[] | string;
  readonly authOrigBL?: string[] | string;
  readonly cn?: string[] | string;
  readonly createTimeStamp?: string[] | string;
  readonly delivContLength?: string[] | string;
  readonly descritpion?: string[] | string;
  readonly displayName?: string[] | string;
  readonly displayNamePrintable?: string[] | string;
  readonly distinguedName?: string[] | string;
  readonly dLMemRejectPerms?: string[] | string;
  readonly dLMemRejectPermsBL?: string[] | string;
  readonly dLMemSubmitPerms?: string[] | string;
  readonly dLMemSubmitPermsBL?: string[] | string;
  readonly extensionAttribute?: string[] | string;
  readonly groupType?: string[] | string;
  readonly homeMTA?: string[] | string;
  readonly info?: string[] | string;
  readonly isDeleted?: string[] | string;
  readonly legacyExchangeDN?: string[] | string;
  readonly mail?: string[] | string;
  readonly mailNickName?: string[] | string;
  readonly managedBy?: string[] | string;
  readonly member?: string[] | string;
  readonly memberOf?: string[] | string;
  readonly modifyTimeStamp?: string[] | string;
  readonly msExchExpansionServerName?: string[] | string;
  readonly msExchHideFromAddressLists?: string[] | string;
  readonly msExchHomeServerName?: string[] | string;
  readonly msExchRequireAuthToSendTo?: string[] | string;
  readonly msSFU30GidNumber?: string[] | string;
  readonly msSFU30Name?: string[] | string;
  readonly msSFU30NisDomain?: string[] | string;
  readonly msSFU30PosixMember?: string[] | string;
  readonly name?: string[] | string;
  readonly Name?: string[] | string;
  readonly nTSecurityDescriptor?: string[] | string;
  readonly objectCategory?: string[] | string;
  readonly objectClass?: string[] | string;
  readonly objectGUID?: string[] | string;
  readonly objectSid?: string[] | string;
  readonly oOFReplyToOriginator?: string[] | string;
  readonly Parent?: string[] | string;
  readonly primaryGroupToken?: string[] | string;
  readonly proxyAddresses?: string[] | string;
  readonly reportToOriginator?: string[] | string;
  readonly reportToOwner?: string[] | string;
  readonly sAMAccountName?: string[] | string;
  readonly telephoneNumber?: string[] | string;
  readonly textEncodedORAddress?: string[] | string;
  readonly unauthOrig?: string[] | string;
  readonly unauthOrigBL?: string[] | string;
  readonly uSNChanged?: string[] | string;
  readonly uSNCreated?: string[] | string;
  readonly whenChanged?: string[] | string;
  readonly whenCreated?: string[] | string;

  _setFields(fields: GroupFields) {
    for (const [key, value] of Object.entries(fields)) {
      if (Array.isArray(value) && value.length > 1) {
        this[key] = value as string[];
      } else {
        this[key] = value[0] as string;
      }
    }
    return this;
  }

  _rawToObj(
    data: SearchResultAttribute | SearchResultAttribute[] | ldap.Attribute[],
  ) {
    if (Array.isArray(data)) {
      data.forEach(el => {
        const fields: GroupFields = {};
        fields[el.type] = el.vals;
        this._setFields(fields);
      });
    } else {
      const fields: GroupFields = {};
      fields[data.type] = data.vals;
      this._setFields(fields);
    }
    return this;
  }
}
