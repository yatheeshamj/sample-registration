import * as Yup from 'yup';
import { Translate } from "spotify-shared-web/localize";
import React from 'react';


// const vatid = (taxIdValidation) => taxIdValidation.required && Yup.string()
//   .required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />)
//   .matches(new RegExp(taxIdValidation.validation.pattern), <Translate id="registerYourCompany.companyDetails.invalidTaxId" />)

const vatid = (taxIdValidation) => {
  if (taxIdValidation.required) {
    return Yup.string()
      .required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />)
      .matches(new RegExp(taxIdValidation.validation.pattern), <Translate id="registerYourCompany.companyDetails.invalidTaxId" />);
  } else {
    return Yup.string()
      .matches(new RegExp(taxIdValidation.validation.pattern), <Translate id="registerYourCompany.companyDetails.invalidTaxId" />);
  }
};
const vatidPH = (TaxIdValidation) => {
  if (TaxIdValidation.required) {
    return Yup.string()
      .required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />)
      .matches(new RegExp(TaxIdValidation.validation.pattern), <Translate id="registerYourCompany.companyDetails.invalidTaxId" />);
  } else {
    return Yup.string()
      .matches(new RegExp(TaxIdValidation.validation.pattern), <Translate id="registerYourCompany.companyDetails.invalidTaxId" />);
  }
};
const feinPH = (businessIdValidation) => {
  if (businessIdValidation.required) {
    return Yup.string()
      .required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />)
      .matches(new RegExp(businessIdValidation.validation.pattern), <Translate id="registerYourCompany.companyDetails.invalidBusinessId" />);
  } else {
    return Yup.string()
      .matches(new RegExp(businessIdValidation.validation.pattern), <Translate id="registerYourCompany.companyDetails.invalidBusinessId" />);
  }
};


const name = (companyValidation) => companyValidation.required && Yup.string()
  .required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />)
//.matches(new RegExp(companyValidation.validation.pattern), <Translate id="registerYourCompany.companyDetails.invalidCompanyName" />)

// const fein = Yup.string().required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />)
//   .test('len', 'Invalid FEIN. 9 digits required', (val) => {
//     if (val) {
//       return val.length === 9;
//     }
//     return true;
//   });
const stateOfIncorporationId = (stateOfIncorporationValidation) => stateOfIncorporationValidation.required && Yup.string().required(<Translate id="registerYourCompany.companyDetails.stateOfIncorporationRequired" />);

const companyType = (companyTypeValidation) => companyTypeValidation.required && Yup.string().required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />);

const registrationStatus = (registrationStatusValidation) => registrationStatusValidation.required && Yup.string().required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />);

const typeOfIncorporation = (typeOfIncorporationValidation) => typeOfIncorporationValidation.required && Yup.string().required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />);

// const transactionDate = (transactionDateValidation) => {
//   return Yup.string().when(['companyType', 'fein'], (companyType, fein, schema) => {
//     if (companyType === 'large' && fein && fein.length) {
//       return schema.required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />);
//     } else if (companyType === 'small' && fein && fein.length) {
//       return schema.required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />);
//     } else {
//       return schema;
//     }
//   });
// };

const taxProgram = (taxProgramValidation) => {
  return Yup.string().when(['companyType', 'fein', 'registrationStatus'], (companyType, fein, registrationStatus, schema) => {
    if ((companyType === 'large' || companyType === 'small') && fein && fein.length) {
      return schema.required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />);
    } else if ((registrationStatus === 'Exempt' || registrationStatus === 'Registered') && fein && fein.length) {
      return schema.required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />);
    } else {
      return taxProgramValidation.required && schema.required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />);
    }
  });
};

//const taxProgram = (taxProgramValidation) => taxProgramValidation.required && Yup.string().required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />);

const stateId = (stateValidation) => stateValidation.required && Yup.string().required(<Translate id="registerYourCompany.companyDetails.stateRequired" />);

const provinceId = (stateValidation) =>stateValidation.required && Yup.string().required(<Translate id="registerYourCompany.companyDetails.provinceRequired" />);

