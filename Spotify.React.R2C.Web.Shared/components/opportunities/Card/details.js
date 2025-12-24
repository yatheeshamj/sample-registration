import "./card.scss"
import React, { Fragment } from 'react';
import formHelpers from 'spotify-shared/helpers/formHelpers'
import moment from 'moment'
import NumberFormat from 'react-number-format';
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import CourseCountDown from "../CourseCountDown";
import { getTimeZoneForCountryByCurrency } from "spotify-shared/helpers/country"
import { Translate } from '../../../localize';
import commonStyle from '../../../../src/components/shared/CommonStyle.module.scss';
import SCREEN_CONFIG from '../../../../src/screensConfig';

const CURRENT_SCREEN = SCREEN_CONFIG.opportunitiesCard;



const CardDetails = ({
    serviceType,
    programService,
    displayfrom,
    displayto,
    cost,
    classStartDate,
    startEarningDate,
    registrationDueDate,
    isServicingComplex,
    announcementFilePathCSP,
    currencyCode,
    onViewComplexHoursDetailClick,
    servicingHoursEnd,
    servicingHoursStart,
    _pdfLink
}, props) => {
    const timeZone = getTimeZoneForCountryByCurrency(currencyCode);


    return <Translate>
        {({ translate }) => <Fragment>
            <h4 className={`opportunity-board_top__subtitle ${commonStyle['opportunity__Card__Title']}`}
                style={{ textAlign: "left" }}>
                {serviceType} {translate(`${CURRENT_SCREEN}.by`)} {programService}
            </h4>
            <table className="opportunity-board_top__table table table-responsive table-borderless table-sm mb-0">
                <tbody>
                    <tr>
                        <th scope="row" className={`text-muted ${commonStyle['opportunity__Card__Subheading']}`}>{translate(`${CURRENT_SCREEN}.serviceHours`)}</th>
                        <td className={`${commonStyle['opportunity__Card__Subheading']}`}>
                            {isServicingComplex === true &&
                                <Fragment>
                                    <a className="link pointer" onClick={() => onViewComplexHoursDetailClick(_pdfLink)} >{translate(`${CURRENT_SCREEN}.viewDetail`)}</a>
                                </Fragment>
                            }

                            {isServicingComplex === false &&
                                <Fragment>
                                    {formHelpers.formatTime(servicingHoursStart)} - {formHelpers.formatTime(servicingHoursEnd)} {translate(`${CURRENT_SCREEN}.timeZone`)}
                                </Fragment>
                            }
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.courseCost`)}</th>
                        <td>
                            <NumberFormat value={cost} displayType={'text'} thousandSeparator={true} prefix={translate(`${CURRENT_SCREEN}.currency`)} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.deadline`)}</th>
                        <td>
                            {formHelpers.formatDate(registrationDueDate)}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-muted"></th>
                        <td>
                            <CourseCountDown classStartDate={classStartDate} registrationDueDate={registrationDueDate} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.courseStart`)}</th>
                        < td > {formHelpers.formatDate(classStartDate)}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.startEarning`)}</th>
                        <td>{formHelpers.formatDate(startEarningDate)}</td>
                    </tr>
                </tbody>
            </table>

        </Fragment>}
    </Translate>;
}




export default CardDetails;
