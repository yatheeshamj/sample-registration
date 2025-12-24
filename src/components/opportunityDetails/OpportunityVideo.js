
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Nav, Tabs, Tab, Row, Col, TabPane } from 'react-bootstrap';
import { Translate } from 'spotify-shared-web/localize'
import VideoPlayer from 'spotify-shared-web/components/common/VideoPlayer';

const style = {
    backgroundColor: "lightGray",
    height: "450px",
    textAlign: "center"
};
const OpportunityVideo = ({
    source
}) => <Translate>
        {({ translate }) => <VideoPlayer
            url={source}
            controls
            width={'100%'}
            height={'100%'}
        />}
    </Translate>;

export default OpportunityVideo;
