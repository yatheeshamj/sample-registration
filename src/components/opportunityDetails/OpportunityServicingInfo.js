import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Nav, Tabs, Tab, Row, Col, TabPane } from 'react-bootstrap';
import { Translate } from 'spotify-shared-web/localize'
import formHelpers from 'spotify-shared/helpers/formHelpers'
import NumberFormat from 'react-number-format';
import { getTimeZoneForCountryByCurrency } from "spotify-shared/helpers/country";
import SCREEN_CONFIG from "../../screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.opportunitiesDetails;

const OpportunityServicingInfo = ({
    currencyCode,
    isServicingComplex,
    servicingHoursStart,
    servicingHoursEnd,
    peakDemandEnd,
    peakDemandStart,
    servicingDays,
    displayfrom,
    displayto,
    servicingTimes,
    language,
    _pdfLink,
    onDownloadPDF
}) => {

    const timeZone = getTimeZoneForCountryByCurrency(currencyCode);

    return <Translate>
        {({ translate }) => <Fragment>
            <h4>{translate(`${CURRENT_SCREEN}.servicing`)} {translate(`${CURRENT_SCREEN}.timeZone`)}</h4>


            <table className="OpportunityServicingInfoTable table table-responsive table-borderless table-sm">
                <tbody>
                    <tr>
                        <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.serviceHours`)}</th>
                        <td>
                            {isServicingComplex === true &&
                                <Fragment>
                                    <a className="link pointer" onClick={() => onDownloadPDF(_pdfLink)}>{translate(`${CURRENT_SCREEN}.viewDetail`)}</a>
                                </Fragment>
                            }
                            {isServicingComplex === false &&
                                <Fragment>
                                    {formHelpers.formatTime(servicingHoursStart)} - {formHelpers.formatTime(servicingHoursEnd)}
                                </Fragment>
                            }
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.peakDemand`)}</th>
                        <td>
                            {isServicingComplex === true &&
                                <Fragment>
                                    <a className="link pointer" onClick={() => onDownloadPDF(_pdfLink)}>{translate(`${CURRENT_SCREEN}.viewDetail`)}</a>
                                </Fragment>
                            }
                            {isServicingComplex === false &&
                                <Fragment>
                                    {formHelpers.formatTime(peakDemandStart)} - {formHelpers.formatTime(peakDemandEnd)}
                                </Fragment>
                            }
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.serviceDays`)}</th>
                        <td>
                            {servicingDays}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.language`)}</th>
                        <td>
                            {language}
                        </td>
                    </tr>
                </tbody>
            </table>


        </Fragment>}
    </Translate>;
}

export default OpportunityServicingInfo;
