import { SearchResultAttribute } from "./typings/general-types";
import ldap from "ldapjs";

enum UserAttributes {
  accountExpires = "accountExpires",
  adminDescription = "adminDescription",
  adminDisplayName = "adminDisplayName",
  ADsPath = "ADsPath",
  altRecipient = "altRecipient",
  altRecipientBL = "altRecipientBL",
  authOrig = "authOrig",
  authOrigBL = "authOrigBL",
  autoReplyMessage = "autoReplyMessage",
  badPasswordTime = "badPasswordTime",
  badPwdCount = "badPwdCount",
  c = "c" /**(Country) */,
  canonicalName = "canonicalName",
  Class = "Class",
  cn = "cn",
  co = "co" /**(Country) */,
  comment = "comment",
  company = "company",
  countryCode = "countryCode",
  createTimeStamp = "createTimeStamp",
  deletedItemFlags = "deletedItemFlags",
  delivContLength = "delivContLength",
  deliverAndRedirect = "deliverAndRedirect",
  department = "department",
  departmentNumber = "departmentNumber",
  description = "description",
  directReports = "directReports",
  displayName = "displayName",
  displayNamePrintable = "displayNamePrintable",
  distinguishedName = "distinguishedName",
  division = "division",
  dLMemRejectPerms = "dLMemRejectPerms",
  dLMemRejectPermsBL = "dLMemRejectPermsBL",
  dLMemSubmitPerms = "dLMemSubmitPerms",
  dLMemSubmitPermsBL = "dLMemSubmitPermsBL",
  employeeID = "employeeID",
  employeeNumber = "employeeNumber",
  employeeType = "employeeType",
  extensionData = "extensionData",
  extensionAttribute1 = "extensionAttribute1" /**1 - 15 */,
  facsimileTelephoneNumber = "facsimileTelephoneNumber",
  garbageCollPeriod = "garbageCollPeriod",
  givenName = "givenName",
  homeDirectory = "homeDirectory",
  homeDrive = "homeDrive",
  homeMDB = "homeMDB",
  homeMTA = "homeMTA",
  homePhone = "homePhone",
  info = "info",
  initials = "initials",
  ipPhone = "ipPhone",
  isDeleted = "isDeleted",
  isRecycled = "isRecycled",
  l = "l" /**(Location) */,
  lastKnownParent = "lastKnownParent",
  lastLogoff = "lastLogoff",
  lastLogon = "lastLogon",
  lastLogonTimestamp = "lastLogonTimestamp",
  legacyExchangeDN = "legacyExchangeDN",
  lockoutTime = "lockoutTime",
  logonCount = "logonCount",
  logonHours = "logonHours",
  mail = "mail",
  mailNickname = "mailNickname",
  manager = "manager",
  mDBOverHardQuotaLimit = "mDBOverHardQuotaLimit",
  mDBOverQuotaLimit = "mDBOverQuotaLimit",
  mDBStorageQuota = "mDBStorageQuota",
  mDBUseDefaults = "mDBUseDefaults",
  memberOf = "memberOf",
  mobile = "mobile",
  modifyTimeStamp = "modifyTimeStamp",
  "msCOM-UserPartitionSetLink" = "msCOM-UserPartitionSetLink",
  "msDS-User-Account-Control-Computed" = "msDS-User-Account-Control-Computed",
  "msDS-UserPassword" = "msDS-UserPassword",
  ExpiryTimeComputed = "ExpiryTimeComputed",
  msExchHideFromAddressLists = "msExchHideFromAddressLists",
  msExchHomeServerName = "msExchHomeServerName",
  msExchMailboxSecurityDescriptor = "msExchMailboxSecurityDescriptor",
  msExchMasterAccountSID = "msExchMasterAccountSID",
  msExchOmaAdminWirelessEnable = "msExchOmaAdminWirelessEnable",
  msExchPoliciesExcluded = "msExchPoliciesExcluded",
  msExchRecipLimit = "msExchRecipLimit",
  msExchRequireAuthToSendTo = "msExchRequireAuthToSendTo",
  msExchUserAccountControl = "msExchUserAccountControl",
  msNPAllowDialin = "msNPAllowDialin",
  msNPCallingStationID = "msNPCallingStationID",
  msNPSavedCallingStationID = "msNPSavedCallingStationID",
  msRADIUSCallbackNumber = "msRADIUSCallbackNumber",
  msRADIUSFramedIPAddress = "msRADIUSFramedIPAddress",
  msRADIUSFramedRoute = "msRADIUSFramedRoute",
  msRADIUSServiceType = "msRADIUSServiceType",
  msRASSavedCallbackNumber = "msRASSavedCallbackNumber",
  msRASSavedFramedIPAddress = "msRASSavedFramedIPAddress",
  msRASSavedFramedRoute = "msRASSavedFramedRoute",
  msSFU30GidNumber = "msSFU30GidNumber",
  msSFU30HomeDirectory = "msSFU30HomeDirectory",
  msSFU30LoginShell = "msSFU30LoginShell",
  msSFU30Name = "msSFU30Name",
  msSFU30NisDomain = "msSFU30NisDomain",
  msSFU30Password = "msSFU30Password",
  msSFU30UidNumber = "msSFU30UidNumber",
  name = "name",
  Name = "Name" /** (ADSI Property) */,
  nTSecurityDescriptor = "nTSecurityDescriptor",
  objectCategory = "objectCategory",
  objectClass = "objectClass",
  objectGUID = "objectGUID",
  objectSid = "objectSid",
  otherFacsimileTelephoneNumber = "otherFacsimileTelephoneNumber",
  otherHomePhone = "otherHomePhone",
  otherIpPhone = "otherIpPhone",
  otherMobile = "otherMobile",
  otherPager = "otherPager",
  otherTelephone = "otherTelephone",
  pager = "pager",
  Parent = "Parent",
  physicalDeliveryOfficeName = "physicalDeliveryOfficeName",
  postalCode = "postalCode",
  postOfficeBox = "postOfficeBox",
  primaryGroupID = "primaryGroupID",
  profilePath = "profilePath",
  protocolSettings = "protocolSettings",
  proxyAddresses = "proxyAddresses",
  publicDelegates = "publicDelegates",
  publicDelegatesBL = "publicDelegatesBL",
  pwdLastSet = "pwdLastSet",
  sAMAccountName = "sAMAccountName",
  scriptPath = "scriptPath",
  seeAlso = "seeAlso",
  securityProtocol = "securityProtocol",
  sIDHistory = "sIDHistory",
  sn = "sn" /** (Surname) */,
  st = "st" /** (State) */,
  streetAddress = "streetAddress",
  submissionContLength = "submissionContLength",
  telephoneNumber = "telephoneNumber",
  textEncodedORAddress = "textEncodedORAddress",
  title = "title",
  unauthOrig = "unauthOrig",
  unauthOrigBL = "unauthOrigBL",
  url = "url",
  userAccountControl = "userAccountControl",
  userCertificate = "userCertificate",
  userParameters = "userParameters",
  userPrincipalName = "userPrincipalName",
  userWorkstations = "userWorkstations",
  uSNChanged = "uSNChanged",
  uSNCreated = "uSNCreated",
  whenChanged = "whenChanged",
  whenCreated = "whenCreated",
  wWWHomePage = "wWWHomePage",
}

