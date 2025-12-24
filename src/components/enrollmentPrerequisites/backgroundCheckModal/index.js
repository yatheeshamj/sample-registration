
import React, { Fragment, Component } from 'react';
import { Translate } from 'spotify-shared-web/localize'
import ConfirmModal from "spotify-shared-web/components/common/ConfirmModal"
import ModalWithFormWrapper from "spotify-shared-web/components/common/ModalWithForm"
import LoadingComponent from 'spotify-shared-web/components/common/LoadingComponent';
import * as Yup from "yup"
import { Formik, Field, Form } from "formik";
import TextInput from "spotify-shared-web/components/common/form/TextInput"
import  Checkbox from "spotify-shared-web/components/common/form/CheckboxInput"
import { FooterLinks } from '../../../constants';


const UKBody = ({ formProps, assessment }) => {
    return <>


        <div dangerouslySetInnerHTML={{ __html: assessment.ukAssessmentDetails }} />
        <br />
        <Field
            required
            onChange={formProps.handleChange}
            name={"orderNumber"}
            value={formProps.values.orderNumber}
            label={"Order Number"}
            id={"orderNumber"}
            component={TextInput}
        /></>
}

const JMBodyWithOrderNumber = ({ formProps, assessment }) => {
    return <>


        <div dangerouslySetInnerHTML={{ __html: assessment.ukAssessmentDetails }} />
        <br />
        <Field
            required
            onChange={formProps.handleChange}
            name={"orderNumber"}
            value={formProps.values.orderNumber}
            label={"Order Number"}
            id={"orderNumber"}
            component={TextInput}
        /></>
}

const JMBody = ({assessment,formProps }) => {
    
    return <>

        <ul>
            {assessment.timeLimit != null && assessment.timeLimit != undefined && <li>Time Limit: {assessment.timeLimit}</li>}
            {assessment.averageTimeToComplete != null && assessment.averageTimeToComplete != undefined && <li>Average Time to Complete: {assessment.averageTimeToComplete}</li>}
            {assessment.averageWaitingTime != null && assessment.averageWaitingTime != undefined && <li>Average waiting time: {assessment.averageWaitingTime}</li>}
            {assessment.onlinebackgroundcheckorderTime != null && assessment.onlinebackgroundcheckorderTime != undefined && <li>Online background check order time: {assessment.onlinebackgroundcheckorderTime}</li>}
            {assessment.onlinebackgroundcheckorderresultsWaitTime != null && assessment.onlinebackgroundcheckorderresultsWaitTime != undefined && <li>Average Waiting Time: {assessment.onlinebackgroundcheckorderresultsWaitTime}</li>}
        </ul>

        {/* <div>Requirements</div>
        <ul>
            {assessment.enrollmentStepRequirements.map((r, key) => <li key={key}>{r.name}</li>).sort((a, b) => b.sortOrder < a.sortOrder ? 1 : -1)}
        </ul> */}
        <div
                    dangerouslySetInnerHTML={{
                      __html: assessment.assessmentDetails,
                    }}></div>
        {/* <p>{assessment.assessmentDetails}</p> */}
    </> 
}

const USBody = ({ assessment }) => {

    return <>

        <ul>
            {assessment.timeLimit != null && assessment.timeLimit != undefined && <li> Time Limit: {assessment.timeLimit}</li>}
            {assessment.averageTimeToComplete != null && assessment.averageTimeToComplete != undefined && <li>Average Time to Complete: {assessment.averageTimeToComplete}</li>}
            {assessment.averageWaitingTime != null && assessment.averageWaitingTime != undefined && <li> Average Waiting Time: {assessment.averageWaitingTime}</li>}
        </ul>

        <div>Requirements</div>
        <ul>
            {assessment.enrollmentStepRequirements.map((r, key) => <li key={key}>{r.name}</li>).sort((a, b) => b.sortOrder < a.sortOrder ? 1 : -1)}
        </ul>

        <p>{assessment.assessmentDetails}</p>
    </>
}

const FormBody = ({
    assessment,
	isAgentFromUK,
    isAgentFromJM,
	isBackgroundCheckComplete,
	onHideModal,
	isBackgroundCheckFetching,
    formProps // this is why we need to have a form body
}) => {

	{
		((isAgentFromUK === true || isAgentFromJM === true) && isBackgroundCheckComplete == true) &&
			onHideModal();
	}

    return (<Translate>
        {({ translate }) =>
			<Fragment>

				{(isBackgroundCheckFetching === true) && isAgentFromJM === false  &&
					<Fragment>
						<LoadingComponent />
					</Fragment>
				}


				{isAgentFromUK === true && isBackgroundCheckFetching === false && <UKBody formProps={formProps} assessment={assessment} />}
                {isAgentFromJM === true && <JMBody formProps={formProps} assessment={assessment} />}
				{isAgentFromUK === false && isAgentFromJM === false && isBackgroundCheckFetching === false && <USBody assessment={assessment} />}

            </Fragment>}
    </Translate >);
}

class BackgroundCheckModal extends Component {

    constructor(props) {
        super(props);
    }

    validationSchema() {

        if (this.props.isAgentFromUK) {
            return Yup.object({
                orderNumber: Yup.string().required("Required")
            });
        }
        //if (this.props.isAgentFromJM) {
        //    return Yup.object({
        //        hasAcknowledge:Yup.boolean().required().oneOf([true],'you must acknowledge ')
        //    });
        //}

        return null;
    }

    initialFormValues() {

        if (this.props.isAgentFromUK) {
            return {
                orderNumber: ""
            };
        }
        if (this.props.isAgentFromJM) {
            return {
                hasAcknowledge: true
            };
        }
        return null;
    }

    isInitialValid() {
        if (this.props.isAgentFromUK) {
            return false;
        }
        if (this.props.isAgentFromJM) {
            return true;
        }
        return true;
    }


    render() {
        const {
            isAgentFromUK,
            isAgentFromJM,
            assessment,
            isModalVisible,
            onSubmit,
            onHideModal,
			isBackgroundCheckFetching,
			isBackgroundCheckComplete
        } = this.props;


        if (!isModalVisible) return <Fragment></Fragment>

        return isModalVisible && <Translate>
            {({ translate }) => <Fragment>
                <ModalWithFormWrapper
                    overrideIsSubmitting={!isBackgroundCheckFetching}
                    id={"BackgroundCheckModal"}
                    title={assessment.displayName}
                    isVisible={isModalVisible}
                    onHide={onHideModal}
                    onSubmit={onSubmit}
                    onCancel={onHideModal}
                    hideApply={false}
                    closeButton={false}
                    backdrop='static'
                    applyLbl={translate("Submit")}
                    cancelLbl={translate("Cancel")}
                    showClearAndHide={false}
                    isInitialValid={this.isInitialValid()}
                    validationSchema={this.validationSchema()}
                    initialFormValues={this.initialFormValues()}>
                    <FormBody
						assessment={assessment}
						isAgentFromUK={isAgentFromUK}
                        isAgentFromJM={isAgentFromJM}
						isBackgroundCheckComplete={isBackgroundCheckComplete}
						onHideModal={onHideModal}
						isBackgroundCheckFetching={isBackgroundCheckFetching}
                    />
                </ModalWithFormWrapper>
            </Fragment>}
        </Translate>;
    }
}







export default BackgroundCheckModal;

