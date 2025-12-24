import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Nav, Tabs, Tab, Row, Col, TabPane } from 'react-bootstrap';
import { Translate } from 'spotify-shared-web/localize'
import Loading from "spotify-shared-web/components/common/LoadingComponent"
import Button from "spotify-shared-web/components/common/Button"
import * as  opportunitiesWidgetActions from '../../actions/opportunitiesWidget';
import * as  opportunitiesWidgetSelector from '../../selectors/opportunitiesWidget';
import * as  enrolledProgramsSelector from 'spotify-shared/selectors/enrolledPrograms';

import { getBaseUrl } from "spotify-shared/api/helpers/request"
import CardConnect from "spotify-shared-web/components/opportunities/Card"
import EnrolledProgramCardConnect from "spotify-shared-web/components/opportunities/EnrolledProgramCard"


const Card = CardConnect(connect);
const EnrolledProgramCard = EnrolledProgramCardConnect(connect);


class OpportunitiesWidget extends Component {
    constructor(props) {
        super(props);


        this.onTabToggle = this.onTabToggle.bind(this);
        this.onInProgressResumeClick = this.onInProgressResumeClick.bind(this);
        this.onOpportunityLearnMoreClick = this.onOpportunityLearnMoreClick.bind(this);
        this.doesOpportunityHaveProgram = this.doesOpportunityHaveProgram.bind(this);
        this.onUpdatePreferencesClick = this.onUpdatePreferencesClick.bind(this);
        this.onViewAllOpportuntiesClick = this.onViewAllOpportuntiesClick.bind(this);
        this.goToOpportunities = this.goToOpportunities.bind(this);



    }
    componentDidMount() {

        this.props.initializeOpportunityWidget(this.props.agentProfile);

    }
    goToOpportunities() {
        this.onTabToggle('Opportunities');
    }
    onTabToggle(tab) {
        this.props.setTab(tab);
    }

    getDomainHelper() {
        let apiBaseUri = getBaseUrl();
        let domain = apiBaseUri.substr(0, apiBaseUri.indexOf(".com/") + 4)
        return domain
    }
    onOpportunityLearnMoreClick(id) {
        let domain = this.getDomainHelper();
        window.location.href = `${domain}/opportunity/${id}`;
    }

    onInProgressResumeClick(id, enrollmentId) {
        let domain = this.getDomainHelper();
        window.location.href = `${domain}/opportunity/${id}/enrollment-prerequisites/${enrollmentId}`;
    }



    doesOpportunityHaveProgram(opportunity) {
        if (!opportunity || !this.props.enrolledPrograms) return false;
        let programCrmId = opportunity.programCrmId;
        return this.props.enrolledPrograms[programCrmId] != null;
    }

    onViewAllOpportuntiesClick() {
        let domain = this.getDomainHelper();
        window.location.href = `${domain}/opportunities/Opportunities`;
    }

    onUpdatePreferencesClick() {
        let domain = this.getDomainHelper();
        window.location.href = `${domain}/my-preferences`;
    }
    render() {

        const {
            onInProgressResumeClick,
            onOpportunityLearnMoreClick,
            doesOpportunityHaveProgram,
            onViewAllOpportuntiesClick,
            onUpdatePreferencesClick,
            goToOpportunities
        } = this;

        const {
            activeTab,
            inProgress,
            opportunities,
            isFetching,
            myPrograms
        } = this.props;


        if (isFetching)
            return <Loading />

        return <Translate>
            {({ translate }) =>
                <div className="OpportunitiesWidgetTabsWrapper">
                    <Tabs transition={false} className="DashboardTabs" activeKey={activeTab} onSelect={tab => this.onTabToggle(tab)}>

                        <Tab eventKey="Opportunities" title={translate("Opportunities")}>
                            {activeTab === "Opportunities" &&
                                <Fragment>
                                    <Col className="mt-4">
                                        <h4> Looking for a new opportunity?</h4>
                                    Based on your preferences these opportunities may be a great fit for you!
                                   <div className="mt-3">
                                            <Button variant="orange" size="" onClick={onViewAllOpportuntiesClick}>View All Opportunities</Button>
                                            <a onClick={onUpdatePreferencesClick} className="link pointer btn btn-link">{translate('Update Preferences')}</a>
                                        </div>
                                    </Col>
                                    <Row className="tabContent row mb-5 mt-5">
                                        {opportunities.map((o, key) => <Col key={key} xs={12} sm={12} md={6} lg={4} xl={4} className="">
                                            <Card {...o}
                                                goToOpportunities={goToOpportunities}
                                                onInProgressResumeClick={onInProgressResumeClick}
                                                onLearnMoreClick={onOpportunityLearnMoreClick} />
                                        </Col>)
                                        }
                                    </Row>
                                </Fragment>
                            }
                        </Tab>
                        {((inProgress.length > 0 || myPrograms.length > 0)) &&
                            <Tab eventKey="In Progress" title={translate("My Programs")}>
                                {activeTab === "In Progress" &&
                                    <Fragment>
                                        <Col className="mt-4">
                                        <p> The below opportunities are currently in the enroll or certification process. Please see below calls to action.</p>
                                        </Col>
                                        <Row className="tabContent row mb-5 mt-5">
                                            {inProgress.map((o, key) => <Col key={key} xs={12} sm={12} md={6} lg={4} xl={4} className="">
                                                <Card
                                                    {...o}
                                                    goToOpportunities={goToOpportunities}
                                                    onInProgressResumeClick={onInProgressResumeClick}
                                                    onLearnMoreClick={onOpportunityLearnMoreClick}
                                                    doesOpportunityHaveProgram={doesOpportunityHaveProgram}
                                                />
                                            </Col>)}
                                            {myPrograms.map((program, key) =>
                                                <Col key={key} xs={12} sm={12} md={6} lg={4} xl={4} className="">
                                                    <EnrolledProgramCard enrolledProgram={program} />
                                                </Col>)}
                                        </Row>
                                    </Fragment>
                                }
                            </Tab>
                        }
                    </Tabs>
                </div>}
        </Translate>;
    }
}


//#region MapStateToProps
function mapStateToProps(state, props) {
    const activeTab = opportunitiesWidgetSelector.getActiveTab(state);
    const inProgress = opportunitiesWidgetSelector.inProgress(state);
    const opportunities = opportunitiesWidgetSelector.top3(state);
    const isFetching = opportunitiesWidgetSelector.isFetching(state);

    const enrolledPrograms = enrolledProgramsSelector.getData(state);
    const enrollmentToCancel = enrolledProgramsSelector.getEnrollmentToCancel(state);
    const myPrograms = enrolledProgramsSelector.getMyPrograms(state);

    return {
        activeTab,
        agentProfile: state.agentProfile,
        inProgress,
        opportunities,
        enrolledPrograms,
        enrollmentToCancel,
        isFetching,
        myPrograms

    };
}
//#endregion 

//#region MapDispatchToProps
const mapDispatchToProps = {
    setTab: opportunitiesWidgetActions.setTab,
    initializeOpportunityWidget: opportunitiesWidgetActions.initializeOpportunityWidget
};
//#endregion

//#region Export Component
export default connect(
    mapStateToProps,
    { ...mapDispatchToProps },
)(OpportunitiesWidget);
//#endregion
