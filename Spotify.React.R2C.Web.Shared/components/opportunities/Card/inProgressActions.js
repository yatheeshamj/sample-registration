import "./card.scss"
import React, { Fragment, useEffect, useState } from 'react';
import { ButtonGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Buttonspotify from '../../common/Button';
import { getDateDifferenceInDays } from "spotify-shared/helpers/utils"
import { AllowClassRescheduleXDaysBeforeClassStart } from "spotify-shared/constants"
import infoIcon from '../../../assets/images/info.png';
import scheduleIcon from '../../../assets/images/Schedule.png';
import CrowdHubIcon from '../../../assets/images/Crowd-Hub.png';
import ChatRoomIcon from '../../../assets/images/Chat-Room.png';
import KnowledgezoneIcon from '../../../assets/images/Knowledge-Zone.png';
import VirtualClassroomIcon from '../../../assets/images/Virtual_Classroom_Preview.png';
import StarmaticIcon from '../../../assets/images/star.png';
import { Translate } from '../../../localize';
import { red } from "@material-ui/core/colors";
import SCREEN_CONFIG from "../../../../src/screensConfig";
import PCCheckModal from "../../../../src/components/enrollmentPrerequisites/pccheck";
import PhotoIdModal from "../../../../src/components/enrollmentPrerequisites/photoIdModal";

const CURRENT_SCREEN = SCREEN_CONFIG.opportunityTypes;


const InProgressActions = ({
    _isEnrolledFullPayment,
    _canCancel,
    classStartDate,
    enrolledProgram,
    onCancelEnrollmentClick,
    onRescheduleEnrollmentClick,
    onDropEnrollmentClick,
    _isCertificationPassed,
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
    onInProgressResumeClick,
    hasAvailableSchedules,
    _canReschedule,
    onOpenStarmatic,
    onGenerateChatRoom,
    onGenerateKnowledgeZone,
    enrollmentId,
    percentEnrollmentComplete,
    _canDrop,
    onGeneratespotifyKnowledgeZone,
    spotifyKnowledgeZoneLink,
    opportunityId,
    _isClassAccessDisabled,
    crmId,
    pcCheckResults,
    isSubmittingPCCheck,
    isCompletePCCheck,
    pcCheckErrors,
    rulesetId,
    isFirstClass,
    photoIdIsFetching,
    PhotoIdStatus,
    photoIdMedia,
    photoIdError,
    virtualClassData,
    generateVirtualClassroom,
    clearPCScan,
    createPCCheckAssessment,
    initialisePhotoIdQRCode
}) => {
    const daysToStart = getDateDifferenceInDays(classStartDate);
    const [corwdHubProdLink, setCrowdHubProdLink] = useState(true)
    const [corwdHubCertLink, setCrowdHubCertLink] = useState(true)
    const [pcAssessment, setPCAssessment] = useState(null);
    const [photoIdAssessment, setPhotoIdAssessment] = useState(null);

    useEffect(() => {
        if (virtualClassData && virtualClassData.data === "FIRSTCLASSDAY") {
            onPCCheckStartClick({
                displayName: "PC Scan",
                averageTimeToComplete: "3 Mins",
                averageWaitingTime: "None",
                assessmentDetails:
                    "When you begin the technical check, a file will download in the taskbar on your computer. Please open the Hardware Detection file to complete the system check.",
            });
        }

        if (virtualClassData && virtualClassData.data === "FACEAUTH") {
            onPhotoIdAssessmentStartClick({
                displayName: "Photo ID Verification",
                enrollmentId : virtualClassData.enrollmentId
            });
        }
    }, [virtualClassData]);

    useEffect(() => {
        if (PhotoIdStatus && (PhotoIdStatus.overallStatus === "Pass" || PhotoIdStatus.incodeApiDown)) {
            generateVirtualClassroom({
                enrollmentId: enrollmentId,
                primaryClassSchedule: primaryClassSchedule,
            });
            setPhotoIdAssessment(null);
        }
    }, [PhotoIdStatus]);

    const onCrowdHubProdClick = () => {
        if (corwdHubProdLink)
            onGenerateCrowdhub({ enrolledProgram, programCrmId })

        setCrowdHubProdLink(false)

        setTimeout(() => { setCrowdHubProdLink(true) }, 2000)
    }

    const onCrwdHubCertLink = () => {
        if (corwdHubCertLink)
            onGenerateCrowdhub({ enrolledProgram, programCrmId, enrollmentId })

        setCrowdHubCertLink(false)

        setTimeout(() => { setCrowdHubCertLink(true) }, 2000)
    }

    //PC Check Handaler
    function onPCCheckStartClick(enrollmentStep) {
        setPCAssessment(enrollmentStep);
    }

    function shouldShowPCCheckModal() {
        return pcAssessment != null;
    }

    function onClearPCCheckAssessment() {
        clearPCScan();
    }

    function resetPCAssessment() {
        setPCAssessment(null);
    }

    function onProcessPCCheckAssessment(values) {
        // Kick off web service to run pccheck
        let props = {
            opportunityId: crmId,
            pcId: values.hdnPCId,
            ipAddress: values.ip,
            osType: values.hdnOSType,
            isFirstClass: true,
            primaryClassSchedule: primaryClassSchedule,
            enrollmentId: enrollmentId,
        };
        createPCCheckAssessment(props);
        if (
            pcCheckResults != null &&
            pcCheckResults.results === null &&
            pcCheckResults.globalResult === "PASS"
        ) {
            setPCAssessment(null);
        }
    }

    function onHidePCCheckModal() {
        clearPCScan();
        setPCAssessment(null);
    }

    //PhotoID Handaler
    function onPhotoIdAssessmentStartClick(enrollmentStep) {
        initialisePhotoIdQRCode({
            enrollmentId: enrollmentStep.enrollmentId,
        });
        setPhotoIdAssessment(enrollmentStep.displayName);
    }

    function onSubmitPhotoIdAssessmentModal() { }

    function resetPhotoIdAssessment() {
        setPhotoIdAssessment(null);
    }
    return <Translate>
        {({ translate }) => <Fragment>
            {pcAssessment && (enrollmentId === virtualClassData.enrollmentId) && (
                <PCCheckModal
                    assessment={pcAssessment}
                    onSubmit={onProcessPCCheckAssessment}
                    onHideModal={onHidePCCheckModal}
                    isModalVisible={shouldShowPCCheckModal()}
                    pcCheckResults={pcCheckResults}
                    isSubmittingPCCheck={isSubmittingPCCheck}
                    isCompletePCCheck={isCompletePCCheck}
                    pcCheckErrors={pcCheckErrors}
                    rulesetId={virtualClassData.rulesetId}
                    isFirstClass={isFirstClass}
                />
            )}
            
            {photoIdAssessment && (enrollmentId === virtualClassData.enrollmentId) && (
                <PhotoIdModal
                    assessment={photoIdAssessment}
                    onSubmit={onSubmitPhotoIdAssessmentModal}
                    onHideModal={resetPhotoIdAssessment}
                    isModalVisible={photoIdAssessment != null}
                    photoIdIsFetching={photoIdIsFetching}
                    status={PhotoIdStatus}
                    photoIdMedia={photoIdMedia}
                    photoIdError={photoIdError}
                />
            )}

            <div className="programicongrp">
                {/*1.	Opportunity Announcement*/}
                {_pdfLink != null && _isCertificationPassed === false &&
                    <div className="program-board_bottom__icon">
                        <a onClick={() => onDownloadPDF(_pdfLink)}
                            className="pointer program-board_bottom__link">
                            <img src={infoIcon} alt="" style={{ paddingTop: 8, paddingBottom: 8 }} />
                            <span className="d-block">
                                {translate(`${CURRENT_SCREEN}.opportunityAnnouncement`)}
                            </span>
                        </a>
                    </div>
                }

                {/*2.	Self-Paced*/}
                {enrollmentId && _isEnrolledFullPayment && isFinalized && _isCertificationPassed === false && _hasSelfPaced && _isClassAccessDisabled === false &&
                    <div className="program-board_bottom__icon">
                        <a onClick={() => onGenerateSelfPaced(primaryClassSchedule, crmId, enrollmentId)}
                            className="pointer program-board_bottom__link">
                            <img src={scheduleIcon} alt="" /><span className="d-block">{translate(`${CURRENT_SCREEN}.selfPaced`)}</span>
                        </a>
                    </div>
                }

                {/*3.	Virtual Classroom*/}
                {_isEnrolledFullPayment && isFinalized && _isCertificationPassed === false && _hasVirtualClassroom && _isClassAccessDisabled === false &&
                    <div className="program-board_bottom__icon">
                        <a onClick={() => onGenerateVirtualClassroom({ primaryClassSchedule, enrollmentId })}
                            className="pointer program-board_bottom__link">
                            <img src={VirtualClassroomIcon} alt="" /><span className="d-block">{translate(`${CURRENT_SCREEN}.virtualClassroom`)}</span>
                        </a>
                    </div>
                }

                {/*4.	Starmatic*/}
                {enrolledProgram && enrolledProgram.isCSPContracted === true &&
                    <div className="program-board_bottom__icon">
                        <a onClick={() => onOpenStarmatic({ programCrmId })}
                            className="pointer program-board_bottom__link">
                            <img src={StarmaticIcon} alt="" /><span className="d-block">{translate(`${CURRENT_SCREEN}.starmatic`)}</span>
                        </a>
                    </div>
                }


                {/*5.	Chat Room   */}
                {enrolledProgram && enrolledProgram.isCSPContracted === true && enrolledProgram.isChatIntegration === true &&
                    <div className="program-board_bottom__icon">
                        <a onClick={() => onGenerateChatRoom({ programCrmId })}
                            className="pointer program-board_bottom__link">
                            <img src={ChatRoomIcon} alt="" /><span className="d-block">{translate(`${CURRENT_SCREEN}.chatRoom`)}</span>
                        </a>
                    </div>
                }

                {/*6.1	Crowd Hub::Certification */}
                {isFinalized && enrolledProgram && enrollmentId && enrolledProgram.isCSPEligibleCrowHubCertZone == true &&
                    <div className="program-board_bottom__icon">
                        <a onClick={onCrwdHubCertLink}
                            className="pointer program-board_bottom__link">
                            <img src={CrowdHubIcon} alt="" /><span className="d-block">
                                {translate(`${CURRENT_SCREEN}.crowdHub`)}
                            </span>
                        </a>
                    </div>
                }
                {/*6.2	Crowd Hub ::Production*/}
                {enrolledProgram && enrolledProgram.isCSPEligibleCrowHubProdZone == true &&
                    <div className="program-board_bottom__icon">
                        <a onClick={onCrowdHubProdClick}
                            className="pointer program-board_bottom__link">
                            <img src={CrowdHubIcon} alt="" /><span className="d-block">
                                {translate(`${CURRENT_SCREEN}.crowdHub`)}
                            </span>
                        </a>
                    </div>
                }

                {/*7.1 spotify Knowledge Zone*/}
                {/* 
                    Knowledge Zone should be made available as soon as an agent is registered on the portal. 
                    They do not need to be enrolled in an opportunity.  They should have access at all times to Knowledge Zone. 

                 */}
                {
                    <div>
                        <div className="program-board_bottom__icon">
                            <a onClick={() => onGeneratespotifyKnowledgeZone()}
                                className="pointer program-board_bottom__link">
                                <img src={KnowledgezoneIcon} alt="" /><span className="d-block">{translate(`${CURRENT_SCREEN}.knowledgeZone`)} </span>
                            </a>
                        </div>
                    </div>
                }


            </div>
            <div className="InProgressActions">
                {onInProgressResumeClick && percentEnrollmentComplete < 100 && _isClassAccessDisabled === true &&
                    <p className="alert">{translate(`${CURRENT_SCREEN}.crowdHub`)}</p>
                }
            </div>
            <div className="InProgressActions">
                {onInProgressResumeClick && percentEnrollmentComplete < 100 && _isClassAccessDisabled === true &&
                    <Buttonspotify onClick={onInProgressResumeClick}> {translate(`${CURRENT_SCREEN}.completeBgc`)}</Buttonspotify>
                }

                {onInProgressResumeClick && percentEnrollmentComplete < 100 && _isClassAccessDisabled === false &&
                    <Buttonspotify onClick={onInProgressResumeClick}> {translate(`${CURRENT_SCREEN}.continue`)}</Buttonspotify>
                }

                {_canReschedule &&
                    <a className="link pointer btn-link" onClick={onRescheduleEnrollmentClick}>  {translate(`${CURRENT_SCREEN}.rescheduleClass`)}  </a>
                }

                {_canCancel &&
                    <a className="link pointer btn-link" onClick={onCancelEnrollmentClick}>  {translate(`${CURRENT_SCREEN}.cancelEnrollment`)}  </a>
                }

                {_canDrop &&
                    <a className="link pointer btn-link" onClick={onDropEnrollmentClick}>  {translate(`${CURRENT_SCREEN}.dropClass`)}</a>
                }



            </div>
        </Fragment>

        }

    </Translate >;
}



export default InProgressActions;
