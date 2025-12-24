import "./index.scss";

//framework & 3rd parties
//framework & 3rd parties
import React, { Fragment, Component } from "react";
import { Formik, Field, Form } from "formik";
import { Translate } from "spotify-shared-web/localize";
import ErrorMessage from "spotify-shared-web/components/common/ErrorMessage";
import ModalWithFormWrapper from "spotify-shared-web/components/common/ModalWithForm";
import ErrorResults from "./errorResults";
import LoadingComponent from "spotify-shared-web/components/common/LoadingComponent";
import { Hidden } from "@material-ui/core";

let srl;
import("jquery").then((jquery) => {
    window.jquery = jquery.default;
    window.jquery.support.cors = true;
});

var pcId = "";
var osType = "PC";
var ipAddr = "";

function initialLoad() {
    var $ = window.jquery;
    $.getJSON("https://api.ipify.org?format=json", function (data) {
        ipAddr = data.ip;
    });
}

function start(func, rulesetId) {
    //To allow cross-domain calls
    if (window.jquery != null) window.jquery.support.cors = true;

    if (!SRL) {
        alert("Detection library not loaded.");
        return;
    }

    //
    // Husdawg change notes:
    //
    // 1) SRL.init() is now async so added a ".then()" to handle the promise.
    // 2) Added two configuration options ("downloadWorkerFile" and "uploadWorkerFile") to handle worker files. Set to hosted files in the
    //    web root. 
    // 3) Added configuration option "requirementSetId" with a placerholder value of 0. This MUST always be set to whichever 
    //    requirement set (opportunity) you are testing for. 
    //        A real spotify example is:  22393
    // 

    // Intitialize library configuration.
    SRL.init({
        runTimeout: 180000, // The timeout for download to successful scan. Optional setting--set to 3 minutes (default is 90 seconds = 90000).
        protocol: "https", // Force https.
        referrerId: 1219, // spotify's ID.

        requirementSetId: rulesetId, // Requirement set ID. Important!! Must be set to the requirement set ID you are testing for. 

        ///////////////////////////////////////
        // Begin Husdawg changes.

        // detectionAppVersion: "6.5.13", // Latest detection app. Previous spotify usage was 6.1.24.0.
        // detectionAppVersion: "6.3.6", // Latest detection app. Previous spotify usage was 6.1.24.0. 6.3.6
        // detectionAppVersion: "6.1.24.0", // Latest detection app. Previous spotify usage was 6.1.24.0.

        detectionAppVersion: "6.5.18", // Detection app version.
        scanNetworkSpeed: true, // Scan for network speed.
        scanNetworkLatency: true, // Scan for latency.

        downloadWorkerFile: "/husdawgScripts/ndt7-download-worker.js",
        uploadWorkerFile: "/husdawgScripts/ndt7-upload-worker.js"

        // End Husdawg changes.
        ///////////////////////////////////////
    }).then(function () {

        pcId = SRL.configuration.computerId;

        SRL.runScan().then(
            function () {
                // Determine the next step depending if it's Windows, Mac, or other OS.
                if (SRL.system.isMacintosh()) {
                    // It's a mac so don't download exe. Just get the test results with the info we got already.
                    osType = "MAC";

                    ///////////////////////////////////////
                    // Begin Husdawg changes.

                    // Run network scan.
                    SRL.runNetworkScan().then(function () {
                        func();
                        return true;
                    });

                    // End Husdawg changes.
                    ///////////////////////////////////////
                } else if (SRL.system.isWindows()) {
                    // It's a PC so download the exe to retrieve additional system info
                    osType = "PC";
                    // Download and run a detection app scan.
                    SRL.runAppScan()
                        .then(function () {
                            ///////////////////////////////////////
                            // Begin Husdawg changes.

                            // Run network tests.
                            SRL.runNetworkScan().then(function () {
                                func();
                                return true;
                            });

                            // End Husdawg changes.
                            ///////////////////////////////////////
                        })
                        .catch(function () {
                            // Detection app timeout occurred. User failed to run the app, canceled the scan, or there was an error in the download.
                            alert(
                                "Failed to run PC Scan. Please try again.\r\n\r\nNOTE: Be sure to open the detection.exe file when prompted. If you encountered this error using Internet Explorer, please try a different browser. Mozilla Firefox and Google Chrome are recommended. Temporarily turn off virus defenders and pop up blockers that may be preventing the file from launching. If you continue to get this error message, visit AVA for additional support."
                            );
                            func();
                            return true;
                        });
                } else {
                    // It's neither Windows or Macintosh OS.
                    alert(
                        "We do not support the Operating System you    are trying to run the scan on.  Please use a Windows or Macintosh operating system."
                    );
                    return false;
                }
            },
            // An error in the local scan.
            function () {
                alert("An unexpected error has occured in the PC scan.");
                return false;
            }
        );
    });
}

