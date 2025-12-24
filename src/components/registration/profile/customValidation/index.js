import { asyncFormApi } from '../../../../sagas/api';

export function validateLastName(value) {
  let error;
  if (value.length < 6) {
    error = 'Too short!';
  }
  return error;
}

export function validateTOS(value) {
}

export function asyncValidateUsername(value) {
  let error;

  const reg = new RegExp('(^[A-Za-z])([A-Za-z0-9]*$)');
  if (!reg.test(value)) {
    return (error = 'Requirement not met');
  }

  return new Promise((resolve) => {
    return asyncFormApi
      .asyncValidateUsername(value)
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

export function asyncValidateEmail(value) {
  let error;

  return new Promise((resolve) => {
    return asyncFormApi
      .asyncValidateEmail(value)
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

export function persistError(error) {
  return error;
}
