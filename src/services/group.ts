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
  options?: { attributes: string[] };
}
export async function findGroup({
  groupName,
  options,
  client,
  base,
}: FindGroupInput): Promise<Group> {
  const opts = {
    filter: getGroupQueryFilter(groupName),
    scope: "sub",
    attributes: options?.attributes
      ? options.attributes
      : defaultAttributes.group,
  };

  const data = await search({ client, base, options });
  return new Group().rawToObj(data[0].attributes);
  // client.search(baseDN, opts, function onSearch(err, results) {
  //   if (err) {
  //     reject(err);
  //   }

  //   if (!results) {
  //     reject(`Group ${groupName} not found`);
  //   }
  //   results.on("searchEntry", entry =>
  //     resolve(new Group().rawToObj(entry.attributes)),
  //   );
  //   results.on("error", err => reject(err));
  //   results.on("end", () => client.unbind());
  // });
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

  // client.search(baseDN, opts, function(err, results) {
  //   if (err) {
  //     reject(err);
  //     return;
  //   }

  //   const groups = [];
  //   results.on("searchEntry", entry =>
  //     groups.push(entry.attributes.map(el => el.json)),
  //   );
  //   results.on("end", () => {
  //     resolve(groups);
  //     client.unbind();
  //   });
  // });
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
  return groups;
}
