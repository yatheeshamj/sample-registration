import * as Yup from 'yup';

const ResetPasswordSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  validationCode: Yup.string().required('Required'),
  password: Yup.string().required('Required')
});

export default ResetPasswordSchema;
