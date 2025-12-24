import React, { Fragment } from 'react';

const Checkbox = ({ label, id, field, ...props }) => {
    return (
        <div className="custom-control custom-checkbox">
            <input className="custom-control-input" type="checkbox"
                id={id}
                checked={field.value}
                {...field}
                {...props}
            />
            {label &&
                <label htmlFor={id} className="custom-control-label" >
                    <label dangerouslySetInnerHTML={{ __html: label }}></label>
                </label>
            }
        </div>

    );
}

export default Checkbox;
