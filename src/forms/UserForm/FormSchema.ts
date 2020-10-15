import * as Yup from 'yup';

export default Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Email is required'),
  first_name: Yup.string().required('First Name is required'),
  last_name: Yup.string().required('Last Name is required'),
  admin: Yup.boolean().required('User role required'),
  registration_complete: Yup.boolean().required(
    'Registration completeness required'
  )
});
