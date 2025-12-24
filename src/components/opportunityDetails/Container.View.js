
import './index.scss';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React, { Suspense, lazy, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Nav, Tabs, Tab, Row, Col, ButtonGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Translate } from 'spotify-shared-web/localize'
import LoadingComponent from 'spotify-shared-web/components/common/LoadingComponent';
import { connect } from "react-redux";
import CardConnect from "spotify-shared-web/components/opportunities/Card"
import Banner from "spotify-shared-web/components/opportunities/Card/banner"
import OpportunityDetailAlerts from "./OpportunityDetailAlerts"
import OpportunityMarketingBanner from "./OpportunityMarketingBanner"
import OpportunityDetailTitle from "./OpportunityDetailTitle"
import classNames from "classnames";
import OpportunityVideo from "./OpportunityVideo"
import OpportunityMatch from "./OpportunityMatch"
import OpportunityRevenue from "./OpportunityRevenue"
import OpportunityServicingInfo from "./OpportunityServicingInfo"
import OpportunityCourseInfo from "./OpportunityCourseInfo"
import OpportunityAssessments from "./OpportunityAssessments"
import OpportunityEquipment from "./OpportunityEquipment"
import OutstandingTaskAlert from "../outstandingTaskAlert"
import Buttonspotify from 'spotify-shared-web/components/common/Button';
import EnrollCourseModal from "spotify-shared-web/components/opportunities/EnrollCourseModal"
import GetAppIcon from '@material-ui/icons/GetApp';
import HeadsetIcon from '@material-ui/icons/Headset';
import warningIcon from '../../assets/images/warning-red.svg';
import { EnrollmentModuleNames } from 'spotify-shared/constants';
import SCREEN_CONFIG from "../../screensConfig";
import ConfirmModal from "spotify-shared-web/components/common/ConfirmModal";
const CURRENT_SCREEN = SCREEN_CONFIG.opportunitiesDetails;


// EnrollmentModuleNames

const Card = CardConnect(connect)


