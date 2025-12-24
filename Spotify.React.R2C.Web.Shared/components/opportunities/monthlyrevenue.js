import "./Card/card.scss"
import React, { Fragment } from 'react';
import NumberFormat from 'react-number-format';
import { Translate } from '../../localize';


export const MonthlyRevenueMessage = ({ monthlyRevenue, currencyCode }) => {

    if (monthlyRevenue == 'undefined')
        return <Fragment>&nbsp;</Fragment>;
    if (monthlyRevenue != null && monthlyRevenue > 0)
        return <Translate>
            {({ translate }) => {
                return <Fragment>
                    {translate('*Earn up to')} <NumberFormat value={monthlyRevenue} displayType={'text'} thousandSeparator={true} prefix={currencyCode} />  {translate('each month!')}
                </Fragment>
            }}

        </Translate>;

    return <Fragment>&nbsp;</Fragment>;
}

const MonthlyRevenue = ({
    monthlyRevenue,
    currencyCode
}) =>

    <Translate>
        {({ translate }) => <Fragment>
            <div className="monthlyrevenue">
                <span className="revenue">
                    <h3 className="opportunity-board_bottom__title">
                        <MonthlyRevenueMessage monthlyRevenue={monthlyRevenue} currencyCode={currencyCode} />
                    </h3>
                </span>
            </div>
        </Fragment>
        }

    </Translate>;

export default MonthlyRevenue;

