

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Nav, Tabs, Tab, Row, Col, TabPane } from 'react-bootstrap';
import { Translate } from 'spotify-shared-web/localize'
import { getOpportunityPreferenceMatchIndicatorMsgHelper } from "spotify-shared/helpers/opportunity"



const OpportunityMatch = ({ qaScore }) => <Translate>
    {({ translate }) =>

        <span>{translate(getOpportunityPreferenceMatchIndicatorMsgHelper(qaScore) && getOpportunityPreferenceMatchIndicatorMsgHelper(qaScore))}</span>
    }
</Translate>;

export default OpportunityMatch;
