import * as Yup from 'yup';
import { COUNTRY_IDS } from '../../../constants';

const ProfileSchema = Yup.object().shape({
  countryId: Yup.string().required('A country option is required'),
  stateId: Yup.string().when('countryId', {
    is: COUNTRY_IDS.US,
    then: Yup.string().required('A state option is required')
  }),
  provinceId: Yup.string().when('countryId', {
    is: COUNTRY_IDS.CA,
    then: Yup.string().required('A Province option is required')
  }),
  firstName: Yup.string().required('Required'),
  middleInitial: Yup.string(),
  lastName: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  mobilePhone: Yup.string().when('countryId', {
    is: COUNTRY_IDS.UK,
    then: Yup.string()
      .required('Required')
      .test('len', 'Invalid phone number', (val) => {
        if (val) {
          return val.length === 11;
        }
        return true;
      }),
    otherwise: Yup.string()
      .required('Required')
      .test('len', 'Invalid phone number', (val) => {
        if (val) {
          return val.length === 10;
        }
        return true;
      })
  }),
  username: Yup.string().required('Required')
});

export default ProfileSchema;
