import * as Yup from 'yup';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  username: Yup.string().required('Required')
});

export default ForgotPasswordSchema;
