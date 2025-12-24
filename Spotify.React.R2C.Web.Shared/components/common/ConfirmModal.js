
//framework & 3rd parties
import React, { Component, Fragment } from 'react';
import classNames from "classnames";
import { Row, Col, Modal } from 'react-bootstrap';
import { Translate } from '../../localize'
import PropTypes from 'prop-types';
import { Formik, Field, Form } from "formik";

import Button from "./Button"

export default class ConfirmModal extends Component {

    render() {

        const {
            title,
            isVisible,
            onCancel,
            onHide,
            onSubmit,
            cancelLbl,
            okLbl,
            isSubmitting = false,
            disableCancel = false,
            disableSubmit = false,
            hideOk = false,
            closeButton = true,
            backdrop = true,
            hideCancel= false,
            keyboard=true,
            
        } = this.props;


        return <Translate>
            {({ translate }) => <Fragment>
                <Modal  dialog={'true'} className="spotify-Modal ConfirmModalWrapper" 
                    show={isVisible}
                    backdrop={backdrop}
                    onHide={onHide}
                    keyboard={keyboard}
                    >
                    <Modal.Header closeButton={closeButton}>
                        <Modal.Title>
                            <h3>{title}</h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.children}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button disabled={disableSubmit} isSubmitting={isSubmitting} type="button"  variant="primary" hide={hideOk}
                            onClick={onSubmit}>
                            {okLbl}
                        </Button>
                        <Button disabled={disableCancel || isSubmitting}  variant="outline-primary"  hide={hideCancel}
                            onClick={onCancel}>
                            {cancelLbl}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>}
        </Translate>;
    }
}
