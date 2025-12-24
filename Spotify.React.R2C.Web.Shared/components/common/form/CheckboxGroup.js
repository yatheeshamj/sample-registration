import React, { Fragment } from 'react';
import classNames from "classnames";
import { FieldArray } from "formik";

const CheckboxGroup = ({
    options = [],
    label, id, field, hint, form: { touched, errors }, values, ...props }) => {
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

            {label &&
                <label className="font-weight-bold" >
                    {label}
                </label>
            }

            <FieldArray
                name={id}
                render={arrayHelpers => (
                    <div>
                        {options.map(tag => (

                            <div className="custom-control custom-checkbox" key={tag.label}>
                                <input
                                    className={classNames({
                                        "custom-control-input": true,
                                        "invalid-control": validationProps.invalid,
                                        "success-control": validationProps.valid
                                    })}
                                    name={field.name}
                                    id={`${tag.label}=${tag.value}`}
                                    type="checkbox"
                                    value={tag}
                                    checked={values && values[field.name] && values[field.name].includes(tag.value)}
                                    onChange={e => {
                                        if (e.target.checked) {
                                            arrayHelpers.push(tag.value);
                                        } else {
                                            if (!values[field.name]) return
                                            const idx = values[field.name].indexOf(tag.value);
                                            arrayHelpers.remove(idx);
                                        }
                                    }}
                                />
                                <label className='custom-control-label' htmlFor={`${tag.label}=${tag.value}`}>
                                    {tag.label}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            />


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

export default CheckboxGroup;
