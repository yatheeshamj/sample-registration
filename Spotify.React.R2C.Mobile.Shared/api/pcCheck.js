import {
  getWithAuthRequest,
  postRequestWithAuth,
  postRequestFormEncodedWithAuth,
  p,
} from "./helpers/request";
import { getBaseUrl } from "./helpers/request";

export const fetchPCCheckRequirements = (props) => {
  const { agentId, opportunityId, ostype } = props;
  return getWithAuthRequest(
    `${getBaseUrl()}pcchecks/agents/${agentId}/opportunities/${opportunityId}/ostypes/${ostype}`
  );
};

export const createPCCheckAssessment = (props) => {
  const { agentId, opportunityId, pcId, ipAddress, osType, isFirstClass } =
    props;
  const cspId = agentId;
  const returnFailedOnly = true;
  let uri;
  if (isFirstClass) {
    uri = `${getBaseUrl()}pcchecks/agents/${agentId}?isFirstClass=true`;
  } else {
    uri = `${getBaseUrl()}pcchecks/agents/${agentId}`;
  }
  return postRequestFormEncodedWithAuth(uri, {
    opportunityId,
    pcId,
    ipAddress,
    osType,
    cspId,
    returnFailedOnly,
  });
};
