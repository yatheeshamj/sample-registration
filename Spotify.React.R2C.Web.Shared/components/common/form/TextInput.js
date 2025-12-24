import React, { Fragment } from 'react';
import classNames from "classnames";

const TextInput = ({ label, id, field, hint, form: { touched, errors }, ...props }) => {
    const isTocuhed = touched[field.name];
    const error = errors[field.name]
    let validationProps = {

    }
    if (error) {
        validationProps.invalid = true;
    }
    if (isTocuhed && !error) {
        validationProps.invalid = false;
        validationProps.valid = true;
    }

    return (
        <div className="form-group">
            <input className={classNames({
                "form-control": true,
                "invalid-control": validationProps.invalid,
                "success-control" :validationProps.valid
            })} type="text"
                id={id}
             
                {...field}
                {...props}
            />
            {label &&
                <label htmlFor={id} className="form-control-placeholder" >
                    {label}
                </label>
            }
            {hint &&
                <span className="form-text text-muted">
                    {hint}
                </span>
            }
            {errors[field.name] &&
                <span className="form-text invalid-input pt-1">{errors[field.name].toString()}</span>
            }
          


        </div>

    );
}

export default TextInput;


