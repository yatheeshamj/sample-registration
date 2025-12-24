

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Nav, Tabs, Tab, Row, Col, TabPane } from 'react-bootstrap';
import { Translate } from 'spotify-shared-web/localize';
import SCREEN_CONFIG from "../../screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.opportunitiesDetails;



const OpportunityEquipment = ({
    equipments = []
}) => <Translate>
        {({ translate }) => <Fragment>
            <h4>{translate(`${CURRENT_SCREEN}.equipment`)}</h4>

            <ul>
                {equipments.sort((a, b) => b.sortOrder < a.sortOrder ? 1 : -1).map(e => <li key={e.equipmentCrmId}> {e.value}</li>)}
            </ul>
        </Fragment>}
    </Translate>;

export default OpportunityEquipment;
