import React, { Component, Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { Translate } from "spotify-shared-web/localize";
import { Modal } from "react-bootstrap";
agentProfile;
import formHelpers from "spotify-shared/helpers/formHelpers";
import Button from "spotify-shared-web/components/common/Button";

import * as Yup from "yup";
import TextInput from "spotify-shared-web/components/common/form/TextInput";
import { agentProfile } from "spotify-shared/selectors";
import DatePickerField from "spotify-shared-web/components/common/form/DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateNameAndDob } from "../../../actions/registrationActions";

// import * as agentProfileSelector from "spotify-shared/selectors/agentProfile"

class JamaicaNameDOBModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSaving: false,
    };
  }

  handleSubmit = (values) => {
    if (this.state.isSaving) return;
    this.setState({
      isSaving: true,
    });
    const { userId, contactId,agentId } = this.props.agentProfile;
    const {jamaicaFixDate}=this.props

    const formData = formHelpers.constructFormData(values);
    const thresholdDate=new Date(jamaicaFixDate)
    
    this.props.updateNameAndDob({ formData, userId, contactId,thresholdDate,agentId});
    // this.props.onHide();
  };

  validationSchema() {
    return Yup.object({
      firstname: Yup.string().required("please enter firstname"),
      lastname: Yup.string().required("please enter lastname"),
      dob: Yup.date()
        .required("please enter date")
        .test("dob", "Your should be above 18", function (value) {
          return new Date().getFullYear() - new Date(value).getFullYear() > 18;
        }),
    });
  }

  render() {
    const { isVisible} = this.props;
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
                  <h3>Thank you for choosing the spotify&#174; Platform! Some technical difficulties require you to reenter your first and last name and date of birth</h3>
                  
                  <h5>Please note that you may also need to re-sign electronic documents you previously signed to reflect this name and the date on which you completed the updates.</h5>

                  <p>Please reenter the following details:</p>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <Formik
                    initialValues={{
                      firstname: "",
                      lastname: "",
                      dob: "",
                    }}
                    validationSchema={this.validationSchema()}
                    onSubmit={this.handleSubmit}
                   
                    render={(formProps) => (
                      <Form>
                        <div>
                          <p>First Name</p>
                          <Field
                            required
                            id="firstname"
                            name="firstname"
                            label={``}
                            values={formProps.values}
                            setFieldValue={formProps.setFieldValue}
                            placehoder="firstname"
                            component={TextInput}
                          />
                          <p>Last Name</p>
                          <Field
                            required
                            id="lastname"
                            name="lastname"
                            label={``}
                            values={formProps.values}
                            setFieldValue={formProps.setFieldValue}
                            component={TextInput}
                          />
                         
                          <p>Date of Birth (DD/MM/YYY)</p>
                          <DatePickerField
                            name="dob"
                            dateFormat="dd/MM/yyyy"
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                          />

                          {formProps.errors["dob"] &&
                            formProps.touched["dob"] && (
                              <div
                                style={{
                                  marginTop: "6px",
                                  fontSize: "12px",
                                  color: "red",
                                }}
                              >
                                {" "}
                                <ErrorMessage name="dob" />
                              </div>
                            )}
                          <br />
                          <div className="mt-3 mb-2">
                            <Button
                              type="submit"
                              variant="primary"
                              hide={false}
                              disabled={formProps.isValid === false}
                              isSubmitting={this.state.isSaving}
                            >
                              Next
                            </Button>
                          </div>
                        </div>
                      </Form>
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
    //agentProfile: state.agentProfile,
  };
}
//#endregion

//#region MapDispatchToProps
const mapDispatchToProps = {
  //   onSubmitAgentSwitchingProgramReasons:
  //     opportunityActions.AgentSwitchingProgram,
  //   onClickingAddProgram: opportunityActions.AgentSwitchingProgramCompleted,
  updateNameAndDob: updateNameAndDob,
};
//#endregion

//#region Export Component
export default connect(mapStateToProps, { ...mapDispatchToProps })(
  JamaicaNameDOBModal
);
//#endregion
