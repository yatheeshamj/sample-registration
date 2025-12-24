import * as Yup from 'yup';

const UpdateEmailSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

export default UpdateEmailSchema;
