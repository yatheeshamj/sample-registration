import React, { Component, Fragment } from "react";
import { Formik, Form, Field, ErrorMessage, errors } from "formik";
import { connect } from "react-redux";
import { Translate } from "spotify-shared-web/localize";
import { Modal } from "react-bootstrap";
agentProfile;
import formHelpers from "spotify-shared/helpers/formHelpers";
import Button from "spotify-shared-web/components/common/Button";

import * as Yup from "yup";
import TextInput from "spotify-shared-web/components/common/form/TextInput";
import { agentProfile } from "spotify-shared/selectors";
import "react-datepicker/dist/react-datepicker.css";
import { updateParishData } from "../../../actions/registrationActions";
import TextField from '@material-ui/core/TextField';
import { useInputStyles } from "../../../styles";
import styles from "./ParishUpdateModal.module.scss"



//allows jamaica users to update address as well as parish
const ParishSelect = ({ form,
    field,
    errors,
    touched,
    values,
    handleChange,
    handleBlur,
    verifyFeinUnique,
    setFieldValue,
    setFieldTouched,
    registerBusiness,
    handleRestartClick,
    agentProfile,
    profile,
    isSubmitting,
    recent,
    setFieldError,
    dirty,
    isValid
}) => {
    const errorStyle = {
        marginBottom: "10px",
        fontSize: "12px",
        color: "red",
        marginTop: "-10px"
    }
    const classes = useInputStyles()

    const renderClasses = (name) => {
        return `${name}-inputs-wrapper`
    }
    return (
        <Form>
            <div>

                {profile.isFetchProvincesComplete && (
                    <>
                        <div className={`${styles[renderClasses("parishId")]}`}>
                            <TextField
                                id="parishId"
                                name="parishId"
                                classes={{ root: !(errors['parish'] && touched['parish']) && classes.root }}
                                select
                                label="Parish (required)"
                                value={values.parishId}
                                onChange={(e) => {

                                    setFieldValue("parishId", e.target.value)
                                }}
                                autoComplete='off'
                                onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
                                fullWidth
                                // helperText={errors['parishId'] && touched['parishId'] ? errors['parishId'] : ''}
                                error={errors['parishId'] && touched['parishId'] ? true : false}
                                size="small"
                                SelectProps={{
                                    native: true
                                }}
                                variant="outlined"

                            >
                                {<option value="" />}
                                {profile.formOptions.provinces.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </TextField>
                        </div>
                        {errors['parishId'] && touched['parishId'] && <div style={errorStyle}> <ErrorMessage name="parishId" /></div>}


                        <div className={`${styles[renderClasses("street1")]}`}>
                            <Field
                                id="Street1"
                                name='Street1'
                                autoComplete='off'
                                readOnly={true}
                                value={values.Street1}
                                onChange={(e) => {
                                    setFieldValue("Street1", e.target.value)
                                }}

                                onBlur={(e) => {

                                    if (!touched['Street1']) {
                                        setFieldTouched(e.nativeEvent.srcElement.id, true, true);
                                    } else {

                                    }
                                }}
                                label={`Address1`}
                                variant="outlined"
                                fullWidth
                                error={errors['Street1'] && touched['Street1'] ? true : false}
                                size="small"
                                classes={{ root: !(errors['Street1'] && touched['Street1']) }}
                                component={TextField}
                            />
                        </div>


                        {errors['Street1'] && touched['Street1'] && <div style={errorStyle}> <ErrorMessage name="Street1" /></div>}
                        <div className={`${styles[renderClasses("street2")]}`}>
                            <Field
                                id="Street2"
                                name='Street2'
                                autoComplete='off'
                                readOnly={true}
                                value={values.Street2}
                                onChange={(e) => {
                                    setFieldValue("Street2", e.target.value)

                                }}

                                onBlur={(e) => {

                                    if (!touched['Street2']) {
                                        setFieldTouched(e.nativeEvent.srcElement.id, true, true);
                                    } else {

                                    }
                                }}
                                label={`Address2`}
                                variant="outlined"
                                fullWidth
                                error={errors['Street2'] && touched['Street2'] ? true : false}
                                size="small"
                                classes={{ root: !(errors['Street2'] && touched['Street2']) }}
                                component={TextField}
                            />
                        </div>

                        {errors['Street2'] && touched['Street2'] && <div style={errorStyle}> <ErrorMessage name="Street2" /></div>}
                        <div className={`${styles[renderClasses("city")]}`}>
                            <Field
                                id="city"
                                name='city'
                                autoComplete='off'
                                readOnly={true}
                                value={values.city}
                                onChange={(e) => {
                                    setFieldValue("city", e.target.value)
                                }}

                                onBlur={(e) => {

                                    if (!touched['city']) {
                                        setFieldTouched(e.nativeEvent.srcElement.id, true, true);
                                    } else {

                                    }
                                }}
                                label={`city`}
                                variant="outlined"
                                fullWidth
                                error={errors['city'] && touched['city'] ? true : false}
                                size="small"

                                component={TextField}
                            />
                        </div>

                        {errors['city'] && touched['city'] && <div style={errorStyle}> <ErrorMessage name="city" /></div>}
                    </>
                )}


                <br />
                <div className="mt-3 mb-2">
                    <Button
                        type="submit"
                        variant="primary"
                        size="medium"
                        hide={false}
                        disabled={!(dirty && isValid)}
                        isSubmitting={isSubmitting}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </Form>
    )
}




class ParishUpdateModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSaving: false,
        };
    }

    handleSubmit = (values) => {
        // if (this.state.isSaving) return;
        // this.setState({
        //     isSaving: true,
        // });
        const { userId, contactId, agentId } = this.props.profile.formInfo;


        const formData = formHelpers.constructFormData(values);

        this.props.updateParishData({ formData, userId, agentId, contactId });
        // this.props.onHide();
    };

    validationSchema() {
        return Yup.object({
            parishId: Yup.string().required("please select one of the parish"),
            Street1: Yup.string().required("Address1 is required"),
            Street2: Yup.string(),
            city: Yup.string().required("city is required"),

        });
    }

    render() {
        const { isVisible, profile, agentProfile } = this.props;
        return (
            <Translate>
                {({ translate }) => (
                    <Fragment>
                        <Modal
                            dialog={"true"}
                            show={isVisible}
                            backdrop="static"
                            // onHide={onHide}
                            keyboard={false}
                        >
                            <Modal.Header closeButton={false}>
                                <Modal.Title>
                                    {/* <h3>Thank you for choosing the spotify<sup>&#174;</sup> Platform! Some technical difficulties require you to reenter your first and last name and date of birth</h3> */}

                                    <h3>Please reenter the following details:</h3>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className={`field`}>
                                    <Formik
                                        initialValues={{
                                            parishId: "",
                                            Street1: agentProfile.address ? agentProfile.address : "",
                                            Street2: agentProfile.address2 ? agentProfile.address2 : "",
                                            city: agentProfile.city ? agentProfile.city : ""
                                        }}
                                        validationSchema={this.validationSchema()}
                                        onSubmit={this.handleSubmit}

                                        render={(formikProps) => (

                                            <ParishSelect
                                                profile={profile}
                                                {...formikProps}

                                            />
                                        )}
                                    />
                                </div>
                            </Modal.Body>
                        </Modal>
                    </Fragment>
                )}
            </Translate>
        );
    }
}

//#region MapStateToProps
function mapStateToProps(state) {
    return {
        profile: state.registration.profile,
    };
}
//#endregion

//#region MapDispatchToProps
const mapDispatchToProps = {
    updateParishData: updateParishData,
};
//#endregion

//#region Export Component
export default connect(mapStateToProps, { ...mapDispatchToProps })(
    ParishUpdateModal
);
//#endregion
