import "./card.scss"
import React, { Fragment } from 'react';
import formHelpers from 'spotify-shared/helpers/formHelpers'
import { Translate } from '../../../localize';
import CourseCountDown from "../CourseCountDown";
import { getDateDifferenceInDays } from "spotify-shared/helpers/utils"
import { OpportunityStatus } from "spotify-shared/constants"
import Star from '@material-ui/icons/Star';
import StarOutlined from '@material-ui/icons/StarBorderOutlined';
import { getTimeZoneForCountryByCurrency } from "spotify-shared/helpers/country"
import moment from "moment";
import SCREEN_CONFIG from "../../../../src/screensConfig";
import { connect } from "react-redux";
import * as enrollmentPrerequisitesPageSelector from "spotify-shared/selectors/enrollmentPrerequisitesPage";
import * as opportunitiesSelector from "spotify-shared/selectors/opportunities";
import * as enrollmentStepsSelector from "spotify-shared/selectors/enrollmentSteps";
import { retrieveGlobalParameter } from "spotify-shared/actions/globalParameters";
import { getGlobalParameterByString } from "spotify-shared/selectors/globalParameters";
import { GlobalParameterTypes } from "spotify-shared/constants";
import * as agentSelector from "spotify-shared/selectors/agentProfile";
import { typeOf } from "react-read-more-read-less";

const CURRENT_SCREEN = SCREEN_CONFIG.opportunitiesCard;