const provinceOfIncorporationId = (stateOfIncorporation) => stateOfIncorporation.required && Yup.string().required(<Translate id="registerYourCompany.companyDetails.provinceOfIncorporationRequired" />);

const title = (titleValidation) => titleValidation.required && Yup.string().required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />);

// const primaryPurpose = (primaryPurposeValidation) => {
//     if (!primaryPurposeValidation.display) {
//         // Field is not displayed → no validation
//         return Yup.mixed().notRequired();
//     }

//     // Field is displayed → required boolean
//     return Yup.mixed()
//         .oneOf([true, false], <Translate id="registerYourCompany.companyDetails.requiredMessage" />)
//         .required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />);
// };

// const fein = (businessIdValidation) => businessIdValidation.required && Yup.string()
//   .required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />)
//   .matches(new RegExp(businessIdValidation.validation.pattern), <Translate id="registerYourCompany.companyDetails.invalidBusinessId" />)


const fein = (businessIdValidation, companyType) => {
  return businessIdValidation.required && Yup.string()
    .matches(new RegExp(businessIdValidation.validation.pattern), <Translate id="registerYourCompany.companyDetails.invalidBusinessId" />)
    .when('companyType', {
      is: (type) => {
        // Condition 1: businessValidation.required && !companyType.display
        if (businessIdValidation.required && !companyType.display) {
          return true;
        }
        // Condition 2: companyType.display && companyType === "large"
        if (companyType.display && type === "large") {
          return true;
        }
        // Condition 3: Otherwise
        return false;
      },
      then: Yup.string().required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />), // Provide error message as string
      otherwise: Yup.string()
    });
};



const companyId = Yup.string()
  .required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />)
  .test('len', 'Invalid Company Id. 8 digits required', (val) => {
    if (val) {
      return val.length === 8;
    }
    return true;
  });

const primaryPhone = (phoneLengthValidation) => Yup.string()
  .required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />)
  .matches(new RegExp(phoneLengthValidation.validation.pattern), <Translate id="registerYourCompany.companyDetails.invalidPhone" />)
// .test('len', <Translate id="registerYourCompany.companyDetails.invalidPhone" />, (val) => {

//   if (val) {
//     return val.length === phoneLengthValidation.length;
//   }
//   return true;
// });
const primaryPhoneUK = Yup.string()
  .required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />)
  .test('len', 'Invalid phone number', (val) => {
    if (val) {
      return val.length === 11;
    }
    return true;
  });

const email = (emailValidation) => emailValidation.required && Yup.string()
  .email(<Translate id="registerYourCompany.companyDetails.invalidEmail" />)
  .required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />);

const address = (addressValidation) => addressValidation.required && Yup.string().required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />);

const smartyAddressUS = (addressValidation, states) => addressValidation.required && Yup.string().required('Required').test('address', "spotify is not currently sourcing Service Partners within your State", value => {

  if (value) {

    const completeAddress = value.split(",")
    console.log(value, "filter")
    if (completeAddress.length < 4) {
      return true
    }
    const res = states.filter((st) => {

      if (st.code.toUpperCase() == completeAddress[3].toUpperCase()) {
        return st
      }
    })
    if (res.length >= 1) {
      return true
    }
    return false
  }

  return false
});

const city = (cityValidation) => cityValidation.required && Yup.string().required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />);

const zipCode = (zipCodeValidation) => zipCodeValidation.required && Yup.string()
  .required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />)
  .matches(new RegExp(zipCodeValidation.validation.pattern), <Translate id="registerYourCompany.companyDetails.invalidZipCode" />)

// .test('len', 'Invalid ZIP code', (val) => {
//   if (val) {
//     return val.length === 5;
//   }
//   return true;
// });
const postCode = Yup.string()
  .required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />)
  .test('len', 'Invalid Post code', (val) => {
    if (val) {
      return val.length > 5 && val.length < 9;
    }
    return true;
  });
const postalCode = Yup.string()
  .required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />)
  .test('len', 'Invalid Postal code', (val) => {
    if (val) {
      return val.length === 7;
    }
    return true;
  });
const gsthst = Yup.string().required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />);

