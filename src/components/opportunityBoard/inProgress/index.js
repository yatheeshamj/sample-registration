import './index.scss';
//framework & 3rd parties
import React, { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Translate } from 'spotify-shared-web/localize'
import PropTypes from 'prop-types';
import CardConnect from "spotify-shared-web/components/opportunities/Card"
import EnrolledProgramCardConnect from "spotify-shared-web/components/opportunities/EnrolledProgramCard"
import Loading from 'spotify-shared-web/components/common/LoadingComponent';
import { connect } from "react-redux";

const Card = CardConnect(connect);
const EnrolledProgramCard = EnrolledProgramCardConnect(connect);


const programsView = (
    {
        opportunities,
        isOpportunitiesFetching,
        isEnrolledProgramsFetching,
        isMobile,
        getOpportunityInProgressMessage,
        doesOpportunityHaveProgram,
        onOpportunityLearnMoreClick,
        onInProgressResumeClick,
        myPrograms,
        goToOpportunities
    }
) => {
    return <Translate>
        {({ translate }) =>
            <Row id="ProgramBoardContainer">
                <Col xs={12} id="ProgramBoardContent" >
                    <p>{(getOpportunityInProgressMessage())}</p>
                    {(isOpportunitiesFetching || isEnrolledProgramsFetching) && <Loading />}
                    <Row>
                        {opportunities.map((o, key) =>
                            <Col key={key} xs={12} sm={12} md={6} lg={4} xl={3} className="">
                                <Card
                                    {...o}
                                    openOnPortal={o.openOnPortal}
                                    step={o.step}
                                    stepAvailableSince={o.stepAvailableSince}
                                    enrollmentStatusDate={o.enrollmentStatusDate}
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
                </Col>
            </Row>
        }
    </Translate>;
}
programsView.propTypes = {
    opportunities: PropTypes.array.isRequired,
    isOpportunitiesFetching: PropTypes.bool,
    isMobile: PropTypes.bool
};

export default programsView
