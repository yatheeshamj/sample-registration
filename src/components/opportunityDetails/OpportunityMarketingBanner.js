import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Nav, Tabs, Tab, Row, Col, TabPane } from 'react-bootstrap';
import { Translate } from 'spotify-shared-web/localize'
import { getOpportunityPreferenceMatchIndicatorMsgHelper } from "spotify-shared/helpers/opportunity"

const bannerStyle = {
    padding: "10px",
    fontFamily: "Arial",
    textAlign: "center",
    backgroundColor: "#203864",
    color: "white"

};

const OpportunityMarketingBanner = ({ qaScore }) => {

    const prefMatchMsg = getOpportunityPreferenceMatchIndicatorMsgHelper(qaScore);

    return <Translate>
        {({ translate }) => prefMatchMsg && <Row style={bannerStyle}>
            <Col>{translate(prefMatchMsg)}</Col>
        </Row>}
    </Translate>;
}

export default OpportunityMarketingBanner;
