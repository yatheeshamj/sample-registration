import React, { Fragment } from 'react';

const RadioButton = ({
    options = [],
    hint,
    form: { touched, errors },
    label, id, field, values, setFieldValue, ...props }) => {
    return (
        <div className="form-group" >
            {label &&
                <label className="font-weight-bold" >
                    {label}
                </label>
            }
            {options.map((o, key) => <div key={key} className="custom-control custom-radio">
                <input id={`${o.label}-${o.value}-${id}`}
                    name={field.name}
                    type="radio"
                    className="custom-control-input"
                    checked={values != null && values[field.name] === o.value}
                    {...field}
                    {...props}
                    onChange={(e) => {

                        setFieldValue(field.name, o.value);

                    }}
                />
                <label className="custom-control-label" htmlFor={`${o.label}-${o.value}-${id}`} >
                    {o.label}
                </label>
            </div>
            )}

            {hint &&
                <span className="form-text text-muted">
                    {hint}
                </span>
            }
            {errors[field.name] && touched[field.name] &&
                <span className="form-text invalid-input pt-1">{errors[field.name].toString()}</span>
            }

        </div>

    );
}

export default RadioButton;
