import React, { Fragment } from 'react';
import classNames from "classnames";

const SelectInput = ({
    label, id,
    hint,
    field,
    form = {},
    options = [],
    blankOption,
    ...props }) => {

    const { touched, errors } = form;
    const isTocuhed = field && touched ? touched[field.name] : false;
    const error = field && errors ? errors[field.name] : undefined
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
            <select className={classNames({
                "custom-select": true,
                "invalid-control": validationProps.invalid,
                "success-control": validationProps.valid
            })}
                id={id}

                {...field}
                {...props} >

                {blankOption && <option value="" disabled >{blankOption}</option>}
                {label && !blankOption && <option value="" disabled >{label}</option>}
                {options.map((opt, key) => <option key={key} value={opt.value}>{opt.label}</option>)}

            </select>

            {/* {label && <label className="form-control-placeholder" htmlFor={id}>{label}</label>} */}
            {/* {hint &&
                <span className="form-text text-muted">
                    {hint}
                </span>
            } */}
            {field && errors[field.name] &&
                <span className="form-text invalid-input pt-1">{errors[field.name].toString()}</span>
            }
        </div>
    );
}

export default SelectInput;
