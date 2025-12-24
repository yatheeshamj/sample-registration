
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Nav, Tabs, Tab, Row, Col, TabPane } from 'react-bootstrap';
import { Translate } from 'spotify-shared-web/localize';



const OpportunityDetailTitle = ({
    clientLogoURL = "https://via.placeholder.com/150",
    name,
    clientName,
    serviceType,
    programService

}) => <Translate>
        {({ translate }) => <Row>
            <Col lg={4} md={12} sm={12} xs={12}>
                <div className="Opportunity-Detail-img-container">
                    <img className="img logo" src={clientLogoURL} alt="Client Logo" />
                </div>
            </Col>
            <Col className="" lg={8} md={12} sm={12} xs={12}>
                <h1>{name}</h1>
            </Col>
            <Col className="mt-4">
                <h4><span>{serviceType} {translate('opportunitiesCard.by')} {programService} </span></h4>
            </Col>
        </Row>}
    </Translate>;

export default OpportunityDetailTitle;