// const vatid = Yup.string()
//   .test('len', 'Invalid VAT Id. 10 digits required', (val) => {
//     if (val) {
//       return val.length === 10;
//     }
//     return true;
//   });

const pan = Yup.string().required(<Translate id="registerYourCompany.companyDetails.requiredMessage" />)
  .test('len', 'Invalid PAN. 10 character required', (val) => {
    if (val) {
      return val.length === 10;
    }
    return true;
  });

export const registerBusinessSchemaUS = (states) => Yup.object().shape({
  name: name,
  fein: fein,
  stateId: stateId,
  title: title,
  primaryPhone: primaryPhone,
  email: email,
  address: Yup.string().required('Required').test('address', "spotify is not currently sourcing Service Partners within your State", value => {

    if (value) {

      const completeAddress = value.split(",")
      console.log(value, "filter")
      if (completeAddress.length < 4) {
        return true
      }
      const res = states.filter((st) => {

        if (st.code.toUpperCase() == completeAddress[3].toUpperCase()) {
          return st
        }
      })
      if (res.length >= 1) {
        return true
      }
      return false
    }

    return false
  }),
  city: city,
  stateOfIncorporationId: stateOfIncorporationId,
  zipCode: zipCode
});
// export const registerBusinessSchemaUS = (registerBusinessScreenConfig) =>


//   Yup.object().shape({
//     name: name,
//     fein: fein,
//     stateId: stateId,
//     title: title,
//     // primaryPhone: primaryPhone(registerBusinessScreenConfig.companyContactInformation.primaryPhone),
//     primaryPhone: primaryPhone(registerBusinessScreenConfig.companyDetails.companyContactInformation.primaryPhone),
//     email: email,
//     address: address,
//     city: city,
//     stateOfIncorporationId: stateOfIncorporationId,
//     zipCode: zipCode
//   });

// export const registerBusinessSchemaCA = Yup.object().shape({
//   name: name,
//   title: title,
//   fein: businessId,
//   gsthst: gsthst,
//   primaryPhone: primaryPhone,
//   email: email,
//   provinceOfIncorporationId: provinceId,
//   address: address,
//   city: city,
//   provinceId: provinceId,
//   zipCode: postalCode
// });

// export const registerBusinessSchemaUK = Yup.object().shape({
//   name: name,
//   title: title,
//   fein: companyId,
//   vatid: vatid,
//   primaryPhone: primaryPhoneUK,
//   email: email,
//   address: address,
//   city: city,
//   zipCode: postCode
// });

// export const registerBusinessSchemaIN = Yup.object().shape({
//   fein: pan,
// });


