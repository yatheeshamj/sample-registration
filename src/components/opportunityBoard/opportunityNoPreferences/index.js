import './index.scss';
//framework & 3rd parties
import React, { Fragment, Component } from 'react';
import {
    Link
} from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col } from 'react-bootstrap';
import { Translate } from 'spotify-shared-web/localize'
import PropTypes from 'prop-types';
// import FilterBar from "./Filterbar/FilterBar"
import CardConnect from "spotify-shared-web/components/opportunities/Card"
import Loading from 'spotify-shared-web/components/common/LoadingComponent';
import commonStyle from '../../shared/CommonStyle.module.scss';
import { StickyContainer, Sticky } from 'react-sticky';
import NoPreferenceBar from './NoPreferences/NoPreferencesBar';
// import ActiveFiltersOverview from "./Filterbar/ActiveFiltersOverview"

/* Platform specific View*/

const Card = CardConnect(connect)

class OpportunitiesNoPreferencesView extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        
    }

    componentDidMount()
    {
        
    }

    render() {

        const {
            opportunities,
            setOpportunityFilter,
            onOpportunitiesFilterFieldChange,
            onOpportunitiesSortChange,
            opportunityFilterOptions,
            opportunitiesActiveFilter,
            isOpportunitiesFetching,
            opportunitiesSortedBy,
            opportunitiesSortOptions,
            onClearFilter,
            opportunitiesFilterCounts,
            isMobile,
            isFilterOptionsFetching,
            getOpportunityBoardMessage,
            anyActiveOpportunityFilters,
            displayOpportunityBoardDisclaimer,
            onOpportunityLearnMoreClick,
            onInProgressResumeClick,
            goToOpportunities,
            isFirstInstance,
            isSecondInstance,
            opportunitiesWithOutFilters,
            initializeOpportunityBoard,
            initializeOpportunityBoardFirstInstance,
            setOpportunityBoardType,
            opportuntiyBoardType,
            opportunitiesNotInProgress,
            opportunitiesForAdditionalTab
        } = this.props;
        return <Translate>
            {({ translate }) =>
                <StickyContainer>
                    <Row id="OportunityBoardContainer">
                        <Col xs={12} sm={12} md={12} lg={12} className={`${commonStyle['borderStyle']}`}>
                            <p>
                                {translate(getOpportunityBoardMessage())}
                                {translate("oppurtunitywithoutPreferences")}
                                {/* <Link to={'/my-preferences'}> {translate('Update Preferences')}</Link> */}
                            </p>
                        </Col>

                       

                        <Col xs={12} sm={12} md={8} lg={9} id="OportunityBoardContent" >
                            {/* {isMobile &&
                                <ActiveFiltersOverview
                                    anyActiveOpportunityFilters={anyActiveOpportunityFilters}
                                    opportunitiesActiveFilter={opportunitiesActiveFilter}
                                    onOpportunitiesFilterFieldChange={onOpportunitiesFilterFieldChange} />
                            }  */}

                            {isOpportunitiesFetching && <Loading />}

                            <Row className="row mb-5">
                                {!isOpportunitiesFetching && opportunitiesForAdditionalTab
                                 && opportunitiesForAdditionalTab.map((o, key) =>
                                    <Col key={key} xs={12} sm={12}  lg={6} xl={4} className="card-new">
                                        <Card {...o}
                                            goToOpportunities={goToOpportunities}
                                            onInProgressResumeClick={onInProgressResumeClick}
                                            onLearnMoreClick={onOpportunityLearnMoreClick} />
                                    </Col>)}

                             
                            </Row>
                             

                            </Col>
                    </Row>
                </StickyContainer>
            }
        </Translate>;
    }
}


OpportunitiesNoPreferencesView.propTypes = {
    opportunities: PropTypes.array.isRequired,
    setOpportunityFilter: PropTypes.func.isRequired,
    onOpportunitiesSortChange: PropTypes.func.isRequired,
    opportunityFilterOptions: PropTypes.array,
    opportunitiesActiveFilter: PropTypes.object,
    isOpportunitiesFetching: PropTypes.bool,
    opportunitiesSortedBy: PropTypes.string,
    opportunitiesSortOptions: PropTypes.array,
    onClearFilter: PropTypes.func,
    opportunitiesFilterCounts: PropTypes.object,
    isMobile: PropTypes.bool,
    isFirstInstance: PropTypes.bool,
    isSecondInstance: PropTypes.bool,
    opportunitiesWithOutFilters: PropTypes.array.isRequired,
    initializeOpportunityBoard: PropTypes.func,
    initializeOpportunityBoardFirstInstance : PropTypes.func,
    setOpportunityBoardType: PropTypes.func,
    opportuntiyBoardType: PropTypes.string,
    opportunitiesNotInProgress: PropTypes.array.isRequired,
    opportunitiesForAdditionalTab: PropTypes.array
};

export default OpportunitiesNoPreferencesView
