import React, { Component } from 'react';
import styles from './Button.module.scss';

import ButtonLoading from './ButtonLoading';

class Button extends Component {
    static defaultProps = {
        type: 'button',
        variant: 'primary',
        size: '',
        label: '',
        children: null,
        isSubmitting: false,
        disabled: false
    };

    render() {
        const {
            color,
            type,
            variant,
            size,
            onClick,
            label,
            children,
            isSubmitting,
            disabled,
            hide,
            style,
            ...props
        } = this.props;

        return (!hide &&
            <button
                {...props}
                style={style}
                type={type}
                // className={`${styles['button']} ${styles[size]} ${styles[variant]}`}
                className={`btn btn-${variant} ${styles[color || '']} ${styles[size]}`}
                onClick={type === 'submit' ? () => { } : onClick}
            disabled={disabled || isSubmitting}
            >
                {isSubmitting ? <ButtonLoading /> : label || children}
            </button>
        );
    }
}

export default Button;
