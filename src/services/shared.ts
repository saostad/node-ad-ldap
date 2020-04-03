import { SearchOptions, Control, SearchEntry } from "ldapjs";
import { FN } from "../typings/general-types";

export interface SearchFnInput extends FN {
  options?: SearchOptions;
  controls?: Control | Control[];
}

export async function search({
  client,
  base,
  options,
  controls,
}: SearchFnInput): Promise<SearchEntry[]> {
  /** default time limit for query 10 min
   * if not provided it in options, will use default
   */
  options.timeLimit = options.timeLimit ?? 6000;
  return new Promise((resolve, reject) => {
    if (controls) {
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
    } else {
      client.search(base, options, function searchCB(err, res) {
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
    }
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
  const options: SearchOptions = {
    filter: filter,
    scope: "sub",
    attributes: ["dn"],
  };

  const data = await search({ client, options, base });
  return data[0].dn;
}
