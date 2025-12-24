
//framework & 3rd parties
import React, { Component, Fragment } from 'react';

import { Modal } from 'react-bootstrap';
import { Translate } from 'spotify-shared-web/localize'
import PropTypes from 'prop-types';
import Button from "./Button"


const bootstrapModal = ({
    title,
    isVisible,
    onHide,
    onSubmit
}) => (<Translate>
    {({ translate }) => <Fragment>
        <Modal dialogClassName="BootstrapModal"
            show={isVisible}
            onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3>  {title}</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    {translate('Close')}
                </Button>
                <Button type="submit" variant="primary">
                    {translate('Ok')}
                </Button>
            </Modal.Footer>
        </Modal>
    </Fragment>}
</Translate>);

export default bootstrapModal;
