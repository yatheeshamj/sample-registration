import React, { Component } from 'react';
import { connect } from 'react-redux';

import SelectAgentType from './SelectAgentType';

import { logoutRedirect } from '../../actions/loginActions';
import { AdmissionStep, COUNTRY_IDS, AgentPath } from '../../constants';
import { ADMISSION_STEP_ROUTES } from '../../config';
import { Redirect } from 'react-router-dom';
import MainLayoutFullNavAuthenticated from "../layouts/MainLayoutFullNavAuthenticated";
import * as admissionStepSelectors from "spotify-shared/selectors/admissionSteps"
import { getCountries } from "../../actions/registrationActions"
import { selectBusinessPath } from '../../actions/agentTypeActions';
import LoadingComponent from 'spotify-shared-web/components/common/LoadingComponent';


class AgentTypeContainer extends Component {




    handleAgentTypeSelect = () => {
        const { agentProfile } = this.props;

        this.props.selectBusinessPath(
            agentProfile.agentId,
            AgentPath.SOLE_PROPRIETOR
        );
    };

    isAgentInProgress = (agentTypeSteps) => {
        return agentTypeSteps && !!agentTypeSteps.find((step) => {
            return step.inProgress === true;
        });
    };

    renderAgentTypeInProgress = (agentTypeSteps) => {
        const stepInProgress = agentTypeSteps.find((step) => {
            return step.inProgress === true;
        });
        return this.renderAgentTypeSelection(stepInProgress.uniqueId);
    };

    renderAgentTypeSelection = (agentTypeSelected) => {


        const { agentProfile } = this.props;
        const isCAUser = agentProfile.countryId === COUNTRY_IDS.CA;
        const isUKUser = agentProfile.countryId === COUNTRY_IDS.UK;
        const isUSUser = agentProfile.countryId === COUNTRY_IDS.US;
        const isJMUser = agentProfile.countryId === COUNTRY_IDS.JM;
        const isINUser = agentProfile.countryId === COUNTRY_IDS.IN;




        switch (agentTypeSelected) {
            case AdmissionStep.SOLE_PROPRIETOR:
                return <Redirect to={ADMISSION_STEP_ROUTES.soleProprietor} />
            // if (isUSUser) {
            //     return <Redirect to={ADMISSION_STEP_ROUTES.soleProprietor_jm} />
            // }
            // else if (isJMUser) {
            //     return <Redirect to={ADMISSION_STEP_ROUTES.soleProprietor_jm} />
            // }
            // else if (isINUser) {
            //     return <Redirect to={ADMISSION_STEP_ROUTES.soleProprietor_in} />
            // }
            // else//UK an dCA
            // {
            //     return <Redirect to={ADMISSION_STEP_ROUTES.soleProprietor_uk_ca} />
            // }

            case AdmissionStep.NEW_CALL_CENTER:
                return <Redirect to={ADMISSION_STEP_ROUTES.registerBusiness} />

            // if (!isUSUser)
            //     return <Redirect to={ADMISSION_STEP_ROUTES.servicePartner} />
            // else {
            //     return <Redirect to={ADMISSION_STEP_ROUTES.servicePartner_us} />
            // }
            case AdmissionStep.JOIN_BUSINESS:
                return <Redirect to={ADMISSION_STEP_ROUTES.joinBusiness} />

            // if (!isUSUser)
            //     return <Redirect to={ADMISSION_STEP_ROUTES.joinServicePartner} />
            // else {
            //     return <Redirect to={ADMISSION_STEP_ROUTES.joinServicePartner_us} />
            // }
            default:
                return <div>Not an agent type</div>;
        }
    };

    render() {
        const { selectPathSteps, agentProfile, agentType, admissionSteps } = this.props;
        const agentTypeSteps = selectPathSteps ? selectPathSteps.childSteps : undefined;
        const isUSUser = agentProfile.countryId === COUNTRY_IDS.US;


        return agentTypeSteps && !agentTypeSteps.completed
            ? (
                <>
                    {
                        this.isAgentInProgress(agentTypeSteps)
                            ?
                            <>{this.renderAgentTypeInProgress(agentTypeSteps)}</>
                            : (
                                <SelectAgentType
                                    agentProfile={agentProfile}
                                    agentType={agentType}
                                    agentTypeSteps={agentTypeSteps}
                                />
                            )

                    }
                </>
            )
            : <Redirect to="/" />
    }
}

function mapStateToProps(state, props) {

    const { agentType, admissionSteps, agentProfile } = state;


    const selectPathSteps = admissionStepSelectors.getAgentTypeSteps(state);
    return {
        agentType,
        admissionSteps,
        agentProfile,
        selectPathSteps
    };
}

export default MainLayoutFullNavAuthenticated(connect(
    mapStateToProps,
    {
        logoutRedirect,
        selectBusinessPath,
        getCountries
    }
)(AgentTypeContainer));
