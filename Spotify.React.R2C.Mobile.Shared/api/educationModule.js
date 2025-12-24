import {
  getWithAuthRequest,
  postRequestWithAuth,
} from "./helpers/request";
import { getBaseUrl } from "./helpers/request";

export const fetchQuestions = (props) => {
  return getWithAuthRequest(
    `${getBaseUrl()}validatetraining/educationalmodule`
  );
};

export const submitAnswers = (props) => {
  const { AgentId, IsPass, EducationalContentId, AssessmentAnswer, NumberOfCorrectAnswer, IsVideoWatched } = props;
  
  const uri = `${getBaseUrl()}validatetraining/agent/${AgentId}/updateEducationalModuleResults`;
  return postRequestWithAuth(uri, {
    AgentId,
    IsPass,
    EducationalContentId,
    AssessmentAnswer,
    NumberOfCorrectAnswer,
    IsVideoWatched
  });
};
