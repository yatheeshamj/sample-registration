import * as Yup from 'yup';
import { Translate } from "spotify-shared-web/localize";
import React from 'react';

const ValidatePhoneSchema = Yup.object().shape({
  validationCode: Yup.string().required(
    <Translate id="contactValidation.phoneNumber.requiredMessage" />
  )
});

export default ValidatePhoneSchema;
