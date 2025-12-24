

import "./CourseCountDown.scss"
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Nav, Tabs, Tab, Row, Col, TabPane } from 'react-bootstrap';
import { Translate } from '../../localize';

import { getDateDifferenceInDays }  from "spotify-shared/helpers/utils"

const CourseCountDown = ({ registrationDueDate }) => {
    const days = getDateDifferenceInDays(registrationDueDate)

    return days >= 0 && days <= 5 && <Translate>
        {({ translate }) => <Fragment>
            <span className="important-text"> {translate('Only')} {days} {translate('Days Left!')}</span>
        </Fragment>}
    </Translate>;
}

export default CourseCountDown;
