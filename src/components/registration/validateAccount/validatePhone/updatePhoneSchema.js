import * as Yup from 'yup';
import { Translate } from "spotify-shared-web/localize";
import React from 'react';

// export const UpdatePhoneSchema = Yup.object().shape({
//   mobilePhone: Yup.string()
//     .required('Required')
//     .test('len', 'Invalid phone number', (val) => {
//       if (val) {
//         return val.length === 10;
//       }
//       return true;
//     })
// });
// export const UpdateUKPhoneSchema = Yup.object().shape({
//   mobilePhone: Yup.string()
//     .required('Required')
//     .test('len', 'Invalid phone number', (val) => {
//       if (val) {
//         return val.length === 11;
//       }
//       return true;
//     })
// });

// export const UpdateJMPhoneSchema = Yup.object().shape({
//   mobilePhone: Yup.string()
//     .required('Required')
//     .test('len', 'Phone number should start with 876 or 658 with length of 10', (val) => {
//       if (val && val.length != 10) {
//         return false
//       }
//       if (!(/^658/.test(val) || /^876/.test(val))) {
//         return false
//       }

//       return true;
//     })
// });

const mobilePhone = (phoneValidations) => Yup.string()
  .required(<Translate id="contactValidation.phoneNumber.updatePhoneNumberRequired" />)
  .matches(new RegExp(phoneValidations.pattern), <Translate id="contactValidation.phoneNumber.invalidPhonenumberFormat" />)

export const UpdatePhoneSchema = (phoneValidations) => Yup.object().shape({
  mobilePhone: phoneValidations.display && mobilePhone(phoneValidations)
});

