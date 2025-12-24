import React from 'react';

// Radio group
const CountrySelectField = ({ error, touched, children, className }) => {
  return (
    <div className={className}>
      {children}
      {touched && error ? <div className='error'>{error}</div> : null}
    </div>
  );
};

export default CountrySelectField;