const FormBody = ({
    assessment,
    pcCheckResults,
    hasResults,
    hasErrors,
    isSubmittingPCCheck,
    pcCheckErrors,
    shouldClose,
    hasOSError,
    isFirstClass,
    formProps, // this is why we need to have a form body
}) => {
    return (
        <Translate>
            {({ translate }) => (
                <Fragment>
                    {isSubmittingPCCheck === true && (
                        <Fragment>
                            <LoadingComponent />
                        </Fragment>
                    )}
                    {hasResults === true &&
                        shouldClose === false &&
                        isSubmittingPCCheck === false &&
                        (hasOSError ? (
                            <Fragment>
                                <ErrorMessage
                                    title={`${translate(
                                        "Sorry, you failed to meet minimum technical specifications"
                                    )}`}
                                    message={`${translate(
                                        "Your windows version is not the latest one. Please update the windows and retake the PC check"
                                    )}`}
                                />
                            </Fragment>
                        ) : (
                            <Fragment>
                                <ErrorMessage
                                    title={`${translate(
                                        "Sorry, you failed to meet minimum technical specifications"
                                    )}`}
                                    message={`${translate(
                                        "Your computer or internet connection does not meet all of the criteria for this program. Refer to the results below for more information and tips about how to resolve these issues. Please retry the assessment after following our suggestions to remedy failed criteria"
                                    )}`}
                                    // message={`${translate(
                                    //     "Your computer or internet connection does not meet all of the criteria for this program."
                                    // )}`}
                                />

                                {/* <p>
                                    <span>Criteria</span>
                                    </p>
                                    {pcCheckResults.results.map((result, key) => (
                                    <ErrorResults result={result} key={key} />
                                    ))} */}
                            </Fragment>
                        ))}

                    {hasErrors === true && isSubmittingPCCheck === false && (
                        <Fragment>
                            <p>{pcCheckErrors}</p>
                        </Fragment>
                    )}

                    {hasResults === false && isSubmittingPCCheck === false && hasErrors === false && (
                        <Fragment>
                            <ul>
                                {assessment.timeLimit != null && assessment.timeLimit != undefined && (
                                    <li> Time Limit: {assessment.timeLimit}</li>
                                )}
                                {assessment.averageTimeToComplete != null && assessment.averageTimeToComplete != undefined && (
                                    <li>Average Time to Complete: {assessment.averageTimeToComplete}</li>
                                )}
                                {assessment.averageWaitingTime != null && assessment.averageWaitingTime != undefined && (
                                    <li> Average Waiting Time: {assessment.averageWaitingTime}</li>
                                )}
                            </ul>

                            <div dangerouslySetInnerHTML={{ __html: assessment.assessmentDetails }} />

                            <Field
                                type="hidden"
                                className="form-control"
                                id="hdnPCId"
                                name="hdnPCId"
                                onChange={formProps.handleChange}
                            ></Field>
                            <Field
                                type="hidden"
                                className="form-control"
                                id="hdnIP"
                                name="hdnIP"
                                onChange={formProps.handleChange}
                            ></Field>
                            <Field
                                type="hidden"
                                className="form-control"
                                id="hdnOSType"
                                name="hdnOSType"
                                onChange={formProps.handleChange}
                            ></Field>
                        </Fragment>
                    )}

                    {hasResults === true &&
                        isSubmittingPCCheck === false &&
                        hasErrors === false && (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: assessment.assessmentDetails,
                                }}
                            />
                        )}
                </Fragment>
            )}
        </Translate>
    );
};

class PCCheckModal extends Component {
    componentDidMount() {
        const script = document.createElement("script");
        script.src = "https://s3.amazonaws.com/cdn.systemrequirementslab.com/scripts/detect/6.21/detect.min.js";
        script.async = true;
        document.body.appendChild(script);
    }

