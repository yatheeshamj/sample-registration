import React from 'react';

const TermsOfServiceField = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  className,
  ...props
}) => (
  <input id='tos' type='checkbox' className={className} {...field} {...props} />
);

export default TermsOfServiceField;
