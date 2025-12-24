
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Nav, Tabs, Tab, Row, Col, TabPane } from 'react-bootstrap';
import { Translate } from 'spotify-shared-web/localize';
import SCREEN_CONFIG from "../../screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.opportunitiesDetails;



const OpportunityAssessments = ({
    enrollmentAssessments = []
}) => <Translate>
        {({ translate }) => <Fragment>
            <h4>{enrollmentAssessments.length > 0 && enrollmentAssessments.length} {translate(`${CURRENT_SCREEN}.prerequisites`)}</h4>
            <ul>
                {enrollmentAssessments.sort((a, b) => b.sortOrder < a.sortOrder ? 1 : -1).map(e => <li key={e.enrollmentTemplateStepId}> {e.displayName}</li>)}
            </ul>
        </Fragment>}
    </Translate>;

export default OpportunityAssessments;
