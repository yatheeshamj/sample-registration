
//framework & 3rd parties
import React, { Component, Fragment } from 'react';
import classNames from "classnames";
import { Row, Col, Modal } from 'react-bootstrap';
import { Translate } from '../../localize';
import PropTypes from 'prop-types';
import VideoPlayer from '../common/VideoPlayer';
import Button from "../common/Button"
 
export default class VideoModal extends Component {

    render() {

        const {
            title,
            isVisible,
            onHide,
            videoLink
        } = this.props;
        
        return <Translate>
            {({ translate }) => <Fragment>
                <Modal dialog={'true'} className="spotify-Modal VideoModal" 
                    show={isVisible}
                    onHide={onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <VideoPlayer
                            url={videoLink}
                            controls
                            width={'100%'}
                            height={'100%'}
                        />
                     
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
            </Fragment>}
        </Translate>;
    }
}