const InProgressDetails = ({
    hideDates = false,
    classStartDate,
    registrationDueDate,
    courseEndDate,
    percentEnrollmentComplete,
    enrollmentStatus,
    _isCertificationPassed,
    _inProgress,
    currencyCode,
    isFinalized,
    _hasSelfPaced,
    _hasVirtualClassroom,
    primaryClassSchedule,
    onGenerateCrowdhub,
    onGenerateSelfPaced,
    onGenerateVirtualClassroom,
    _pdfLink,
    onDownloadPDF,
    programCrmId,
    courseDuration,
    enrollmentStatusReasonDisplayName,
    enrolledProgram,
    commitmentAdherencePercentage,
    currentOrNextSlotDateTimeProgram,
    overallStarRating = 0,
    _isClassAccessDisabled,
    NoShowWindow,
    NoShowAutoDrop,
    NoShowReinstate,
    step,
    isSowReady,
    goliveDate,
    xDayLimit,
    openOnPortal,
    stepAvailableSince,
    enrollmentStatusDate,
    isAgentFromUSA

}) => {
    
    const timeZone = getTimeZoneForCountryByCurrency(currencyCode);
    let overallStarRatingAsArray = Array.apply(null, new Array(Number(overallStarRating)))
    let blankStartsArray = Array.apply(null, new Array(3 - overallStarRatingAsArray.length))

    const noShowAlertText = () => {
        //converting to US time zone 
        let currentDate;
        if (currencyCode != "£") {
            // currentDate=new Date().toLocaleString('en-US', {
            //     timeZone: 'America/New_York',
            //   })
            console.log("calculating Current Date", new Date())
            currentDate = moment().tz("America/New_York").format();
            console.log(currentDate, "calculated Current Date")
            currentDate = new Date(currentDate).getTime()
            console.log(currentDate, "calculated CUrrent date in ms")
        }
        else {
            //  currentDate=new Date().toLocaleString('en-GB', {
            //     timeZone: 'Europe/London',
            //   })
            //early open for UK since it is 5hr ahead of EST Time
            currentDate = moment().tz("Europe/London").format();
            console.log(currentDate, "calculated Current Date")
            const temp1 = moment().tz("Europe/London").utcOffset()
            const temp2 = moment().tz("America/New_York").utcOffset()
            console.log(temp1, temp2, "Timezones")

            //get the time difference between Newyork and London
            currentDate = new Date(currentDate).getTime() + (temp1 - temp2) * 60 * 1000
            console.log(currentDate, "calculated CUrrent date in ms")
        }

        const classStart = new Date(primaryClassSchedule.classStartDateTime).getTime()
        const window = parseInt(NoShowWindow) * 24 * 60 * 60 * 1000   //X days class start date 
        const closewindow = parseInt(NoShowAutoDrop) * 24 * 60 * 60 * 1000
        const reinstatewindow = parseInt(NoShowReinstate) * 24 * 60 * 60 * 1000

        const calculatedWindowCloseDate = new Date()

        // goliveDate, xDayLimit, openOnPortal, step, stepAvailableSince
        //CCD FLOW Conditions starts
        console.log("goliveDate xDayLimit openOnPortal step stepAvailableSince isAgentFromUSA -->", goliveDate, xDayLimit, openOnPortal, step, stepAvailableSince, isAgentFromUSA, typeof openOnPortal);
        // Convert both to Date objects (or timestamps)
        let goliveTimestamp = new Date(goliveDate).toISOString().slice(0, 10);
        let openOnPortalTimestamp = new Date(openOnPortal).toISOString().slice(0, 10);
        const stepAvailableSince_millisec = new Date(stepAvailableSince).getTime();
        const enrollmentStatusDate_millisec = new Date(enrollmentStatusDate).getTime();

        console.log("goliveTimestamp,openOnPortalTimestamp--->", goliveTimestamp, openOnPortalTimestamp);

        console.log("currentDate  stepAvailableSince--->", currentDate, stepAvailableSince);

        //OLD FLow
        if ((openOnPortalTimestamp <= goliveTimestamp && openOnPortal != "0001-01-01T00:00:00" && isAgentFromUSA) || (!isAgentFromUSA))  {
            if ((classStart - currentDate) <= window) {
                if ((classStart - currentDate) >= closewindow) {
                    //deposit window open
                    console.log("Deposit window is open", currentDate, classStart)
                    calculatedWindowCloseDate.setTime(classStart - closewindow)
                    return `Please pay now. Window closes on ${formHelpers.formatDateTime(calculatedWindowCloseDate)} ${timeZone}`

                }
                else if ((classStart - currentDate) >= reinstatewindow) {
                    //reinstate scenario
                    console.log("User reinstated Deposit window is open", currentDate, classStart)
                    calculatedWindowCloseDate.setTime(classStart - reinstatewindow)
                    return `Please pay immedidately. Window closes on ${formHelpers.formatDateTime(calculatedWindowCloseDate)}  ${timeZone}`;

                }
                else {
                    //window closed scenrio
                    calculatedWindowCloseDate.setTime(classStart);
                    return `Please pay now .Window closes on ${formHelpers.formatDateTime(calculatedWindowCloseDate)} ${timeZone}`;

                }

            }
            else {
                console.log("Deposit window is closed", currentDate, classStart)
                calculatedWindowCloseDate.setTime(classStart - window) //here it is open date
                const calculatedEndDate = new Date()
                calculatedEndDate.setTime(classStart - closewindow)
                return `Payment window opens on ${formHelpers.formatDateTime(calculatedWindowCloseDate)} and closes on ${formHelpers.formatDateTime(calculatedEndDate)}  ${timeZone}`
            }

        } else if ((openOnPortalTimestamp > goliveTimestamp || openOnPortal === "0001-01-01T00:00:00") && isAgentFromUSA) {
            const millisInDay = 1000 * 60 * 60 * 24;
            const todayDateOnly = new Date(new Date(currentDate).setHours(0, 0, 0, 0));
            const stepDateOnly = new Date(new Date(stepAvailableSince).setHours(0, 0, 0, 0));
            const daysDiff = (todayDateOnly - stepDateOnly) / millisInDay;

            //console.log("todayDate, StepDate, daysDiff:", todayDateOnly, stepDateOnly, daysDiff);

            if (daysDiff <= xDayLimit) { //currentDate - StepAvailableDate >= XDayLimit
                //deposit window open
                const today = new Date();
                // const availableOnDate = new Date(stepAvailableSince);

                // Calculate the deadline date
                const deadlineDate = new Date(stepAvailableSince_millisec + xDayLimit * millisInDay);

                calculatedWindowCloseDate.setTime(deadlineDate);
                console.log("Deposit window is open NewFLow", currentDate, classStart)
                return `Please pay now. Window closes on ${formHelpers.formatDate(calculatedWindowCloseDate)}`

            }
            else if (enrollmentStatusDate > stepAvailableSince) {
                const millisInDay = 1000 * 60 * 60 * 24;
                // Calculate the deadline date
                const deadlineDate = new Date(enrollmentStatusDate_millisec + xDayLimit * millisInDay);

                calculatedWindowCloseDate.setTime(deadlineDate);
                //reinstate scenario
                console.log("User reinstated Deposit window is open NewFLow", currentDate, classStart)

                return `Please pay immedidately. Window closes on ${formHelpers.formatDate(calculatedWindowCloseDate)}`;

            }
            else {
                //window closed scenrio
                calculatedWindowCloseDate.setTime(classStart);
                console.log(classStart, timeZone, "----Swaroop NewFLow");
                return `Please pay now .Window closes on ${formHelpers.formatDate(calculatedWindowCloseDate)}`;

            }
        }

    }

    return <Translate>
        {({ translate }) => <Fragment>


            <table className="program-board_top__table table table-responsive table-borderless table-sm">
                <tbody>
                    {enrolledProgram && enrolledProgram.isCSPContracted &&
                        <tr>
                            <th scope="row" className="text-muted">{translate('My Performance')}: </th>
                            <td><span className="mr-2">{commitmentAdherencePercentage || 0}% CA</span>
                                <span>
                                    {overallStarRatingAsArray.map((x, i) => <Star key={i} />)}
                                    {blankStartsArray.map((x, i) => <StarOutlined key={i} />)}
                                </span>

                            </td>
                        </tr>
                    }
                    {currentOrNextSlotDateTimeProgram && enrolledProgram && enrolledProgram.isCSPContracted &&
                        <tr>
                            <th scope="row" className="text-muted">{translate('Next Interval')}: </th>
                            <td><span className="mr-2">{formHelpers.formatDateTimeInterval(currentOrNextSlotDateTimeProgram)}</span>
                            </td>
                        </tr>
                    }

                    {percentEnrollmentComplete < 100 &&
                        <tr>
                            <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.enrollment`)}:</th>
                            <td> {percentEnrollmentComplete}  % {translate(`${CURRENT_SCREEN}.complete`)} </td>
                        </tr>
                    }
                        
                    {isSowReady && isAgentFromUSA && <tr>{translate(`${CURRENT_SCREEN}.SOWready`)}</tr> }

                    {hideDates === false && (enrollmentStatus === OpportunityStatus.Interested || enrollmentStatus === OpportunityStatus.Client_Qualified) &&
                        <Fragment>
                            <tr>
                                <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.deadline`)}:</th>

                                <td>

                                    {primaryClassSchedule && <Fragment>
                                        {formHelpers.formatDate(primaryClassSchedule.registrationDueDate)}
                                    </Fragment>}

                                    {!primaryClassSchedule && <Fragment>{formHelpers.formatDate(registrationDueDate)}
                                    </Fragment>}

                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-muted"></th>
                                <td>

                                    {primaryClassSchedule && <Fragment>
                                        <CourseCountDown classStartDate={primaryClassSchedule.classStartDateTime} registrationDueDate={primaryClassSchedule.registrationDueDate} />

                                    </Fragment>}

                                    {!primaryClassSchedule && <Fragment>
                                        <CourseCountDown classStartDate={classStartDate} registrationDueDate={registrationDueDate} />
                                    </Fragment>}

                                </td>
                            </tr>
                        </Fragment>
                    }

                    {hideDates === false && (enrollmentStatus !== OpportunityStatus.Passed) &&
                        <Fragment>
                            <tr>
                                <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.courseStart`)}:</th>
                                <td> {formHelpers.formatDate(classStartDate)} </td>
                            </tr>
                            {primaryClassSchedule && step && (step.search(/deposit/i) != -1) && NoShowAutoDrop && NoShowReinstate && NoShowWindow && <tr>
                                <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.noShowDeposit`)}:</th>
                                <td> {noShowAlertText()} </td>
                            </tr>}
                            <tr>
                                <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.courseSchedule`)}:</th>
                                <td>
                                    {primaryClassSchedule && primaryClassSchedule.daysOfWeek}
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-muted"></th>
                                <td>
                                    {primaryClassSchedule && <Fragment>
                                        {formHelpers.formatTimeAddHours(primaryClassSchedule.classStartDateTime)} - {formHelpers.formatTimeAddHours(primaryClassSchedule.classStartDateTime, primaryClassSchedule.classDuration)}  {translate(`${CURRENT_SCREEN}.timeZone`)}
                                    </Fragment>}

                                    {!primaryClassSchedule && <Fragment>
                                        {formHelpers.formatTime(classStartDate)} - {formHelpers.formatTimeAddHours(classStartDate, courseDuration)}  {translate(`${CURRENT_SCREEN}.timeZone`)}
                                    </Fragment>}


                                </td>
                            </tr>
                        </Fragment>
                    }


                </tbody>
            </table>



        </Fragment>

        }

    </Translate>;
}

function mapStateToProps(state, props) {
    const goliveDate = getGlobalParameterByString(state, GlobalParameterTypes.DOLE_GOLIVE_CCD);
    const xDayLimit = getGlobalParameterByString(state, GlobalParameterTypes.CDD_Pay_Day_Limit);
    const isAgentFromUSA = agentSelector.isAgentFromUSA(state);
    return {
        goliveDate,
        xDayLimit,
        isAgentFromUSA
    };
}



export default connect(mapStateToProps)(InProgressDetails);
