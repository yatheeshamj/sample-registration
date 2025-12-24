import { Translate } from 'react-localize-redux';
import { asyncFormApi } from '../../../../sagas/api';
import { React } from "react";

export function asyncValidateSsn(value) {
  let error;

  return new Promise((resolve) => {
    return asyncFormApi
      .asyncValidateSsn(value)
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

export function asyncValidateUniqueId(value, reg, translate, agentId, duplicateApi) {

  let error;

  return new Promise((resolve) => {
    return asyncFormApi
      .asyncValidateUniqueId(value, agentId, duplicateApi)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        if (err.response.status == 400 || err.response.status == 409) {
          error = translate("uniqueIdentification.uniqueNumberAlreadyExists");


        }
        resolve(err.response);
      });
  }).then((response) => {
    if (response.data) {
      error = error;
    } else {
      error = '';
    }
    return error;
  });

}

export function asyncValidateSecondaryUniqueId(value, reg, translate, agentId) {
  let error;

  return new Promise((resolve) => {
    return asyncFormApi
      .asyncValidateSecondaryUniqueId(value, agentId)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        if (err.response.status == 400) {
          error = translate("uniqueIdentification.secondaryUniqueNumberAlreadyExists");

        }
        resolve(err.response);
      });
  }).then((response) => {
    if (response.data) {
      error = error;
    } else {
      error = '';
    }
    return error;
  });

}

// export function asyncValidateIndiviualTaxId(value, reg, translate, agentId) {
//   let error;

//   return true;

//   // return new Promise((resolve) => {
//   //   return asyncFormApi
//   //     .asyncValidateSecondaryUniqueId(value, agentId)
//   //     .then((response) => {
//   //       resolve(response.data);
//   //     })
//   //     .catch((err) => {
//   //       if (err.response.status == 400) {
//   //         error = translate("uniqueIdentification.secondaryUniqueNumberAlreadyExists");

//   //       }
//   //       resolve(err.response);
//   //     });
//   // }).then((response) => {
//   //   if (response.data) {
//   //     error = error;
//   //   } else {
//   //     error = '';
//   //   }
//   //   return error;
//   // });

// }

export function validateConfirmSsn(value, uniqueId, translate) {

  let error;

  if (value !== uniqueId) {

    error = translate('uniqueIdentification.uniqueIdDoesNotMatch');

  }

  return error;
}

export function validateSecondaryConfirmSsn(value, secondaryUniqueId, translate) {
  let error;

  if (value !== secondaryUniqueId) {
    error = translate('uniqueIdentification.secondaryuniqueIdDoesNotMatch');
  }

  return error;
}

// export function validateIndividualTaxIdConfirmSsn(value, secondaryUniqueId, translate) {
//   let error;

//   if (value !== secondaryUniqueId) {
//     error = translate('uniqueIdentification.individualTaxIdNumberDoesNotMatch');
//   }

//   return error;
// }

export function persistError(error) {
  return error;
}
