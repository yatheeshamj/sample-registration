import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Callback } from "./components/auth/callback";
import { Logout } from "./components/auth/logout";
import { LogoutCallback } from "./components/auth/logoutCallback";
import { SilentRenew } from "./components/auth/silentRenew";

import App from './components/App';
import PageNotFound from "./components/404/index"
import ForgotPassword from './components/forgotpassword/ForgotPassword';
import ForgotUsername from './components/forgotusername/ForgotUsername';
import ResetPassword from './components/resetpassword/ResetPassword';
import OpportunityBoard from './components/opportunityBoard/Container';
import EnrollmentPrerequisites from './components/enrollmentPrerequisites/Container';

import AgentTypeContainer from './components/agentType/AgentTypeContainer';
import ValidateAccount from './components/registration/validateAccount/ValidateAccount';
import LMSAuthentication from './components/lmsauthentication/lmsauthentication';

// New Imports
import RegisterIndividual from './components/agentType/registerIndividual/RegisterIndividual';
import RegisterBusiness from './components/agentType/registerBusiness/RegisterBusiness';
import JoinBusiness from './components/agentType/joinBusiness/JoinBusiness';


// Old Country Specifig Imports
import RegisterIndividualUK_CA from './components/agentType/registerIndividual/RegisterIndividual-UK-CA';
import RegisterIndividualUS from './components/agentType/registerIndividual/RegisterIndividual-US';
import RegisterIndividualJM from './components/agentType/registerIndividual/RegisterIndividual-JM';
import RegisterIndividualIN from './components/agentType/registerIndividual/RegisterIndividual-IN';
// import RegisterBusiness from './components/agentType/registerBusiness/RegisterBusiness';
import RegisterBusinessUS from './components/agentType/registerBusiness/RegisterBusiness';
import JoinBusinessUS from './components/agentType/joinBusiness/JoinBusiness-US';
import JoinBusinessUK_CA from './components/agentType/joinBusiness/JoinBusiness-UK-CA';

import OpportunityDetails from './components/opportunityDetails/Container';
import PreferencePage from './components/preferencePage/Container';
import Sample from './components/Sample';
import Error from './components/Error';
import Jumio from './components/photoId/public';
import { SignIn } from './components/auth/signin';

import { ADMISSION_STEP_ROUTES } from './config';
import PcScanWrapper from './components/PcScanTask/PcScanWrapper';
import HarverAssessment from './components/HarverAssessment/HarverAssessment';
import EducationModuleWrapper from './components/EducationModuleTask/EducationModuleWrapper';





export const Routes = (
    <Switch>
        <Route exact path='/' component={App} />

        <Route exact={true} path={ADMISSION_STEP_ROUTES.validateAccount} component={ValidateAccount} />
        <Route exact={true} path={ADMISSION_STEP_ROUTES.contractorType} component={AgentTypeContainer} />


        {/* New Route to handle all countries */}
        <Route exact={true} path={ADMISSION_STEP_ROUTES.soleProprietor} component={RegisterIndividual} />
        <Route exact={true} path={ADMISSION_STEP_ROUTES.registerBusiness} component={RegisterBusiness} />
        <Route exact={true} path={ADMISSION_STEP_ROUTES.joinBusiness} component={JoinBusiness} />



        <Route exact={true} path={ADMISSION_STEP_ROUTES.soleProprietor_uk_ca} component={RegisterIndividualUK_CA} />
        <Route exact={true} path={ADMISSION_STEP_ROUTES.soleProprietor_us} component={RegisterIndividualUS} />
        <Route exact={true} path={ADMISSION_STEP_ROUTES.soleProprietor_jm} component={RegisterIndividualJM} />
        <Route exact={true} path={ADMISSION_STEP_ROUTES.soleProprietor_in} component={RegisterIndividualIN} />
        <Route exact={true} path={ADMISSION_STEP_ROUTES.servicePartner} component={RegisterBusiness} />
        <Route exact={true} path={ADMISSION_STEP_ROUTES.servicePartner_us} component={RegisterBusinessUS} />
        <Route exact={true} path={ADMISSION_STEP_ROUTES.joinServicePartner} component={JoinBusiness} />
        <Route exact={true} path={ADMISSION_STEP_ROUTES.joinServicePartner_us} component={JoinBusinessUS} />

        <Route exact={true} path='/opportunities/:selectedTab?' component={OpportunityBoard} />
        <Route exact={true} path='/opportunity/:id' component={OpportunityDetails} />
        <Route exact={true} path='/opportunity/:opportunityId/enrollment-prerequisites/:enrollmentId' component={EnrollmentPrerequisites} />

        <Route exact={true} path='/my-preferences' component={PreferencePage} />
        <Route exact={true} path='/lmsauthentication' component={LMSAuthentication} />

        <Route exact={true} path="/signin-oidc" component={Callback} />
        <Route exact={true} path="/signin" component={SignIn} />
        <Route exact={true} path="/logout" component={Logout} />

        <Route exact={true} path="/logout/callback" component={LogoutCallback} />
        <Route exact={true} path="/silentrenew" component={SilentRenew} />
        <Route path='/forgotpassword' component={ForgotPassword} />
        <Route path='/forgotusername' component={ForgotUsername} />
        <Route path='/resetpassword' component={ResetPassword} />


        <Route path='/Sample' component={Sample} />
        <Route path='/error' component={Error} />
        <Route path='/admissionpccheck' component={PcScanWrapper} />
        <Route path='/educationalmodule' component={EducationModuleWrapper} />
        <Route path='/harverassessment' component={HarverAssessment} />
        
        <Route path='/Jumio/:transactionStatus?' component={Jumio} />

        {/*404*/}
        <Route component={PageNotFound} />

    </Switch>
);
