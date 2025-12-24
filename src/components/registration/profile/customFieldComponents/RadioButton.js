import React from 'react';

const RadioButton = ({
  field: { name, value, onChange },
  id,
  label,
  className,
  labelClassName,
  ...props
}) => {
  return (
    <div style={{ position: 'relative' }}>
      <input
        name={name}
        id={id}
        type='radio'
        value={id}
        className={className}
        checked={id === value}
        onChange={onChange}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default RadioButton;
