import * as Yup from 'yup';

const joinBusinessSchema = Yup.object().shape({
  fein: Yup.string(),
  businessId: Yup.string()
});

export default joinBusinessSchema;
