import React, { useEffect, useState } from "react";
import { Assessment } from "./Assessment";
import { logoutRedirect } from "../../../../actions/loginActions";
import { connect } from "react-redux";
import { generateScreeningAssessmentLink } from "spotify-shared/actions/3rdPartyLinks";
import {
  isScreeningAssessmentRequired,
  refreshScreeningAssessment,
} from "../../../../actions/agentTypeActions";
import { REACT_APP_PORTAL_BASE_URL } from "../../../../config";

const AssessmentView = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshed, setIsRefreshed] = useState(false);

  useEffect(() => {
    props.isScreeningAssessmentRequired(
      props.agentProfile.agentId,
      props.agentProfile.countryId
    );
  }, []);

  useEffect(() => {
    if (
      props.outstandingTask &&
      props.agentProfile.isScreeningAssessmentRequired &&
      !props.agentProfile.isScreeningAssessmentRequired.assessmentRequired &&
      !props.agentProfile.isScreeningAssessmentRequired.assessmentFailed
    ) {
      window.location.href = `${REACT_APP_PORTAL_BASE_URL}tasks`;
    }
    if (
      !props.outstandingTask &&
      props.agentProfile.isScreeningAssessmentRequired &&
      !props.agentProfile.isScreeningAssessmentRequired.assessmentRequired &&
      !props.agentProfile.isScreeningAssessmentRequired.assessmentFailed
    ) {
      window.location.reload();
    }
  }, [props.agentProfile.isScreeningAssessmentRequired]);

  function onBeginAssesment() {
    setIsLoading(true);
    if (props.isScreeeningUrlGenerated) {
      setIsRefreshed(true);
      props.refreshScreeningAssessment(
        props.agentProfile.agentId,
        props.agentProfile.countryId
      );
    } else {
      props.generateScreeningAssessmentLink();
    }
  }

  return (
    <div>
      <Assessment
        onBeginAssesment={onBeginAssesment}
        isScreeeningUrlGenerated={props.isScreeeningUrlGenerated}
        agentProfile={props.agentProfile}
        isScreeningAssessmentRequired={
          props.agentProfile.isScreeningAssessmentRequired
        }
        isLoading={isLoading}
        isRefreshed={isRefreshed}
        outStandingTask={props.outstandingTask}
      />
    </div>
  );
};

//export default MainLayoutFullNavAuthenticated(AssessmentView)
function mapStateToProps({ _3rdPartyLinks, agentProfile }) {
  return {
    isScreeeningUrlGenerated: _3rdPartyLinks.isScreeeningUrlGenerated,
    agentProfile,
  };
}

const mapDispatchToProps = {
  logoutRedirect,
  generateScreeningAssessmentLink,
  isScreeningAssessmentRequired,
  refreshScreeningAssessment,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentView);
