

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Nav, Tabs, Tab, Row, Col, TabPane } from 'react-bootstrap';
import { Translate } from 'spotify-shared-web/localize'
import { EarningMessage } from "spotify-shared-web/components/opportunities/earnings"
import { MonthlyRevenueMessage } from "spotify-shared-web/components/opportunities/monthlyrevenue";
import formHelpers from 'spotify-shared/helpers/formHelpers'
import NumberFormat from 'react-number-format';
import Incentives from "spotify-shared-web/components/opportunities/incentives";
import SCREEN_CONFIG from "../../screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.opportunitiesDetails;

const OpportunityRevenue = ({
    isUserBusinessOwner,
    monthlyRevenue,
    averageWeeklyHours,
    hourlyRate,
    startEarningDate,
    higherRateValue,
    alternateBaseRate,
    currencyCode,
    hasIncentives

}) => <Translate>
        {({ translate }) => <Fragment>
            <h4>{translate(`${CURRENT_SCREEN}.revenue`)}</h4>
            <div>
                {
                    /* Removed on 7/22/2020 as part of Task 84810:Change Request: Remove Revenue Numbers
                        <MonthlyRevenueMessage monthlyRevenue={monthlyRevenue} currencyCode={currencyCode} />
                        <br />
                        <EarningMessage currencyCode={currencyCode} averageWeeklyHours={averageWeeklyHours} hourlyRate={hourlyRate} />
                        <br />
                     */
                }

                <Incentives hasIncentives={hasIncentives} />

            </div>

            <table className="OpportunityRevenueTable table table-responsive table-borderless table-sm">
                <tbody>
                    {
                        /* Removed on 7/22/2020 as part of Task 84810:Change Request: Remove Revenue Numbers
                            <tr>
                                <th scope="row" className="text-muted">{translate('Up to')}</th>
                                <td>
                                    <NumberFormat value={higherRateValue} displayType={'text'}
                                        thousandSeparator={true} prefix={currencyCode} />
                                </td>
                            </tr>
                          */
                    }
                    {isUserBusinessOwner &&
                        <tr>
                            <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.startAt`)}</th>
                            <td>
                                <NumberFormat value={alternateBaseRate}
                                    displayType={'text'} thousandSeparator={true}
                                    prefix={translate(`${CURRENT_SCREEN}.currency`)} />
                            </td>
                        </tr>
                    }
                    <tr>
                        <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.startEarning`)}</th>
                        <td>
                            {formHelpers.formatDate(startEarningDate)}
                        </td>
                    </tr>
                </tbody>
            </table>

        </Fragment>}
    </Translate>;

export default OpportunityRevenue;