// export const registerBusinessSchema = (registerBusinessScreenConfig) => Yup.object().shape({
//   name: name(registerBusinessScreenConfig.companyDetails.companyName),
//   businessId: businessId(registerBusinessScreenConfig.companyDetails.businessId),
//   taxId: taxId(registerBusinessScreenConfig.companyDetails.taxId),
//   stateId: stateId(registerBusinessScreenConfig.companyDetails.companyContactInformation.state),
//   title: title(registerBusinessScreenConfig.companyDetails.yourTitle),
//   primaryPhone: primaryPhone(registerBusinessScreenConfig.companyDetails.companyContactInformation.primaryPhone),
//   email: email(registerBusinessScreenConfig.companyDetails.companyContactInformation.email),
//   address: address(registerBusinessScreenConfig.companyDetails.companyContactInformation.addressLine1),
//   city: city(registerBusinessScreenConfig.companyDetails.companyContactInformation.city),
//   stateOfIncorporationId: stateOfIncorporationId(registerBusinessScreenConfig.companyDetails.stateOfIncorporation),
//   zipCode: zipCode(registerBusinessScreenConfig.companyDetails.companyContactInformation.zipCode)
// })
export const registerBusinessSchema = (registerBusinessScreenConfig, states,isPHUser) => Yup.object().shape({

  name: registerBusinessScreenConfig.companyDetails.companyName.display && name(registerBusinessScreenConfig.companyDetails.companyName),
  fein: registerBusinessScreenConfig.companyDetails.businessId.display && !isPHUser && fein(registerBusinessScreenConfig.companyDetails.businessId, registerBusinessScreenConfig.companyDetails.companyType),
  vatid: registerBusinessScreenConfig.companyDetails.taxId.display && !isPHUser && vatid(registerBusinessScreenConfig.companyDetails.taxId),
  feinPH: registerBusinessScreenConfig.companyDetails.businessId.display && isPHUser && feinPH(registerBusinessScreenConfig.companyDetails.businessId),
  vatidPH: registerBusinessScreenConfig.companyDetails.taxId.display && isPHUser && vatidPH(registerBusinessScreenConfig.companyDetails.taxId),
  typeOfIncorporation: registerBusinessScreenConfig.companyDetails.typeOfIncorporation.display && typeOfIncorporation(registerBusinessScreenConfig.companyDetails.typeOfIncorporation),
  registrationStatus : registerBusinessScreenConfig.companyDetails.registrationStatus.display && registrationStatus(registerBusinessScreenConfig.companyDetails.registrationStatus),
  companyType: registerBusinessScreenConfig.companyDetails.companyType.display && companyType(registerBusinessScreenConfig.companyDetails.companyType),
  // transactionDate: registerBusinessScreenConfig.companyDetails.transactionDate.display && transactionDate(registerBusinessScreenConfig.companyDetails.transactionDate),
  taxProgram: registerBusinessScreenConfig.companyDetails.taxProgram.display && taxProgram(registerBusinessScreenConfig.companyDetails.taxProgram),
  stateId: registerBusinessScreenConfig.companyDetails.companyContactInformation.state.display && registerBusinessScreenConfig.companyDetails.companyContactInformation.state.isState === true && stateId(registerBusinessScreenConfig.companyDetails.companyContactInformation.state),
  provinceId: registerBusinessScreenConfig.companyDetails.companyContactInformation.state.display && registerBusinessScreenConfig.companyDetails.companyContactInformation.state.isState === false && provinceId(registerBusinessScreenConfig.companyDetails.companyContactInformation.state),
  title: registerBusinessScreenConfig.companyDetails.yourTitle.display && title(registerBusinessScreenConfig.companyDetails.yourTitle),
  // primaryPurpose: registerBusinessScreenConfig.companyDetails.primaryPurpose.display && primaryPurpose(registerBusinessScreenConfig.companyDetails.primaryPurpose),
  primaryPhone: registerBusinessScreenConfig.companyDetails.companyContactInformation.primaryPhone.display && primaryPhone(registerBusinessScreenConfig.companyDetails.companyContactInformation.primaryPhone),
  email: registerBusinessScreenConfig.companyDetails.companyContactInformation.companyEmail.display && email(registerBusinessScreenConfig.companyDetails.companyContactInformation.companyEmail),
  address: registerBusinessScreenConfig.companyDetails.companyContactInformation.addressLine1.display && (registerBusinessScreenConfig.companyDetails.companyContactInformation.addressLine1.smartyAddressVerification && !registerBusinessScreenConfig.companyDetails.companyContactInformation.addressLine1.smartyInternational ? smartyAddressUS(registerBusinessScreenConfig.companyDetails.companyContactInformation.addressLine1, states) : address(registerBusinessScreenConfig.companyDetails.companyContactInformation.addressLine1)),
  city: registerBusinessScreenConfig.companyDetails.companyContactInformation.city.display && city(registerBusinessScreenConfig.companyDetails.companyContactInformation.city),
  stateOfIncorporationId: registerBusinessScreenConfig.companyDetails.stateOfIncorporation.display && registerBusinessScreenConfig.companyDetails.companyContactInformation.state.isState === true && stateOfIncorporationId(registerBusinessScreenConfig.companyDetails.stateOfIncorporation),
  provinceOfIncorporationId: registerBusinessScreenConfig.companyDetails.stateOfIncorporation.display && registerBusinessScreenConfig.companyDetails.companyContactInformation.state.isState === false && provinceOfIncorporationId(registerBusinessScreenConfig.companyDetails.stateOfIncorporation),
  zipCode: registerBusinessScreenConfig.companyDetails.companyContactInformation.zipCode.display && zipCode(registerBusinessScreenConfig.companyDetails.companyContactInformation.zipCode),

});
