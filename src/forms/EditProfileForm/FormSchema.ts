import * as Yup from 'yup';

export default Yup.object().shape({
  first_name: Yup.string().nullable(),
  last_name: Yup.string().nullable()
});
