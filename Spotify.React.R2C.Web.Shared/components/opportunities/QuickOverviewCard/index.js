//import "./card.scss"

import React, { Fragment, Component } from 'react';
import CardTitle from "../Card/cardtitle";

import { EarningMessage } from "../earnings"
import { MonthlyRevenueMessage } from "../monthlyrevenue";
import { Translate } from '../../../localize';


class QuickOverviewCard extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }


    render() {
        const {
            opportunity
        } = this.props;

        if (!opportunity) return <Fragment></Fragment>

        return <Translate>
            {({ translate }) => <Fragment>
                <div className="spotify-card primary QuickOverviewCardWrapper">
                    <div className="QuickOverviewCardHeader">
                        <CardTitle showStatus={false} opportunity={opportunity} onLearnMoreClick={this.props.onLearnMoreClick} />
                    </div>
                    <div className="QuickOverviewCardBody">
                        {/*
                            <b>
                                <MonthlyRevenueMessage
                                    monthlyRevenue={opportunity.monthlyRevenue}
                                    currencyCode={opportunity.currencyCode} />
                            </b>
                            <br />
                            <b>
                                <EarningMessage currencyCode={opportunity.currencyCode}
                                    averageWeeklyHours={opportunity.averageWeeklyHours}
                                    hourlyRate={opportunity.hourlyRate} />
                            </b>
                            <br />
                        */}
                        <p>
                            {opportunity.description}
                        </p>

                        <a className="link pointer" onClick={this.props.onLearnMoreClick}>
                            {translate("opportunitiesCard.learnMore")}
                        </a>

                    </div>
                </div>
            </Fragment>}
        </Translate>;
    }
}




export default QuickOverviewCard
