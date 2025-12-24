import { asyncFormApi } from '../../../../sagas/api';
import { axios } from 'spotify-shared/api/axios';

export function asyncValidateFein(value) {
  let error;

  return new Promise((resolve) => {
    return asyncFormApi
      .asyncValidateFein(value)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        resolve(err.response);
      });
  }).then((response) => {
    if (response.data) {
      error = response.data;
    } else {
      error = '';
    }
    return error;
  });
}

export function asyncValidateBusinessId(businessId, countryId, translate) {
  let error;
  return asyncFormApi
    .asyncValidateBusinessId(businessId, countryId)
    .then((response) => {
      return '';
    })
    .catch((err) => {
      const { response } = err;
      if (axios.isCancel(err)) {
        error = '';
      } else if (response && response.status == 409) {
        error = translate("registerYourCompany.companyDetails.duplicateBusinessId");
      } else if (response && response.status == 400) {
        error = translate("registerYourCompany.companyDetails.invalidBusinessId");
      }
      return error;
    });
}

export function asyncValidateTaxId(value, countryId, translate) {
  let error;
  return asyncFormApi
    .asyncValidateTaxId(value, countryId)
    .then((response) => {
      return '';
    })
    .catch((err) => {
      const { response } = err;
      if (axios.isCancel(err)) {
        error = '';
      } else if (response && response.status == 409) {
        error = translate("registerYourCompany.companyDetails.duplicateTaxId");
      } else if (response && response.status == 400) {
        error = translate("registerYourCompany.companyDetails.invalidTaxId");
      }
      return error;
    });
}


export function persistError(error) {
  return error;
}

export function validateConfirmPAN(value, pan) {
  let error;

  if (value !== pan) {
    error = 'PAN Numbers do not match';
  }

  return error;
}

export function asyncValidatePAN(value) {
  let error;

  return new Promise((resolve) => {
    return asyncFormApi
      .asyncValidatePAN(value)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        resolve(err.response);
      });
  }).then((response) => {
    if (response.data) {
      error = response.data;
    } else {
      error = '';
    }
    return error;
  });
}