type GroupFieldsName = {
  [key in keyof typeof UserAttributes]?: any;
};

export interface UserFields extends GroupFieldsName {
  wWWHomePage?: boolean;
}

export class User {
  readonly accountExpires: string[] | string;
  readonly adminDescription: string[] | string;
  readonly adminDisplayName: string[] | string;
  readonly ADsPath: string[] | string;
  readonly altRecipient: string[] | string;
  readonly altRecipientBL: string[] | string;
  readonly authOrig: string[] | string;
  readonly authOrigBL: string[] | string;
  readonly autoReplyMessage: string[] | string;
  readonly badPasswordTime: string[] | string;
  readonly badPwdCount: string[] | string;
  readonly c: string[] | string;
  readonly canonicalName: string[] | string;
  readonly Class: string[] | string;
  readonly co: string[] | string;
  readonly comment: string[] | string;
  readonly cn: string[] | string;
  readonly company: string[] | string;
  readonly countryCode: string[] | string;
  readonly createTimeStamp: string[] | string;
  readonly deletedItemFlags: string[] | string;
  readonly delivContLength: string[] | string;
  readonly deliverAndRedirect: string[] | string;
  readonly department: string[] | string;
  readonly departmentNumber: string[] | string;
  readonly description: string[] | string;
  readonly directReports: string[] | string;
  readonly displayName: string[] | string;
  readonly displayNamePrintable: string[] | string;
  readonly distinguishedName: string[] | string;
  readonly division: string[] | string;
  readonly dLMemRejectPerms: string[] | string;
  readonly dLMemRejectPermsBL: string[] | string;
  readonly dLMemSubmitPerms: string[] | string;
  readonly dLMemSubmitPermsBL: string[] | string;
  readonly employeeID: string[] | string;
  readonly employeeNumber: string[] | string;
  readonly employeeType: string[] | string;
  readonly extensionData: string[] | string;
  readonly extensionAttribute1: string[] | string;
  readonly facsimileTelephoneNumber: string[] | string;
  readonly garbageCollPeriod: string[] | string;
  readonly givenName: string[] | string;
  readonly homeDirectory: string[] | string;
  readonly homeDrive: string[] | string;
  readonly homeMDB: string[] | string;
  readonly homeMTA: string[] | string;
  readonly homePhone: string[] | string;
  readonly info: string[] | string;
  readonly initials: string[] | string;
  readonly ipPhone: string[] | string;
  readonly isDeleted: string[] | string;
  readonly isRecycled: string[] | string;
  /**Location */ readonly l: string[] | string;
  readonly lastKnownParent: string[] | string;
  readonly lastLogoff: string[] | string;
  readonly lastLogon: string[] | string;
  readonly lastLogonTimestamp: string[] | string;
  readonly legacyExchangeDN: string[] | string;
  readonly lockoutTime: string[] | string;
  readonly logonCount: string[] | string;
  readonly logonHours: string[] | string;
  readonly mail: string[] | string;
  readonly mailNickname: string[] | string;
  readonly manager: string[] | string;
  readonly mDBOverHardQuotaLimit: string[] | string;
  readonly mDBOverQuotaLimit: string[] | string;
  readonly mDBStorageQuota: string[] | string;
  readonly mDBUseDefaults: string[] | string;
  readonly memberOf: string[] | string;
  readonly mobile: string[] | string;
  readonly modifyTimeStamp: string[] | string;
  readonly "msCOM-UserPartitionSetLink": string[] | string;
  readonly "msDS-User-Account-Control-Computed": string[] | string;
  readonly "msDS-UserPassword": string[] | string;
  readonly ExpiryTimeComputed: string[] | string;
  readonly msExchHideFromAddressLists: string[] | string;
  readonly msExchHomeServerName: string[] | string;
  readonly msExchMailboxSecurityDescriptor: string[] | string;
  readonly msExchMasterAccountSID: string[] | string;
  readonly msExchOmaAdminWirelessEnable: string[] | string;
  readonly msExchPoliciesExcluded: string[] | string;
  readonly msExchRecipLimit: string[] | string;
  readonly msExchRequireAuthToSendTo: string[] | string;
  readonly msExchUserAccountControl: string[] | string;
  readonly msNPAllowDialin: string[] | string;
  readonly msNPCallingStationID: string[] | string;
  readonly msNPSavedCallingStationID: string[] | string;
  readonly msRADIUSCallbackNumber: string[] | string;
  readonly msRADIUSFramedIPAddress: string[] | string;
  readonly msRADIUSFramedRoute: string[] | string;
  readonly msRADIUSServiceType: string[] | string;
  readonly msRASSavedCallbackNumber: string[] | string;
  readonly msRASSavedFramedIPAddress: string[] | string;
  readonly msRASSavedFramedRoute: string[] | string;
  readonly msSFU30GidNumber: string[] | string;
  readonly msSFU30HomeDirectory: string[] | string;
  readonly msSFU30LoginShell: string[] | string;
  readonly msSFU30Name: string[] | string;
  readonly msSFU30NisDomain: string[] | string;
  readonly msSFU30Password: string[] | string;
  readonly msSFU30UidNumber: string[] | string;
  readonly name: string[] | string;
  readonly Name: string[] | string;
  readonly nTSecurityDescriptor: string[] | string;
  readonly objectCategory: string[] | string;
  readonly objectClass: string[] | string;
  readonly objectGUID: string[] | string;
  readonly objectSid: string[] | string;
  readonly otherFacsimileTelephoneNumber: string[] | string;
  readonly otherHomePhone: string[] | string;
  readonly otherIpPhone: string[] | string;
  readonly otherMobile: string[] | string;
  readonly otherPager: string[] | string;
  readonly otherTelephone: string[] | string;
  readonly pager: string[] | string;
  readonly Parent: string[] | string;
  readonly physicalDeliveryOfficeName: string[] | string;
  readonly postalCode: string[] | string;
  readonly postOfficeBox: string[] | string;
  readonly primaryGroupID: string[] | string;
  readonly profilePath: string[] | string;
  readonly protocolSettings: string[] | string;
  readonly proxyAddresses: string[] | string;
  readonly publicDelegates: string[] | string;
  readonly publicDelegatesBL: string[] | string;
  readonly pwdLastSet: string[] | string;
  readonly sAMAccountName: string[] | string;
  readonly scriptPath: string[] | string;
  readonly seeAlso: string[] | string;
  readonly securityProtocol: string[] | string;
  readonly sIDHistory: string[] | string;
  readonly sn: string[] | string;
  readonly st: string[] | string;
  readonly streetAddress: string[] | string;
  readonly submissionContLength: string[] | string;
  readonly telephoneNumber: string[] | string;
  readonly textEncodedORAddress: string[] | string;
  readonly title: string[] | string;
  readonly unauthOrig: string[] | string;
  readonly unauthOrigBL: string[] | string;
  readonly url: string[] | string;
  readonly userAccountControl: string[] | string;
  readonly userCertificate: string[] | string;
  readonly userParameters: string[] | string;
  readonly userPrincipalName: string[] | string;
  readonly userWorkstations: string[] | string;
  readonly uSNChanged: string[] | string;
  readonly uSNCreated: string[] | string;
  readonly whenChanged: string[] | string;
  readonly whenCreated: string[] | string;
  readonly wWWHomePage: string[] | string;

  setFields(fields: UserFields) {
    for (const [key, value] of Object.entries(fields)) {
      if (Array.isArray(value) && value.length > 1) {
        this[key] = value as string[];
      } else {
        this[key] = value[0] as string;
      }
    }
    return this;
  }

  rawToObj(
    data: SearchResultAttribute | SearchResultAttribute[] | ldap.Attribute[],
  ) {
    if (Array.isArray(data)) {
      data.forEach(el => {
        const fields: UserFields = {};
        fields[el.type] = el.vals;
        this.setFields(fields);
      });
    } else {
      const fields: UserFields = {};
      fields[data.type] = data.vals;
      this.setFields(fields);
    }
    return this;
  }
}
