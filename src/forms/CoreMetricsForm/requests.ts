import { message } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

import gql from 'graphql-tag';

export const GET_METRIC_BY_ID = gql`
  query($id: uuid!) {
    metrics(where: { id: { _eq: $id } }) {
      id
      country_id
      cns_budget
      cns_ytd
      gross_margin
      gross_margin_ratio
      a_and_p
      a_and_p_cns
      net_contribution
      cop
      percent_cognac
      volume
      head_count
      date
    }
  }
`;

export const ADD_METRICS = gql`
  mutation UpsertMetrics(
    $id: uuid
    $a_and_p: numeric!
    $a_and_p_cns: numeric!
    $cns_budget: numeric!
    $cns_ytd: numeric!
    $cop: numeric!
    $country_id: uuid!
    $date: timestamptz!
    $gross_margin: numeric!
    $gross_margin_ratio: numeric!
    $head_count: numeric!
    $net_contribution: numeric!
    $percent_cognac: numeric!
    $volume: numeric!
  ) {
    insert_metrics(
      objects: {
        id: $id
        a_and_p: $a_and_p
        a_and_p_cns: $a_and_p_cns
        cns_budget: $cns_budget
        cns_ytd: $cns_ytd
        cop: $cop
        country_id: $country_id
        date: $date
        gross_margin: $gross_margin
        gross_margin_ratio: $gross_margin_ratio
        head_count: $head_count
        net_contribution: $net_contribution
        percent_cognac: $percent_cognac
        volume: $volume
      }
      on_conflict: {
        constraint: metrics_pkey
        update_columns: [
          a_and_p
          a_and_p_cns
          cns_budget
          cns_ytd
          cop
          country_id
          date
          gross_margin
          gross_margin_ratio
          head_count
          net_contribution
          percent_cognac
          volume
        ]
      }
    ) {
      affected_rows
    }
  }
`;

export const onError = (e: Error): void => {
  message.error(e.message);
};

type Values = {
  first_name?: string;
  last_name?: string;
};

export const onSuccess = (
  history: RouteComponentProps['history']
) => (): void => {
  message.success('Core Metrics saved');
  history.goBack();
};
