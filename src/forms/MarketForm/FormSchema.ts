import * as Yup from 'yup';

export default Yup.object().shape({
  country: Yup.string().required('Country is required'),
  name: Yup.string().required('Name is required'),
  color: Yup.string().required('color is required'),
  active: Yup.string().required('Active is required')
});
