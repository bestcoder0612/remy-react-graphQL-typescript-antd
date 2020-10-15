import gql from 'graphql-tag';

export const GET_BRANDS_BY_IDS = gql`
  query GetBrandsByIds($config: brand_bool_exp) {
    brand(where: $config) {
      id
      logo
      name
    }
  }
`;

type Config = {
  brands?: string[];
  countries?: string[];
  markets?: string[];
};

type Result = {
  [key: string]: any;
};

export function buildFilter({
  brands,
  countries,
  markets
}: Config): Result | false {
  const b = brands && brands.length > 0;
  const c = countries && countries.length > 0;
  const m = markets && markets.length > 0;

  if (!b && !c && !m) return false;

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
      id: { _in: brands }
    }),
    ...(or.length > 0 && {
      brand_countries: {
        _or: or
      }
    })
  };
}
