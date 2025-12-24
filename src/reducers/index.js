import { combineReducers } from "redux";
import registrationReducer from "./RegistrationReducer";
import admissionStepReducer from "./AdmissionStepReducer";
import uniqueIdentityReducer from "./UniqueIdentityReducer";
import loginReducer from "./LoginReducer";
import forgotPasswordReducer from "./ForgotPasswordReducer";
import resetPasswordReducer from "./ResetPasswordReducer";
import forgotUsernameReducer from "./ForgotUsernameReducer";
import validateAccountReducer from "./ValidateAccountReducer";
import agentTypeReducer from "./AgentTypeReducer";
import authReducer from "./AuthReducer";
import agentProfileReducer from "./AgentProfileReducer";
import recaptchaReducer from "./ReCaptchaReducer";
import legalDocsReducer from "./LegalDocsReducer";
import legacyUserReducer from "./LegacyUser";
import ReferralUserReducer from "./ReferralUserReducer";
import AppReducer from "./app";
import { connectRouter } from "connected-react-router";
import { reducers } from "spotify-shared";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    registration: registrationReducer,
    admissionSteps: admissionStepReducer,
    login: loginReducer,
    uniqueIdentity: uniqueIdentityReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    forgotUsername: forgotUsernameReducer,
    validateAccount: validateAccountReducer,
    agentType: agentTypeReducer,
    auth: authReducer,
    agentProfile: agentProfileReducer,
    recaptcha: recaptchaReducer,
    legalDocs: legalDocsReducer,
    legacyUser: legacyUserReducer,
    app: AppReducer,
    referUser: ReferralUserReducer,
    ...reducers,
  });
