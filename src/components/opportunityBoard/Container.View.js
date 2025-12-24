import "./index.scss";
import React, { Suspense, lazy, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Nav, Tabs, Tab, Row, Col, TabPane } from "react-bootstrap";
import { Translate } from "spotify-shared-web/localize";
import LoadingComponent from "spotify-shared-web/components/common/LoadingComponent";
import OutstandingTaskAlert from "../outstandingTaskAlert";
import { TabNames } from "../../constants";
import { StickyContainer, Sticky } from "react-sticky";
import SCREEN_CONFIG from "../../screensConfig";
import { Country, OpportunityStatus } from "spotify-shared/constants";
import RegistrationScore from "../registrationScore/RegistrationScore";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
const CURRENT_SCREEN = SCREEN_CONFIG.opportunities;




const OpportunitiesLazy = lazy(() => import("./opportunities"));
const OpportunitiesPreferenceLazy = lazy(() =>
    import("./opportunityPreferences")
);
const OpportunitiesNoPreferenceLazy = lazy(() =>
    import("./opportunityNoPreferences")
);
const ProgramsLazy = lazy(() => import("./inProgress"));

const opportunityBoardContainerView = ({
    activeTab,
    onToggle,
    opportunities,
    setOpportunityFilter,
    onOpportunitiesSortChange,
    opportunityFilterOptions,
    opportunitiesActiveFilter,
    onOpportunitiesFilterFieldChange,
    isOpportunitiesFetching,
    opportunitiesSortedBy,
    opportunitiesSortOptions,
    onClearFilter,
    opportunitiesFilterCounts,
    isMobile,
    isFilterOptionsFetching,
    getOpportunityBoardMessage,
    anyActiveOpportunityFilters,
    inProgress = [],
    hasPendingTasks,
    isLegacyUser,
    getOpportunityInProgressMessage,
    myPrograms = [],
    displayOpportunityBoardDisclaimer,
    onOpportunityLearnMoreClick,
    onInProgressResumeClick,
    isEnrolledProgramsFetching,
    showCompletedAgentTypeAlert,
    onDismissAgentTypeSuccessAlert,
    goToOpportunities,
    isScreeningAssessmentRequired,
    onGenerateScreeningAssessmentLink,
    isFirstInstance,
    initializeOpportunityBoardSecondInstance,
    isSecondInstance,
    isSecondInstanceAvailable,
    opportunitiesWithOutFilters,
    initializeOpportunityBoard,
    initializeOpportunityBoardFirstInstance,
    setOpportunityBoardType,
    opportuntiyBoardType,
    opportunitiesNotInProgress,
    harverAssessmentRequired,
    opportunitiesForBestMatchTab,
    opportunitiesForAdditionalTab,
    agentProfile,
    enrolledPrograms,
    screenConfig
}) => {
    const OnToggle = (tab) => {
        onToggle(tab);
        if (tab === TabNames.BestMatchTab) {
            initializeOpportunityBoardFirstInstance();
        }
        if (tab === TabNames.AdditionalOppurtunities) {
            initializeOpportunityBoardSecondInstance();
        }
    };

    const shouldShowWaitList = () => {
        return screenConfig.waitlistScreen.display &&
            !isEnrolledProgramsFetching &&
            !isOpportunitiesFetching &&
            inProgress.length === 0 &&
            myPrograms.length === 0 &&
            opportunities.every(opp => opp.enrollmentStatus === OpportunityStatus.Passed) &&
            !(
                (isLegacyUser === false && hasPendingTasks) ||
                (isScreeningAssessmentRequired &&
                    (isScreeningAssessmentRequired.assessmentRequired === true ||
                        isScreeningAssessmentRequired.assessmentFailed === true))
            )
    }

    return (
        <Translate>
            {({ translate }) => (
                <div className="col-skip">
                    {
                        shouldShowWaitList() ? (
                            <RegistrationScore />
                        ) : (
                            <div>
                                <div>
                                    {harverAssessmentRequired == true && isOpportunitiesFetching && <LoadingComponent hide={false} />}
                                </div>

                                <Row>
                                    <Col>
                                        <Tabs
                                            className="DashboardTabs"
                                            activeKey={activeTab}
                                            onSelect={(tab) => OnToggle(tab)}
                                        >

                                            {(harverAssessmentRequired == false &&
                                                (hasPendingTasks === false &&
                                                    isScreeningAssessmentRequired &&
                                                    isScreeningAssessmentRequired.assessmentRequired ===
                                                    false &&
                                                    isFirstInstance == false &&
                                                    isSecondInstance == false)) && (
                                                    <Tab
                                                        eventKey="Opportunities"
                                                        title={translate("Client Opportunities")}
                                                    >
                                                        <Suspense fallback={<LoadingComponent />}>
                                                            <OpportunitiesLazy
                                                                goToOpportunities={goToOpportunities}
                                                                onInProgressResumeClick={onInProgressResumeClick}
                                                                onOpportunityLearnMoreClick={
                                                                    onOpportunityLearnMoreClick
                                                                }
                                                                onClearFilter={onClearFilter}
                                                                onOpportunitiesFilterFieldChange={
                                                                    onOpportunitiesFilterFieldChange
                                                                }
                                                                onOpportunitiesSortChange={
                                                                    onOpportunitiesSortChange
                                                                }
                                                                setOpportunityFilter={setOpportunityFilter}
                                                                opportunityFilterOptions={opportunityFilterOptions}
                                                                opportunitiesActiveFilter={
                                                                    opportunitiesActiveFilter
                                                                }
                                                                opportunities={opportunities}
                                                                opportunitiesSortedBy={opportunitiesSortedBy}
                                                                opportunitiesSortOptions={opportunitiesSortOptions}
                                                                isOpportunitiesFetching={isOpportunitiesFetching}
                                                                opportunitiesFilterCounts={
                                                                    opportunitiesFilterCounts
                                                                }
                                                                isMobile={isMobile}
                                                                isFilterOptionsFetching={isFilterOptionsFetching}
                                                                getOpportunityBoardMessage={
                                                                    getOpportunityBoardMessage
                                                                }
                                                                anyActiveOpportunityFilters={
                                                                    anyActiveOpportunityFilters
                                                                }
                                                                displayOpportunityBoardDisclaimer={
                                                                    displayOpportunityBoardDisclaimer
                                                                }
                                                            />
                                                        </Suspense>
                                                    </Tab>
                                                )}

                                            {(isScreeningAssessmentRequired &&
                                                isScreeningAssessmentRequired.displayOpportunityTab === true &&
                                                isOpportunitiesFetching === false) &&
                                                (
                                                    <Tab
                                                        eventKey={TabNames.BestMatchTab}
                                                        title={translate(`${CURRENT_SCREEN}.bestMatch`)}
                                                    >
                                                        <Suspense fallback={<LoadingComponent />}>
                                                            <OpportunitiesPreferenceLazy
                                                                goToOpportunities={goToOpportunities}
                                                                onInProgressResumeClick={onInProgressResumeClick}
                                                                onOpportunityLearnMoreClick={
                                                                    onOpportunityLearnMoreClick
                                                                }
                                                                onClearFilter={onClearFilter}
                                                                onOpportunitiesFilterFieldChange={
                                                                    onOpportunitiesFilterFieldChange
                                                                }
                                                                onOpportunitiesSortChange={
                                                                    onOpportunitiesSortChange
                                                                }
                                                                setOpportunityFilter={setOpportunityFilter}
                                                                opportunityFilterOptions={opportunityFilterOptions}
                                                                opportunitiesActiveFilter={
                                                                    opportunitiesActiveFilter
                                                                }
                                                                opportunities={opportunities}
                                                                opportunitiesSortedBy={opportunitiesSortedBy}
                                                                opportunitiesSortOptions={opportunitiesSortOptions}
                                                                isOpportunitiesFetching={isOpportunitiesFetching}
                                                                opportunitiesFilterCounts={
                                                                    opportunitiesFilterCounts
                                                                }
                                                                isMobile={isMobile}
                                                                isFilterOptionsFetching={isFilterOptionsFetching}
                                                                getOpportunityBoardMessage={
                                                                    getOpportunityBoardMessage
                                                                }
                                                                anyActiveOpportunityFilters={
                                                                    anyActiveOpportunityFilters
                                                                }
                                                                displayOpportunityBoardDisclaimer={
                                                                    displayOpportunityBoardDisclaimer
                                                                }
                                                                isFirstInstance={isFirstInstance}
                                                                initializeOpportunityBoardSecondInstance={
                                                                    initializeOpportunityBoardSecondInstance
                                                                }
                                                                isSecondInstanceAvailable={
                                                                    isSecondInstanceAvailable
                                                                }
                                                                opportunitiesWithOutFilters={
                                                                    opportunitiesWithOutFilters
                                                                }
                                                                setOpportunityBoardType={setOpportunityBoardType}
                                                                opportuntiyBoardType={opportuntiyBoardType}
                                                                opportunitiesNotInProgress={
                                                                    opportunitiesNotInProgress
                                                                }
                                                                opportunitiesForBestMatchTab={opportunitiesForBestMatchTab}
                                                            />
                                                        </Suspense>
                                                    </Tab>
                                                )}

                                            {isScreeningAssessmentRequired &&
                                                isScreeningAssessmentRequired.displayOpportunityTab === true &&
                                                isOpportunitiesFetching === false &&
                                                (isSecondInstanceAvailable == true ||
                                                    isSecondInstance === true) && (
                                                    <Tab
                                                        eventKey={TabNames.AdditionalOppurtunities}
                                                        title={TabNames.AdditionalOppurtunities}
                                                    >

                                                        <Suspense fallback={<LoadingComponent />}>
                                                            <OpportunitiesNoPreferenceLazy
                                                                goToOpportunities={goToOpportunities}
                                                                onInProgressResumeClick={onInProgressResumeClick}
                                                                onOpportunityLearnMoreClick={
                                                                    onOpportunityLearnMoreClick
                                                                }
                                                                onClearFilter={onClearFilter}
                                                                onOpportunitiesFilterFieldChange={
                                                                    onOpportunitiesFilterFieldChange
                                                                }
                                                                onOpportunitiesSortChange={
                                                                    onOpportunitiesSortChange
                                                                }
                                                                setOpportunityFilter={setOpportunityFilter}
                                                                opportunityFilterOptions={
                                                                    opportunityFilterOptions
                                                                }
                                                                opportunitiesActiveFilter={
                                                                    opportunitiesActiveFilter
                                                                }
                                                                opportunities={opportunities}
                                                                opportunitiesSortedBy={opportunitiesSortedBy}
                                                                opportunitiesSortOptions={
                                                                    opportunitiesSortOptions
                                                                }
                                                                isOpportunitiesFetching={isOpportunitiesFetching}
                                                                opportunitiesFilterCounts={
                                                                    opportunitiesFilterCounts
                                                                }
                                                                isMobile={isMobile}
                                                                isFilterOptionsFetching={isFilterOptionsFetching}
                                                                getOpportunityBoardMessage={
                                                                    getOpportunityBoardMessage
                                                                }
                                                                anyActiveOpportunityFilters={
                                                                    anyActiveOpportunityFilters
                                                                }
                                                                displayOpportunityBoardDisclaimer={
                                                                    displayOpportunityBoardDisclaimer
                                                                }
                                                                isFirstInstance={isFirstInstance}
                                                                initializeOpportunityBoardSecondInstance={
                                                                    initializeOpportunityBoardSecondInstance
                                                                }
                                                                isSecondInstance={isSecondInstance}
                                                                opportunitiesWithOutFilters={
                                                                    opportunitiesWithOutFilters
                                                                }
                                                                initializeOpportunityBoard={
                                                                    initializeOpportunityBoard
                                                                }
                                                                initializeOpportunityBoardFirstInstance={
                                                                    initializeOpportunityBoardFirstInstance
                                                                }
                                                                setOpportunityBoardType={setOpportunityBoardType}
                                                                opportuntiyBoardType={opportuntiyBoardType}
                                                                opportunitiesNotInProgress={
                                                                    opportunitiesNotInProgress
                                                                }
                                                                opportunitiesForAdditionalTab={opportunitiesForAdditionalTab}
                                                            />
                                                        </Suspense>

                                                    </Tab>
                                                )}

                                            {
                                                ((inProgress.length > 0 && isOpportunitiesFetching === false) ||
                                                    (myPrograms.length > 0 && isOpportunitiesFetching === false)) && (
                                                    <Tab
                                                        eventKey="In Progress"
                                                        title={translate(`${CURRENT_SCREEN}.myPrograms`)}
                                                    >
                                                        {activeTab === "In Progress" && (
                                                            <Suspense fallback={<LoadingComponent />}>
                                                                <ProgramsLazy
                                                                    goToOpportunities={goToOpportunities}
                                                                    onInProgressResumeClick={onInProgressResumeClick}
                                                                    onOpportunityLearnMoreClick={
                                                                        onOpportunityLearnMoreClick
                                                                    }
                                                                    myPrograms={myPrograms}
                                                                    opportunities={inProgress}
                                                                    isOpportunitiesFetching={isOpportunitiesFetching}
                                                                    isMobile={isMobile}
                                                                    getOpportunityInProgressMessage={
                                                                        getOpportunityInProgressMessage
                                                                    }
                                                                />
                                                            </Suspense>
                                                        )}
                                                    </Tab>
                                                )
                                            }
                                        </Tabs>
                                    </Col>
                                </Row>

                                <div>
                                    {((isLegacyUser === false && hasPendingTasks) ||
                                        (isScreeningAssessmentRequired &&
                                            (isScreeningAssessmentRequired.assessmentRequired === true || isScreeningAssessmentRequired.assessmentFailed === true))) && (
                                            <OutstandingTaskAlert
                                                showCompletedAgentTypeAlert={
                                                    false /*showCompletedAgentTypeAlert*/
                                                }
                                                onDismissAgentTypeSuccessAlert={onDismissAgentTypeSuccessAlert}
                                                isLegacyUser={isLegacyUser}
                                                hasPendingTasks={hasPendingTasks}
                                                isScreeningAssessmentRequired={isScreeningAssessmentRequired}
                                                onGenerateScreeningAssessmentLink={
                                                    onGenerateScreeningAssessmentLink
                                                }
                                            />
                                        )}
                                </div>
                            </div>

                        )
                    }

                </div>
            )}
        </Translate>
    );
};

