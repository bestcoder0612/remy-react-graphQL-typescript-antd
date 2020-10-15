import * as Yup from 'yup';

export default Yup.object().shape({
  country_id: Yup.string().required('Country is required'),
  cns_budget: Yup.number().required('Value is required'),
  cns_ytd: Yup.number().required('Value is required'),
  gross_margin: Yup.number()
    .min(0)
    .max(100)
    .required('Value is required'),
  gross_margin_ratio: Yup.number()
    .min(0)
    .max(100)
    .required('Value is required'),
  a_and_p: Yup.number().required('Value is required'),
  a_and_p_cns: Yup.number()
    .min(0)
    .max(100)
    .required('Value is required'),
  net_contribution: Yup.number().required('Value is required'),
  cop: Yup.number().required('Value is required'),
  percent_cognac: Yup.number()
    .min(0)
    .max(100)
    .required('Value is required'),
  volume: Yup.number().required('Value is required'),
  head_count: Yup.number().required('Value is required'),
  date: Yup.string().required('Date is required')
});
