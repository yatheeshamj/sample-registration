
//framework & 3rd parties
import React, { Component, Fragment } from 'react';
import classNames from "classnames";
import { Row, Col, Modal } from 'react-bootstrap';
import { Translate } from '../../localize'
import PropTypes from 'prop-types';
import { Formik, Field, Form } from "formik";

import Button from "./Button"

export default class ModalWithFormWrapper extends Component {

    render() {
        const children = (formProps) => {
            return React.Children.map(this.props.children, child => {
                return React.cloneElement(child, {
                    formProps: formProps
                });
            });
        }
        const {
            id,
            title,
            isVisible,
            onCancel,
            onHide,
            onSubmit,
            cancelLbl = 'Cancel',
            initialFormValues = {},
            enableReinitialize = true,
            showClearAndHide = false,
            onClear,
            validationSchema,
            applyLbl = 'Apply',
            hideApply = false,
            isInitialValid = false,
            closeButton = true,
            backdrop = true,
            overrideIsSubmitting = false,
            hideCancel = false,
            centered = centered ? centered : false,
            isSubmitButtonDisabled = isSubmitButtonDisabled ? isSubmitButtonDisabled : false,
            isSubmittingPCCheck

        } = this.props;

        return <Translate>
            {({ translate }) => <Fragment>
                <Modal dialog={'true'} className="spotify-Modal ModalWithFormWrapper" id={id}
                    keyboard={false}
                    backdrop={backdrop}
                    show={isVisible}
                    onHide={onHide}
                    centered={centered}
                >

                    <Modal.Header closeButton={closeButton}>
                        <Modal.Title>
                            <h3> {title}</h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Formik
                        onSubmit={(values, actions) => {
                            onSubmit(values, actions);
                        }}
                        isInitialValid={isInitialValid}
                        validationSchema={validationSchema}
                        enableReinitialize={enableReinitialize}
                        initialValues={initialFormValues}

                        render={formProps =>
                        (
                            <Form >
                                <Modal.Body>
                                    {children(formProps)}
                                </Modal.Body>
                                <Modal.Footer>
                                    {hideApply == false &&
                                        <Button isSubmitting={overrideIsSubmitting === false && (formProps.isSubmitting || isSubmittingPCCheck)} type="submit" size="medium" variant="primary" disabled={formProps.isValid === false || isSubmitButtonDisabled === true}>
                                            {translate(applyLbl)}
                                        </Button>
                                    }


                                    {showClearAndHide && onClear &&
                                        <Button variant="outline-primary" disabled={overrideIsSubmitting === false && formProps.isSubmitting} size="medium" onClick={onClear}>
                                            {translate('Clear All')}
                                        </Button>
                                    }

                                    {hideCancel === false &&
                                        <Button disabled={overrideIsSubmitting === false && formProps.isSubmitting} variant="outline-primary" size="medium" onClick={onCancel}>
                                            {translate(cancelLbl)}
                                        </Button>
                                    }
                                </Modal.Footer>
                            </Form>
                        )} />

                </Modal>
            </Fragment>}
        </Translate>;
    }
}
