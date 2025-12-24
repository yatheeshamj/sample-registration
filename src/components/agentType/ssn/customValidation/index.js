import { asyncFormApi } from '../../../../sagas/api';

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

export function validateConfirmSsn(value, ssn, translate) {
  let error;

  if (value !== ssn) {
    error = translate('Social Security Numbers do not match');
  }

  return error;
}

export function persistError(error) {
  return error;
}