    constructor(props) {
        super(props);

        this.savedSuccessfully = this.savedSuccessfully.bind(this);
        this.onSubmitSave = this.onSubmitSave.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.runningScans = false;
    }

    onSubmitSave(values, actions) {
        this.runningScans = true;
        initialLoad();
        start(() => {
            this.onFinish();
            actions.setSubmitting(false);
        }, this.props.rulesetId);
    }


    onFinish() {
        const values3 = {
            ip: ipAddr,
            hdnOSType: osType,
            hdnPCId: pcId,
        };
        this.props.onSubmit(values3);
        this.runningScans = false;
    }

    submitLabel(assessment) {
        if (this.hasResults() || this.hasErrors()) return "Retry";
        else if (assessment && assessment.displayName === "PC Scan")
            return "Start Scan";
        else return "Start Assessment";
    }

    showCancelButton() {
        if (this.hasResults() || this.hasErrors()) return false;
        else return true;
    }

    isSubmitting() {
        return this.runningScans;
    }

    savedSuccessfully() {
        return this.props.isCompletePCCheck || this.props.pcCheckErrors != null;
    }

    hasResults() {
        if (
            this.props.pcCheckResults != null &&
            (this.props.pcCheckResults.errors != null || this.props.pcCheckResults.results != null)
        )
            return true;
        return false;
    }

    hasErrors() {
        if (this.props.pcCheckErrors != null) return true;
        return false;
    }

    hideApply() {
        return this.hasErrors();
    }

    hasOSError() {
        if (this.props.pcCheckResults && this.props.pcCheckResults.results) {
            for (let index in this.props.pcCheckResults.results) {
                if (
                    this.props.pcCheckResults.results[index].requirementID === "71659" &&
                    this.props.pcCheckResults.results[index].grade === "FAIL"
                ) {
                    return true;
                }
            }
        }
    }

    shouldClose() {
        if (this.props.pcCheckResults != null && this.props.pcCheckResults.globalResult == "PASS") {
            this.props.onHideModal();
            return true;
        } else if (
            this.props.pcCheckResults != null &&
            this.props.pcCheckResults.globalResult === "UNKNOWN"
        ) {
            return true;
        }
        return false;
    }

    render() {
        const {
            assessment,
            isModalVisible,
            onSubmit,
            onHideModal,
            pcCheckResults,
            isSubmittingPCCheck,
            isCompletePCCheck,
            pcCheckErrors,
            isFirstClass,
        } = this.props;

        return (
            isModalVisible && (
                <Translate>
                    {({ translate }) => (
                        <Fragment>
                            {/* <ErrorMessage
                                title={`${translate("Sorry, you failed to meet minimum technical specifications")}`}
                                message={`${translate(
                                    "Your computer or internet connection does not meet all of the criteria for this program. Refer to the results below for more information and tips about how to resolve these issues. Please retry the assessment after following our suggestions to remedy failed criteria"
                                )}`}
                            />
                            translate(`${CURRENT_SCREEN}.phoneNumber.invalidCodeErrorMessage`) */}
                            <ModalWithFormWrapper
                                // overrideIsSubmitting={this.savedSuccessfully()}
                                id={"PCCheckModal"}
                                title={assessment.displayName}
                                isVisible={isModalVisible}
                                onHide={onHideModal}
                                onSubmit={this.onSubmitSave}
                                onCancel={onHideModal}
                                closeButton={false}
                                backdrop="static"
                                showClearAndHide={false}
                                applyLbl={translate(this.submitLabel(assessment))}
                                cancelLbl={translate("Cancel")}
                                isInitialValid={true}
                                initialFormValues={{
                                    hdnPCId: "",
                                    hdnIP: "",
                                    hdnOSType: "PC",
                                }}
                                isSubmittingPCCheck={isSubmittingPCCheck}
                            >
                                <FormBody
                                    assessment={assessment}
                                    pcCheckResults={pcCheckResults}
                                    hasErrors={this.hasErrors()}
                                    isSubmittingPCCheck={this.isSubmitting()}
                                    hasResults={this.hasResults()}
                                    pcCheckErrors={pcCheckErrors}
                                    shouldClose={this.shouldClose()}
                                    hasOSError={this.hasOSError()}
                                    isFirstClass={isFirstClass}
                                />
                            </ModalWithFormWrapper>
                        </Fragment>
                    )}
                </Translate>
            )
        );
    }
}

export default PCCheckModal;
