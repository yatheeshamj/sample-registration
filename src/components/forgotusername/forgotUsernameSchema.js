import * as Yup from 'yup';

const ForgotUsernameSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

export default ForgotUsernameSchema;
