import "./index.scss"
import ModalWithFormWrapper from "spotify-shared-web/components/common/ModalWithForm";
import { Translate } from "spotify-shared-web/localize";
import { Field } from "formik";
// import translate  from 'spotify-shared-web/localize'
// import TrnSchema from "../../agentType/trn/TrnSchema";
import { TextField } from "@material-ui/core";
import React, { Fragment } from "react";
import * as Yup from 'yup';
import { isFetching } from "spotify-shared/selectors/opportunities";
import SuccessMessage from "spotify-shared-web/components/common/SuccessMessage";
import ErrorMessage from "spotify-shared-web/components/common/ErrorMessage";
import { asyncValidateTrn,asyncValidateTrnNew } from "../../agentType/trn/customValidation";


const errorStyle = {
    marginBottom: "10px",
    fontSize: "12px",
    color: "red",
    marginTop: "-10px"
}

const FormBody = ({
    isSuccessfulValidation,
    disabledFields,
    onHide,
    agentCrmId,
    hasErrors,
    formProps
}) => {
    
    // if(isSuccessfulValidation!=null ){
    //     //close the modal
    //     setTimeout(()=>onHide(hasErrors),3000);
    // }
    console.log(formProps.errors["ssn"],"trn",disabledFields,hasErrors)
    
    return (<Translate>{
        ({translate})=>
        <>  
        
        {isSuccessfulValidation==null && <div>

           
            

            <div className="ssn-inputs-wrapper">
                <Field id="ssn"
                    name='ssn'
                    type='password'
                    autoComplete='off'
                    onChange={formProps.handleChange}
                    label={`${translate("Tax Registration Number")} (required)`}
                    fullWidth
                    value={formProps.values.ssn}
                    variant="outlined"
                    component={TextField}
                    size="small"
                    validate={ disabledFields ?null:(value)=>asyncValidateTrnNew(value,{agentCrmId})}
                    disabled={disabledFields}
                />

            </div>
            {formProps.errors["ssn"] &&
                <div style={errorStyle}>{formProps.errors["ssn"]}</div>}
            <div className="ssn-inputs-wrapper">
                <Field
                    id='ssnConfirm'
                    name='ssnConfirm'
                    label={`${translate("Confirm Tax Registration Number")} (required)`}
                    type='password'
                    autoComplete='off'
                    onChange={formProps.handleChange}
                    fullWidth
                    value={formProps.values.ssnConfirm}
                    variant="outlined"
                    component={TextField}
                    size="small"
                    disabled={disabledFields}
                />

            </div>
            {formProps.errors["ssnConfirm"] &&
                <div style={errorStyle}>{formProps.errors["ssnConfirm"]}</div>}
        </div>}
        {
            isSuccessfulValidation && 
            <SuccessMessage
                title="Thank You"
                message="TRN verified successfully"
            />
        }
        {
            isSuccessfulValidation!=null && !isSuccessfulValidation && 
            <ErrorMessage
                title="Verification failed"
                message={hasErrors!=null? hasErrors:"unable to verify your trn"}
            />
        }

        </>}
        </Translate>
    )

}

const TRNValidationForm = ({ trnData, isModalVisible, onSubmitSave, onHide, isSubmitting, isSuccessful,agentCrmId,hasErrors}) => {
    const validationSchema = () => {

        let schemaObj = {
        };
       
        schemaObj["ssn"] = Yup.string().required("Required");
        schemaObj["ssnConfirm"] = Yup.string().oneOf([Yup.ref('ssn')], 'Tax Registration Numbers do not match').required("Required");

        return Yup.object(schemaObj);

    }
console.log(trnData)

    return (
        isModalVisible && <Translate>
            {({ translate }) => <Fragment>
                <ModalWithFormWrapper
                    overrideIsSubmitting={!isSubmitting}
                    id={"PaymentModal"}
                    title={"TRN Verification"}
                    isVisible={isModalVisible}
                    onSubmit={onSubmitSave}
                    onHide={onHide}
                    hideCancel={isSuccessful==null}
                    onCancel={onHide}
                    closeButton={true}
                    hideApply={false||(isSuccessful!=null)}
                    backdrop='static'
                    showClearAndHide={false}
                    applyLbl={translate("Verify")}
                    cancelLbl={translate("Close")}
                    validationSchema={validationSchema()}
                    isInitialValid={true}
                    initialFormValues={{
                        ssn: trnData.attempts>0?"":trnData.trn,
                        ssnConfirm:trnData.attempts>0?"":trnData.trn
                    }}>
                    <FormBody
                        isSuccessfulValidation={isSuccessful}
                        onHide={onHide}
                        disabledFields={trnData.attempts==0}
                        agentCrmId={agentCrmId}
                        hasErrors={hasErrors}
                    />
                </ModalWithFormWrapper>
            </Fragment>}
        </Translate>
    )
}


export default TRNValidationForm;
