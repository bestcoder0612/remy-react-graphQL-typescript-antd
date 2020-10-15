import gql from 'graphql-tag';

import { getDateRange } from 'utilities/filters';

export const GET_BRAND_EVENTS_BY_CONFIG = gql`
  query GetEventsByConfig($config: brand_bool_exp) {
    brand(where: $config) {
      id
      name
      logo
      events {
        id
        name
      }
    }
  }
`;

type Config = {
  brands?: string[];
  countries?: string[];
  markets?: string[];
  date_range?: [string, string];
};

type Result = {
  [key: string]: any;
};

export function buildFilter({
  brands,
  countries,
  markets,
  date_range
}: Config): Result | false {
  const b = brands && brands.length > 0;
  const c = countries && countries.length > 0;
  const d = date_range && date_range.length > 0;
  const m = markets && markets.length > 0;

  if (!c && !m && !d) return false;

  const or = [];
  c && or.push({ country_id: { _in: countries } });
  m &&
    or.push({
      country: {
        country_markets: { market_id: { _in: markets } }
      }
    });

  return {
    ...(b && {
      id: { _in: brands },
      ...(or.length > 0 && {
        brand_countries: {
          _or: or
        }
      })
    }),
    ...((or.length > 0 || d) && {
      events: {
        ...(or.length > 0 && { _or: or }),
        ...(d && getDateRange(date_range))
      }
    })
  };
}
