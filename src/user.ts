import { SearchResultAttribute } from "./client";
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
  readonly accountExpires: string;
  readonly adminDescription: string;
  readonly adminDisplayName: string;
  readonly ADsPath: string;
  readonly altRecipient: string;
  readonly altRecipientBL: string;
  readonly authOrig: string;
  readonly authOrigBL: string;
  readonly autoReplyMessage: string;
  readonly badPasswordTime: string;
  readonly badPwdCount: string;
  readonly c: string;
  readonly canonicalName: string;
  readonly Class: string;
  readonly co: string;
  readonly comment: string;
  readonly company: string;
  readonly countryCode: string;
  readonly createTimeStamp: string;
  readonly deletedItemFlags: string;
  readonly delivContLength: string;
  readonly deliverAndRedirect: string;
  readonly department: string;
  readonly departmentNumber: string;
  readonly description: string;
  readonly directReports: string;
  readonly displayName: string;
  readonly displayNamePrintable: string;
  readonly distinguishedName: string;
  readonly division: string;
  readonly dLMemRejectPerms: string;
  readonly dLMemRejectPermsBL: string;
  readonly dLMemSubmitPerms: string;
  readonly dLMemSubmitPermsBL: string;
  readonly employeeID: string;
  readonly employeeNumber: string;
  readonly employeeType: string;
  readonly extensionData: string;
  readonly extensionAttribute1: string;
  readonly facsimileTelephoneNumber: string;
  readonly garbageCollPeriod: string;
  readonly givenName: string;
  readonly homeDirectory: string;
  readonly homeDrive: string;
  readonly homeMDB: string;
  readonly homeMTA: string;
  readonly homePhone: string;
  readonly info: string;
  readonly initials: string;
  readonly ipPhone: string;
  readonly isDeleted: string;
  readonly isRecycled: string;
  /**Location */ readonly l: string;
  readonly lastKnownParent: string;
  readonly lastLogoff: string;
  readonly lastLogon: string;
  readonly lastLogonTimestamp: string;
  readonly legacyExchangeDN: string;
  readonly lockoutTime: string;
  readonly logonCount: string;
  readonly logonHours: string;
  readonly mail: string;
  readonly mailNickname: string;
  readonly manager: string;
  readonly mDBOverHardQuotaLimit: string;
  readonly mDBOverQuotaLimit: string;
  readonly mDBStorageQuota: string;
  readonly mDBUseDefaults: string;
  readonly memberOf: string;
  readonly mobile: string;
  readonly modifyTimeStamp: string;
  readonly "msCOM-UserPartitionSetLink": string;
  readonly "msDS-User-Account-Control-Computed": string;
  readonly "msDS-UserPassword": string;
  readonly ExpiryTimeComputed: string;
  readonly msExchHideFromAddressLists: string;
  readonly msExchHomeServerName: string;
  readonly msExchMailboxSecurityDescriptor: string;
  readonly msExchMasterAccountSID: string;
  readonly msExchOmaAdminWirelessEnable: string;
  readonly msExchPoliciesExcluded: string;
  readonly msExchRecipLimit: string;
  readonly msExchRequireAuthToSendTo: string;
  readonly msExchUserAccountControl: string;
  readonly msNPAllowDialin: string;
  readonly msNPCallingStationID: string;
  readonly msNPSavedCallingStationID: string;
  readonly msRADIUSCallbackNumber: string;
  readonly msRADIUSFramedIPAddress: string;
  readonly msRADIUSFramedRoute: string;
  readonly msRADIUSServiceType: string;
  readonly msRASSavedCallbackNumber: string;
  readonly msRASSavedFramedIPAddress: string;
  readonly msRASSavedFramedRoute: string;
  readonly msSFU30GidNumber: string;
  readonly msSFU30HomeDirectory: string;
  readonly msSFU30LoginShell: string;
  readonly msSFU30Name: string;
  readonly msSFU30NisDomain: string;
  readonly msSFU30Password: string;
  readonly msSFU30UidNumber: string;
  readonly name: string;
  readonly Name: string;
  readonly nTSecurityDescriptor: string;
  readonly objectCategory: string;
  readonly objectClass: string;
  readonly objectGUID: string;
  readonly objectSid: string;
  readonly otherFacsimileTelephoneNumber: string;
  readonly otherHomePhone: string;
  readonly otherIpPhone: string;
  readonly otherMobile: string;
  readonly otherPager: string;
  readonly otherTelephone: string;
  readonly pager: string;
  readonly Parent: string;
  readonly physicalDeliveryOfficeName: string;
  readonly postalCode: string;
  readonly postOfficeBox: string;
  readonly primaryGroupID: string;
  readonly profilePath: string;
  readonly protocolSettings: string;
  readonly proxyAddresses: string;
  readonly publicDelegates: string;
  readonly publicDelegatesBL: string;
  readonly pwdLastSet: string;
  readonly sAMAccountName: string;
  readonly scriptPath: string;
  readonly seeAlso: string;
  readonly securityProtocol: string;
  readonly sIDHistory: string;
  readonly sn: string;
  readonly st: string;
  readonly streetAddress: string;
  readonly submissionContLength: string;
  readonly telephoneNumber: string;
  readonly textEncodedORAddress: string;
  readonly title: string;
  readonly unauthOrig: string;
  readonly unauthOrigBL: string;
  readonly url: string;
  readonly userAccountControl: string;
  readonly userCertificate: string;
  readonly userParameters: string;
  readonly userPrincipalName: string;
  readonly userWorkstations: string;
  readonly uSNChanged: string;
  readonly uSNCreated: string;
  readonly whenChanged: string;
  readonly whenCreated: string;
  readonly wWWHomePage: string;

  setFields(fields: UserFields) {
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
