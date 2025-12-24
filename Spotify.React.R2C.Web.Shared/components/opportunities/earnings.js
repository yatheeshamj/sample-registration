import "./Card/card.scss"
import React, { Fragment } from 'react';
import NumberFormat from 'react-number-format';
import { Translate } from '../../localize';

export const EarningMessage = ({
    averageWeeklyHours,
    hourlyRate,
    currencyCode,
}) => {

    const haveData = () => averageWeeklyHours > 0 && hourlyRate != 0;
    return <Translate>
        {({ translate }) => {
            return <Fragment>
                {haveData() === true &&
                    <Fragment>({averageWeeklyHours} {translate('hours a week at')} <NumberFormat value={hourlyRate} displayType={'text'} thousandSeparator={true} prefix={currencyCode} decimalScale={2} fixedDecimalScale={true} />/{translate('hour')})</Fragment>
                }
                {haveData() === false &&
                    <span className="">&nbsp;</span>
                }
            </Fragment>
        }}

    </Translate>;
}

const Earnings = ({
    averageWeeklyHours,
    hourlyRate,
    currencyCode
}) =>
    <Translate>
        {({ translate }) => <Fragment>
            <div className="sowhours">
                <h4 className="opportunity-board_bottom__subtitle">
                    <EarningMessage averageWeeklyHours={averageWeeklyHours}
                        hourlyRate={hourlyRate} currencyCode={currencyCode} />
                </h4>
            </div>
        </Fragment>
        }

    </Translate>;

export default Earnings;
