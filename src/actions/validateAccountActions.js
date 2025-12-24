import {
  VALIDATE_PHONE,
  RESEND_PHONE_VALIDATION_CODE,
  UPDATE_MOBILE_PHONE,
  EDIT_MOBILE_PHONE,
  CANCEL_MOBILE_PHONE,
  VALIDATE_EMAIL,
  RESEND_EMAIL_VALIDATION_CODE,
  UPDATE_EMAIL,
  EDIT_EMAIL,
  CANCEL_EMAIL,
} from '../types/validateAccountTypes';

export const submitValidatePhone = (formData) => ({
  type: VALIDATE_PHONE,
  payload: formData
});

export const resendPhoneValidationCode = (data) => ({
  type: RESEND_PHONE_VALIDATION_CODE,
  payload: data
});

export const updateMobilePhone = (formData) => ({
  type: UPDATE_MOBILE_PHONE,
  payload: formData
});

export const cancelMobilePhone = () => ({
  type: CANCEL_MOBILE_PHONE,
  payload: {}
});

export const editMobilePhone = () => ({
  type: EDIT_MOBILE_PHONE,
  payload: {}
});

export const submitValidateEmail = (formData) => ({
  type: VALIDATE_EMAIL,
  payload: formData
});

export const resendEmailValidationCode = (data) => ({
  type: RESEND_EMAIL_VALIDATION_CODE,
  payload: data
});

export const updateEmail = (formData) => ({
  type: UPDATE_EMAIL,
  payload: formData
});

export const cancelEmail = () => ({
  type: CANCEL_EMAIL,
  payload: {}
});

export const editEmail = () => ({
  type: EDIT_EMAIL,
  payload: {}
});
