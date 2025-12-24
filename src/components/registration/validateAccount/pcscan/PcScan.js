import React from "react";

import { ScanResults } from "./scanResult/ScanResult";
import { RunPcScan } from "./runPcScan/RunPcScan";
import { connect } from "react-redux";
import { logoutRedirect } from "../../../../actions/loginActions";
import {
  clearPCScanAssessment,
  createPCScanAssessment,
  fetchPCScanRequirements,
} from "spotify-shared/actions/pcScan";
import { useEffect, useState } from "react";
import { getAdmissionStepInstances } from "../../../../actions/admissionStepActions";
import PCCheckModal from "../../../enrollmentPrerequisites/pccheck";
import { retrieveGlobalParameter } from "spotify-shared/actions/globalParameters";
import { REACT_APP_PORTAL_BASE_URL } from "../../../../config";

const PcScan = (props) => {
  const [PCAssessment, setPCAssessment] = useState(null);

  useEffect(() => {
    props.retrieveGlobalParameter("AdmissionPCCheckRulesetId");
    if (props.pcScanResults !== null) {
      setPCAssessment(null);
    }
  }, [props.pcScanResults]);

  const pcScan = {
    displayName: "PC Scan",
    assessmentDetails: props.outstandingTask
      ? "Complete PC scan to finish the task"
      : "Complete PC scan to move forward with registration.",
  };

  const onProcessPCCheckAssessment = (values) => {
    // Kick off web service to run pccheck
    let payload = {
      pcId: values.hdnPCId,
      ipAddress: values.ip,
      osType: values.hdnOSType,
    };

    props.createPCScanAssessment(payload);
  };

  function onHidePCCheckModal() {
    setTimeout(setPCAssessment(null), 1000);
  }

  function shouldShowPCCheckModal() {
    return PCAssessment != null;
  }

  function onRunPCScan() {
    setPCAssessment("PC Check");
  }

  const handleSubmit = () => {
    if (props.outstandingTask && props.pcScanResults.globalResult === "PASS") {
      //Submit and redirect to Portal
      setTimeout(() => {
        window.location.href = `${REACT_APP_PORTAL_BASE_URL}tasks`;
      }, 5000);
    } else if (props.pcScanResults.globalResult === "PASS") {
      props.getAdmissionStepInstances();
    } else {
      props.clearPCScanAssessment({});
      setTimeout(setPCAssessment("PC Check"), 1000);
    }
  };

  return (
    <div>
      <PCCheckModal
        assessment={pcScan}
        onSubmit={onProcessPCCheckAssessment}
        onHideModal={onHidePCCheckModal}
        isModalVisible={shouldShowPCCheckModal()}
        pcCheckResults={props.pcScanResults}
        isSubmittingPCCheck={props.isSaving}
        isCompletePCCheck={props.isCompletePCScan}
        pcCheckErrors={props.pcScanErrors}
        rulesetId={props.rulesetId ? props.rulesetId : 17148}
      />
      {!props.pcScanResults ||
      props.pcScanResults.globalResult === "UNKNOWN" ? (
        <RunPcScan
          agentProfile={props.agentProfile}
          fetchPCScanRequirements={props.fetchPCScanRequirements}
          createPCScanAssessment={props.createPCScanAssessment}
          requirements={props.requirements}
          isFetching={props.isFetching}
          onRunPCScan={onRunPCScan}
          pcScanResults={props.pcScanResults}
          rulesetId={props.rulesetId ? props.rulesetId : 17148}
        />
      ) : (
        <ScanResults
          pcScanResults={props.pcScanResults}
          getAdmissionStepInstances={props.getAdmissionStepInstances}
          handleSubmit={handleSubmit}
          outstandingTask={props.outstandingTask}
        />
      )}
    </div>
  );
};

function mapStateToProps({
  pcScanAssessment,
  admissionSteps,
  globalParameters,
  agentProfile,
}) {
  return {
    pcScanResults: pcScanAssessment.data,
    pcScanErrors: pcScanAssessment.error,
    isSubmittingPCScan: pcScanAssessment.isSubmitting,
    isCompletePCScan: pcScanAssessment.isComplete,
    requirements: pcScanAssessment.requirements,
    isFetching: pcScanAssessment.isFetching,
    admissionSteps: admissionSteps,
    rulesetId: globalParameters.data.AdmissionPCCheckRulesetId,
    agentProfile,
    isSaving : pcScanAssessment.isSaving
  };
}

const mapDispatchToProps = {
  logoutRedirect,
  fetchPCScanRequirements,
  createPCScanAssessment,
  clearPCScanAssessment,
  getAdmissionStepInstances,
  retrieveGlobalParameter,
};

export default connect(mapStateToProps, mapDispatchToProps)(PcScan);
