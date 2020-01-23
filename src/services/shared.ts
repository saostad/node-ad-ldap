import { SearchOptions, Control, SearchEntry } from "ldapjs";
import { FN } from "../typings/general-types";

interface SearchFNInput extends FN {
  options?: SearchOptions;
  controls?: Control | Control[];
}

export async function search({
  client,
  base,
  options,
  controls,
}: SearchFNInput): Promise<SearchEntry[]> {
  return new Promise((resolve, reject) => {
    client.search(base, options, controls, function searchCB(err, res) {
      if (err) {
        reject(err);
      }
      res.on("error", function errorHandler(err) {
        reject(err);
      });

      const data: SearchEntry[] = [];
      res.on("searchEntry", function searchEntry(entry) {
        data.push(entry);
      });

      res.on("end", function searchEnd(res) {
        if (res.status !== 0) {
          reject(res);
        }
        resolve(data);
      });
    });
  });
}

interface GetDistinguishedNames extends FN {
  filter: string;
}
export async function getDistinguishedNames({
  filter,
  client,
  base,
}: GetDistinguishedNames): Promise<string> {
  // return new Promise((resolve, reject) => {
  const options = {
    filter: filter,
    scope: "sub",
    attributes: ["dn"],
  };

  const data = await search({ client, options, base });
  return data[0].dn;
  // client.search(baseDN, opts, function(err, results) {
  //   if (err) {
  //     reject(err);
  //   }

  //   // Extract just the DN from the results
  //   const dns = [];
  //   results.on("searchEntry", entry => dns.push(entry.dn));
  //   results.on("end", () => resolve(dns[0]));
  // });
  // });
}
