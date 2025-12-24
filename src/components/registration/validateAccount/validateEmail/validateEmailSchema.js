import * as Yup from 'yup';

const ValidateEmailSchema = Yup.object().shape({
  validationCode: Yup.string().required('Required')
});

export default ValidateEmailSchema;