opportunityBoardContainerView.propTypes = {
    activeTab: PropTypes.string.isRequired,
    onToggle: PropTypes.func.isRequired,
    opportunities: PropTypes.array.isRequired,
    setOpportunityFilter: PropTypes.func.isRequired,
    onOpportunitiesSortChange: PropTypes.func.isRequired,
    opportunityFilterOptions: PropTypes.array,
    opportunitiesActiveFilter: PropTypes.object,
    isOpportunitiesFetching: PropTypes.bool,
    opportunitiesSortedBy: PropTypes.string,
    onClearFilter: PropTypes.func,
    opportunitiesFilterCounts: PropTypes.object,
    isFirstInstance: PropTypes.bool,
    initializeOpportunityBoardSecondInstance: PropTypes.func,
    isSecondInstance: PropTypes.bool,
    isSecondInstanceAvailable: PropTypes.bool,
    opportunitiesWithOutFilters: PropTypes.array.isRequired,
    initializeOpportunityBoard: PropTypes.func,
    initializeOpportunityBoardFirstInstance: PropTypes.func,
    setOpportunityBoardType: PropTypes.func,
    opportuntiyBoardType: PropTypes.func,
    opportunitiesNotInProgress: PropTypes.array.apply.isRequired,
    harverAssessmentRequired: PropTypes.bool,
    opportunitiesForBestMatchTab: PropTypes.array,
    opportunitiesForAdditionalTab: PropTypes.array,
    agentProfile: PropTypes.object,
};

export default opportunityBoardContainerView;
