import * as Yup from 'yup';
import { Translate } from "spotify-shared-web/localize";
import React from 'react';



const uniqueIdentity = (uniqueNumberValidation) => Yup.string()
    .required(<Translate id="uniqueIdentification.uniqueNumberRequired" />)
    .matches(new RegExp(uniqueNumberValidation.validation.pattern), <Translate id="uniqueIdentification.uniqueNumberInvalid" />)

const secondaryUniqueIdentity = (secondaryUniqueNumberValidation) => Yup.string()
    .required(<Translate id="uniqueIdentification.secondaryUniqueNumberRequired" />)
    .matches(new RegExp(secondaryUniqueNumberValidation.validation.pattern), <Translate id="uniqueIdentification.secondaryUniqueNumberInvalid" />)

// const individualTaxIdentity = (individualTaxIdNumberValidation) => Yup.string()
//     .required(<Translate id="uniqueIdentification.individualTaxIdNumberRequired" />)
//     .matches(new RegExp(individualTaxIdNumberValidation.validation.pattern), <Translate id="uniqueIdentification.individualTaxIdNumberFormatInvalid" />)


const uniqueIdSchema = (formFields) => Yup.object().shape({
    firstName: formFields.nameFields.firstName.required && Yup.string().required(<Translate id="uniqueIdentification.firstNameRequired" />),
    middleInitial: formFields.nameFields.middleInitial.required && Yup.string().required(<Translate id="uniqueIdentification.middleInitialRequired" />),
    lastName: formFields.nameFields.lastName.required && Yup.string().required(<Translate id="uniqueIdentification.lastNameRequired" />),

    uniqueIdentity: formFields.uniqueNumber.display && uniqueIdentity(formFields.uniqueNumber),
    uniqueIdentityConfirm: formFields.confirmUniqueNumber.required && Yup.string().required(<Translate id="uniqueIdentification.confirmUniqueNumberRequired" />),

    secondaryUniqueIdentity: formFields.secondaryUniqueNumber.display && secondaryUniqueIdentity(formFields.secondaryUniqueNumber),
    secondaryUniqueIdentityConfirm: formFields.confirmSecondaryUniqueNumber.required && Yup.string().required(<Translate id="uniqueIdentification.confirmSecondaryUniqueNumberRequired" />),



    // individualTaxIdentity: formFields.individualTaxIdNumber.display && individualTaxIdentity(formFields.individualTaxIdNumber),
    // individualTaxIdentityConfirm: formFields.confirmIndividualTaxIdNumber.required && Yup.string().required(<Translate id="uniqueIdentification.confirmIndividualTaxIdNumberRequired" />)

});

export default uniqueIdSchema;

