import gql from 'graphql-tag';

export const GET_CORE_METRICS_BY_CONFIG = gql`
  query MetricsByConfig($config: metrics_bool_exp) {
    metrics_aggregate(where: $config) {
      aggregate {
        sum {
          a_and_p
          cns_budget
          cns_ytd
          cop
          volume
          head_count
        }
        avg {
          gross_margin
          gross_margin_ratio
          a_and_p_cns
          net_contribution
          percent_cognac
        }
      }
    }
  }
`;

type Config = {
  countries?: string[];
  date_range?: [string, string];
  markets?: string[];
};

export function buildFilter({ markets, countries, date_range }: Config): any {
  const c = countries && countries.length > 0;
  const m = markets && markets.length > 0;
  const d = date_range && date_range.length > 0;

  if (!c && !m && !d) return false;

  const [start, end] = date_range || [];

  const or = [];
  c && or.push({ country_id: { _in: countries } });
  m &&
    or.push({
      country: {
        country_markets: { market_id: { _in: markets } }
      }
    });

  return {
    ...(or.length > 0 && { _or: or }),
    ...(d && {
      date: {
        _gte: start,
        _lte: end
      }
    })
  };
}
