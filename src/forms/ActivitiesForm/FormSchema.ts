import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required('name is required'),
  country_id: Yup.string().required('country is required'),
  brand_id: Yup.string().required('brand is required'),
  date_range: Yup.array().required('date range is required')
});
