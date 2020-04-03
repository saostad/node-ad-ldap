import { Group, GroupAttributes } from "../entities/group";
import {
  getGroupQueryFilter,
  parseDistinguishedName,
  joinAttributes,
} from "../helpers/utils";
import { defaultAttributes } from "../helpers/variables";
import { SearchResultAttribute, FN } from "../typings/general-types";
import { search } from "./shared";
import { getUserDistinguishedName } from "./user";
import { SearchOptions } from "ldapjs";

interface FindGroupInput extends FN {
  groupName: string;
  base: string;
  attributes?: Partial<GroupAttributes[]>;
}
export async function findGroup({
  groupName,
  attributes,
  client,
  base,
}: FindGroupInput): Promise<Group> {
  const options: SearchOptions = {
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

interface GetGroupMembershipForDnFnInput extends FN {
  dn: string;
}
async function getGroupMembershipForDN({
  dn,
  client,
  base,
}: GetGroupMembershipForDnFnInput): Promise<SearchResultAttribute[][]> {
  const options: SearchOptions = {
    filter: "(member=" + parseDistinguishedName(dn) + ")",
    scope: "sub",
    attributes: joinAttributes(defaultAttributes.group, ["groupType"]),
  };

  const data = await search({ client, options, base });
  return data.map((el) => el.attributes.map((att) => att.json));
}

interface GetGroupMembershipForUserFnInput extends FN {
  username: string;
  attributes?: Partial<GroupAttributes[]>;
}
export async function getGroupMembershipForUser({
  username,
  client,
  base,
  attributes,
}: GetGroupMembershipForUserFnInput): Promise<Group[]> {
  const dn = await getUserDistinguishedName({ username, base, client });

  // TODO: add attributes param to return just selected attributes instead of default fields
  if (attributes) {
    console.warn(
      `attribute selection for this function doesn't implemented yet.`,
    );
  }

  const groups = await getGroupMembershipForDN({ dn, client, base });
  return groups.map((el) => new Group()._rawToObj(el));
}
