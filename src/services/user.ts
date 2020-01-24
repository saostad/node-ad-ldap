import ldap from "ldapjs";
import { User } from "../entities/user";
import { FN } from "../typings/general-types";
import { defaultAttributes } from "../helpers/variables";
import {
  getUserQueryFilter,
  getCompoundFilter,
  isDistinguishedName,
} from "../helpers/utils";
import { search, getDistinguishedNames } from "./shared";

interface FindUserInput extends FN {
  username: string;
}

/** @returns first found item */
export async function findUser({
  username,
  client,
  base,
}: FindUserInput): Promise<User> {
  const options: ldap.SearchOptions = {
    filter: getUserQueryFilter(username),
    scope: "sub",
    attributes: defaultAttributes.user,
  };
  const data = await search({ client, base, options });
  if (data.length > 0) {
    return new User()._rawToObj(data[0].attributes);
  }
  throw new Error(`no user found for ${username}`);
}

interface FindUsersInput extends FN {
  query: string;
}
export async function findUsers({
  query,
  base,
  client,
}: FindUsersInput): Promise<User[]> {
  const defaultUserFilter =
    "(|(objectClass=user)(objectClass=person))(!(objectClass=computer))(!(objectClass=group))";

  const options = {
    filter: "(&" + defaultUserFilter + getCompoundFilter(query) + ")",
    scope: "sub",
    attributes: defaultAttributes.user,
  };

  const data = await search({ client, base, options });

  return data.map(el =>
    new User()._rawToObj(el.attributes.map(att => att.json)),
  );
}

interface GetUserDistinguishedNameFNInput extends FN {
  username: string;
}
export async function getUserDistinguishedName({
  username,
  client,
  base,
}: GetUserDistinguishedNameFNInput): Promise<string> {
  // Already a dn?
  if (isDistinguishedName(username)) {
    return username;
  }
  const query = getUserQueryFilter(username);

  return getDistinguishedNames({ filter: query, client, base });
}
