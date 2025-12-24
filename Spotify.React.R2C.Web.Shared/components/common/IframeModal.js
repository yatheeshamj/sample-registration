import React, { Component } from "react";
import { Translate } from 'spotify-shared-web/localize';
import Modal from "react-bootstrap/Modal"
import styles from './IframeModal.module.scss';

export const IframeModal = ({
    isVisible,
    handleClose,
    url = "",
    centered = true,
    size = "xl"
}) => {
    return (
        <Modal show={isVisible} onHide={handleClose} centered={centered} size={size}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body scrollable="true">


                <div className={styles["iframe-container"]}>
                    <iframe

                        src={url}

                    />
                </div>

            </Modal.Body>

        </Modal>
    )
}

