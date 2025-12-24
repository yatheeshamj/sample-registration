import * as Yup from 'yup';

const ssnSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  ssn: Yup.string().required('Required'),
  ssnConfirm: Yup.string().required('Required')
});

export default ssnSchema;