const opportunityDetailsContainerView = ({
    isUserBusinessOwner,
    isFetching,
    relatedOpportunities,
    onLearnMoreClick,
    onInProgressResumeClick,
    onEnrollCourseClick,
    opportunity,
    hasUserCompletedRegistration,
    showEnrollNowBtn,
    isEnrollmentInprocess,
    onHideEnrollCourseModal,
    shouldShowEnrollCourseModal,
    isLegacyUser,
    hasPendingTasks,
    onDownloadPDF,
    disableEnrollNowBtn,
    onSubmitClick,
    opportunityEnrolling,
    isMobile,
    toggleRelatedOpportunities,
    areRelatedOpportunitiesVisible,
    enrollmentAssessments,
    showCompletedAgentTypeAlert,
    onDismissAgentTypeSuccessAlert,
    agentsCountry,
    eligiblity,
    onHideConflictModal,
    checkforClassConflict,
    conflictCheckData
}) => {

    var mobile = isMobile();
    var rvisible = areRelatedOpportunitiesVisible;




    if (isFetching)
        return <LoadingComponent />

    return <Translate>
        {({ translate }) => (<Fragment>
            {eligiblity.name === "Conflicting" && (
                <ConfirmModal
                    title={`${translate(`${CURRENT_SCREEN}.Conflicting Peak season`)}`}
                    isVisible={true}
                    onHide={onHideConflictModal}
                    hideCancel={true}
                    hideOk={true}
                    closeButton={true}
                >
                    <p style={{ marginLeft: "10px" }}>
                        {`${translate(`${CURRENT_SCREEN}.ConflictError`)}`}{" "}
                    </p>
                </ConfirmModal>
            )}
            <OutstandingTaskAlert
                showCompletedAgentTypeAlert={false/*showCompletedAgentTypeAlert*/}
                onDismissAgentTypeSuccessAlert={onDismissAgentTypeSuccessAlert}
                isLegacyUser={isLegacyUser}
                hasPendingTasks={hasPendingTasks} />
            <EnrollCourseModal
                opportunity={opportunity}
                title={translate(`${CURRENT_SCREEN}.enrollTitle`)}
                isModalVisible={shouldShowEnrollCourseModal}
                onSubmit={onSubmitClick}
                onHideModal={onHideEnrollCourseModal}
                onCancel={onHideEnrollCourseModal}
                opportunityEnrolling={opportunityEnrolling}
                agentsCountry={agentsCountry}
                doesDepositStepExist={enrollmentAssessments.filter((e) => e.assessmentModuleName == EnrollmentModuleNames.DEPOSIT)}
                checkforConflict={checkforClassConflict}
                isConflictDataFetching={conflictCheckData}
            />
            <OpportunityDetailAlerts 
                opportunity={opportunity}
                checkforConflict={checkforClassConflict}
                isConflictDataFetching={conflictCheckData}
            />
            <Banner hideIfNoBanner={true} hideIneligible={true} {...opportunity} />
            <Row className="opportunityDetailsContainer mt-4">
                <Col lg={6} md={6} sm={12} xs={12}
                    className="" style={{ display: "flex", flexDirection: "column" }}>


                    <div
                        style={(mobile === true) ?
                            { "textCenter": "center", "textAlign": "center" }
                            :
                            {}
                        }>
                        <OpportunityDetailTitle {...opportunity} />
                        <p>
                            {opportunity.description}
                        </p>
                    </div>

                    <div
                        style={(mobile === true) ?
                            { "textCenter": "center", "textAlign": "center" }
                            :
                            { "marginTop": "auto" }
                        }>
                        {showEnrollNowBtn && opportunity.availableSchedules.length > 0 &&
                            <OverlayTrigger
                                placement={'top'}
                                overlay={<Tooltip>{translate(`${CURRENT_SCREEN}.enroll`)}</Tooltip>}>
                                <Buttonspotify
                                    style={(mobile === true) ?
                                        { "padding": "20px" }
                                        :
                                        { "float": "right", "marginLeft": "10px", "height": "38px" }
                                    }
                                    disabled={disableEnrollNowBtn}
                                    onClick={onEnrollCourseClick}
                                    isSubmitting={eligiblity.isSubmitting}
                                >
                                    {translate(`${CURRENT_SCREEN}.enroll`)}
                                </Buttonspotify>
                            </OverlayTrigger>
                        }

                        {(mobile === true) ?
                            <br />
                            : ""}

                        {(mobile === true) ?
                            <br />
                            : ""}


                        {opportunity._pdfLink != null &&
                            <OverlayTrigger
                                placement={'left'}
                                overlay={<Tooltip>{translate(`${CURRENT_SCREEN}.opportunityAnnouncement`)}</Tooltip>}>
                                <Buttonspotify
                                    style={(mobile === true) ?
                                        { "padding": "20px" }
                                        :
                                        { "float": "right", "padding": "5px" }
                                    }

                                    variant="outline-primary"
                                    onClick={() => onDownloadPDF(opportunity._pdfLink)}>
                                    <GetAppIcon /> {translate(`${CURRENT_SCREEN}.opportunityAnnouncement`)}
                                </Buttonspotify>
                            </OverlayTrigger>
                        }

                        {(mobile === true) ?
                            <br />
                            : ""}

                        {(mobile === true) ?
                            <br />
                            : ""}


                        {isLegacyUser === false && opportunity._inProgress === false && hasPendingTasks &&
                            <div className="mt-4"
                                style={{ "float": "right", "clear": "both" }}>
                                <img className=""
                                    style={{

                                        "height": "25px"
                                    }}
                                    src={warningIcon} alt='' />
                                {translate(`${CURRENT_SCREEN}.completeProfile`)}
                            </div>
                        }
                    </div>


                </Col>
                <Col lg={6} md={6} sm={12} xs={12} className="">
                    {opportunity._videoLink && <OpportunityVideo source={opportunity._videoLink.sourceURL} />}
                </Col>

                <Col xs={12} className="theDetails mt-4">
                    <Col xs={12} className=" mt-3">
                        <Row>
                            <Col lg={3} md={6} sm={12} xs={12}>
                                <OpportunityRevenue
                                    isUserBusinessOwner={isUserBusinessOwner}
                                    {...opportunity} />
                            </Col>
                            <Col lg={3} md={6} sm={12} xs={12}>
                                <OpportunityServicingInfo
                                    onDownloadPDF={onDownloadPDF}
                                    {...opportunity} />
                            </Col>
                            <Col lg={3} md={6} sm={12} xs={12}>
                                <OpportunityCourseInfo
                                    isEnrollmentInprocess={isEnrollmentInprocess}
                                    {...opportunity} />
                            </Col>
                            <Col lg={3} md={6} sm={12} xs={12}>
                                <OpportunityAssessments enrollmentAssessments={enrollmentAssessments} />
                                <OpportunityEquipment  {...opportunity} />
                            </Col>
                        </Row>
                    </Col>
                </Col>




                <div className="mt-4 mb-4 col-lg-10 offset-lg-1 col-md-12 col-sm-12 col-xs-12 relatedOpportunitiesContainer">

                    {(mobile === true) &&
                        <div className="spotify-card primary" onClick={() => mobile && toggleRelatedOpportunities()}>
                            <div className="h2"  >
                                {translate(`${CURRENT_SCREEN}.otherPreferences`)}
                                <span className="float-right pull-right">
                                    {rvisible === false && <KeyboardArrowDownIcon />}
                                    {rvisible === true && <KeyboardArrowUpIcon />}
                                </span>
                            </div>

                        </div>
                    }

                    {(mobile === false || rvisible === true) &&
                        (
                            <div className="mt-4 col-12 relatedOpportunitiesContainer">
                                {relatedOpportunities.length > 0 && mobile === false &&
                                    <h2 className="relatedOpportunitiesTitle">{translate(`${CURRENT_SCREEN}.otherPreferences`)}</h2>
                                }
                                <Row className="mt-4">
                                    {relatedOpportunities.map((o, key) => <Col key={key} xs={12} sm={12} md={6} lg={4} xl={4} className="">
                                        <Card
                                            {...o}
                                            onInProgressResumeClick={onInProgressResumeClick}
                                            onLearnMoreClick={onLearnMoreClick} />
                                    </Col>)
                                    }
                                </Row>
                            </div>
                        )
                    }
                </div>






            </Row>



        </Fragment>)}
    </Translate>;


}

opportunityDetailsContainerView.propTypes = {

};

export default (opportunityDetailsContainerView)
