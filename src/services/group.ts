import { Group } from "../entities/group";
import {
  getGroupQueryFilter,
  parseDistinguishedName,
  joinAttributes,
} from "../helpers/utils";
import { defaultAttributes } from "../helpers/variables";
import { SearchResultAttribute, FN } from "../typings/general-types";
import { search } from "./shared";
import { getUserDistinguishedName } from "./user";

interface FindGroupInput extends FN {
  groupName: string;
  base: string;
  attributes?: string[];
}
export async function findGroup({
  groupName,
  attributes,
  client,
  base,
}: FindGroupInput): Promise<Group> {
  const options = {
    filter: getGroupQueryFilter(groupName),
    scope: "sub",
    attributes: attributes ?? defaultAttributes.group,
  };

  const data = await search({ client, base, options });
  if (data.length > 0) {
    return new Group()._rawToObj(data[0].attributes);
  }
  throw new Error(`Group ${groupName} not found`);
}

interface GetGroupMembershipForDNFNInput extends FN {
  dn: string;
}
async function getGroupMembershipForDN({
  dn,
  client,
  base,
}: GetGroupMembershipForDNFNInput): Promise<SearchResultAttribute[][]> {
  const options = {
    filter: "(member=" + parseDistinguishedName(dn) + ")",
    scope: "sub",
    attributes: joinAttributes(defaultAttributes.group, ["groupType"]),
  };

  const data = await search({ client, options, base });
  return data.map(el => el.attributes.map(att => att.json));
}

interface GetGroupMembershipForUserFNInput extends FN {
  username: string;
}
export async function getGroupMembershipForUser({
  username,
  client,
  base,
}: GetGroupMembershipForUserFNInput) {
  const dn = await getUserDistinguishedName({ username, base, client });

  const groups = await getGroupMembershipForDN({ dn, client, base });
  return groups.map(el => new Group()._rawToObj(el));
}
