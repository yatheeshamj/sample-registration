
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Nav, Tabs, Tab, Row, Col, TabPane } from 'react-bootstrap';
import { Translate } from 'spotify-shared-web/localize'
import CourseCountDown from "spotify-shared-web/components/opportunities/CourseCountDown"
import formHelpers from 'spotify-shared/helpers/formHelpers'
import NumberFormat from 'react-number-format';
import moment from "moment"
import { getTimeZoneForCountryByCurrency } from "spotify-shared/helpers/country"
import SCREEN_CONFIG from "../../screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.opportunitiesDetails;

const OpportunityCourseInfo = ({
    isEnrollmentInprocess,
    cost,
    flatBGCFees,
    registrationDueDate,
    classStartDate,
    courseDuration,
    courseEndDate,
    currencyCode,
    _isEnrolledFullPayment,
    primaryClassSchedule
}) => {


    const timeZone = getTimeZoneForCountryByCurrency(currencyCode);


    return <Translate>
        {({ translate }) => <Fragment>
            <h4>{translate(`${CURRENT_SCREEN}.course`)}</h4>
            {isEnrollmentInprocess === true && _isEnrolledFullPayment === false &&
                <div>
                    <p>
                        <b>{translate(`${CURRENT_SCREEN}.registrationPending`)}</b>
                        <br />
                        {translate(`${CURRENT_SCREEN}.disclaimer1`)}
                        &nbsp;{formHelpers.formatDate(registrationDueDate)}&nbsp;
                        {translate(`${CURRENT_SCREEN}.disclaimer2`)}
                        <br />

                        {primaryClassSchedule && <Fragment>
                            <CourseCountDown registrationDueDate={primaryClassSchedule.registrationDueDate} />
                        </Fragment>}

                        {!primaryClassSchedule && <Fragment>
                            <CourseCountDown registrationDueDate={registrationDueDate} />
                        </Fragment>}

                    </p>
                </div>
            }

            <table className="OpportunityCourseInfoTable table table-responsive table-borderless table-sm">
                <tbody>
                    <tr>
                        <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.courseCost`)}</th>
                        <td>
                            <NumberFormat value={cost} displayType={'text'} thousandSeparator={true} prefix={translate(`${CURRENT_SCREEN}.currency`)} />
                        </td>

                    </tr>
                    {flatBGCFees > 0 &&
                        <tr>
                            <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.bgcFees`)}</th>
                            <td>
                                <NumberFormat value={flatBGCFees} displayType={'text'} thousandSeparator={true} prefix={currencyCode} />
                            </td>
                        </tr>}
                    <tr>
                        <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.schedule`)}</th>
                        <td>
                            {formHelpers.formatDate(classStartDate)} - {formHelpers.formatDate(courseEndDate)}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.enrollDeadline`)}</th>
                        <td>


                            {primaryClassSchedule && <Fragment>
                                {formHelpers.formatDate(primaryClassSchedule.registrationDueDate)}
                                <CourseCountDown registrationDueDate={primaryClassSchedule.registrationDueDate} />
                            </Fragment>}

                            {!primaryClassSchedule && <Fragment>
                                {formHelpers.formatDate(registrationDueDate)}
                                <CourseCountDown registrationDueDate={registrationDueDate} />
                            </Fragment>}
                        </td>
                    </tr>
                </tbody>
            </table>

        </Fragment>}
    </Translate>;

}



export default OpportunityCourseInfo;
