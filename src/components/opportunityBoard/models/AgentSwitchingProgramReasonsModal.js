import React, { Component, Fragment } from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { Translate } from "spotify-shared-web/localize";
import { Modal } from "react-bootstrap";
import AgentSwitchingProgramReasonsForm from "./AgentSwitchingProgramReasonsForm";
import formHelpers from "spotify-shared/helpers/formHelpers";
import RadioButton from "spotify-shared-web/components/common/form/RadioButton";
import Checkbox from "spotify-shared-web/components/common/form/CheckboxInput";
import Button from "spotify-shared-web/components/common/Button";
import { SwitchingProgramReason, Reasons } from "./../../../constants";

import * as opportunityBoardActions from "spotify-shared/actions/opportunityBoard";
import * as opportunityActions from "spotify-shared/actions/opportunities";
import * as opportunityBoardSelector from "spotify-shared/selectors/opportunityBoard";
import * as Yup from "yup";
import TextInput from "spotify-shared-web/components/common/form/TextInput";

// import * as agentProfileSelector from "spotify-shared/selectors/agentProfile"

class AgentSwitchingProgramReasonsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSaving: false,
      displayReason: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.isVisible != prevProps.isVisible) {
      this.setState({ displayReason: null })
    }
  }

  handleSubmit = (values) => {
    if (this.state.isSaving) return;
    this.setState({
      isSaving: true,
    });

    const formData = formHelpers.constructFormData(values);
    this.props.onSubmitAgentSwitchingProgramReasons(formData);
    this.props.onHide();
  };

  validationSchema() {
    return Yup.object({
      UnhappyWithTheProgram: Yup.boolean(),
      LookingToEarnMoreRevenue: Yup.boolean(),
      TechnicalIssues: Yup.boolean(),
      AdditionalProgram: Yup.boolean(),
      ProgramEnding: Yup.boolean(),
      SOWEnding: Yup.boolean(),
      Other: Yup.string().min(10, "too short"),
    }).test("myCustomTest", null, (obj) => {
      if (
        obj.UnhappyWithTheProgram ||
        obj.LookingToEarnMoreRevenue ||
        obj.TechnicalIssues ||
        obj.AdditionalProgram ||
        obj.SOWEnding ||
        obj.LookingToEarnMoreRevenueProgramEnding
      ) {
        return true; // everything is fine
      }
      if (obj.Other) {
        return true;
      }

      return new Yup.ValidationError(
        "Please check one checkbox",
        null,
        "myCustomFieldName"
      );
    });
  }

  validationSchemaForChoice() {
    return Yup.object({
      choice: Yup.string().required("please select one of those"),
    });
  }

  validationSchemaForAdd() {
    return Yup.object({
      LookingForMoreRevenue: Yup.boolean(),
      AddingProgram: Yup.boolean(),
      OtherReason: Yup.string().min(10, "too short"),
    }).test("myCustomTest", null, (obj) => {
      if (obj.LookingForMoreRevenue || obj.AddingProgram) {

        return true; // everything is fine
      }

      if (obj.OtherReason) {
        return true;
      }

      return new Yup.ValidationError(
        "Please check one checkbox",
        null,
        "myCustomFieldName"
      );
    });
  }

  handleSubmitChoice = (values) => {
    if (values.choice == Reasons.AddingProgram) {
      // this.setState({ displayReason: Reasons.AddingProgram });
      this.handleSubmit({
        LookingForMoreRevenue: true,
        AddingProgram: false,
        OtherReason: "",
        SwitchingReason: SwitchingProgramReason.AdditionalProgram
      })

    } else if (values.choice == Reasons.SwitchingProgram) {
      this.setState({ displayReason: Reasons.SwitchingProgram });
    }
    // this.setState({ displayReason: values.choice});
  };

  render() {
    const { isVisible, onHide } = this.props;
    const { displayReason } = this.state;
    return (
      <Translate>
        {({ translate }) => (
          <Fragment>
            <Modal
              dialog={"true"}
              show={isVisible}
              backdrop={true}
              onHide={onHide}
            >
              <Modal.Header closeButton={true}>
                <Modal.Title>
                  {/* <h2>Switching Program Reason</h2> */}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {displayReason === Reasons.SwitchingProgram && (
                  <Formik
                    initialValues={{
                      UnhappyWithTheProgram: false,
                      LookingToEarnMoreRevenue: false,
                      TechnicalIssues: false,
                      AdditionalProgram: false,
                      ProgramEnding: false,
                      SOWEnding: false,
                      Other: "",
                      SwitchingReason: SwitchingProgramReason.SwitchProgram
                    }}
                    validationSchema={this.validationSchema()}
                    onSubmit={this.handleSubmit}
                    onHide={onHide}
                    render={(formProps) => (
                      <AgentSwitchingProgramReasonsForm
                        formProps={formProps}
                      ></AgentSwitchingProgramReasonsForm>
                    )}
                  />
                )}

                {/* {displayReason === Reasons.AddingProgram && (
                  <Formik
                    initialValues={{
                      LookingForMoreRevenue: true,
                      AddingProgram: false,
                      OtherReason:"",
                     SwitchingReason:SwitchingProgramReason.AdditionalProgram
                    }}
                    validationSchema={this.validationSchemaForAdd()}
                    onSubmit={this.handleSubmit()}
                    onHide={onHide}
                    render={(formProps) => (
                      <Form>
                      <div>
                      <Field 
                        id='LookingForMoreRevenue'
                        name='LookingForMoreRevenue'
                        type='checkbox'
                        label={`Looking For More Revenue`}
                        component={Checkbox}
                      />
                      <Field 
                        id='AddingProgram'
                        name='AddingProgram'
                        type='checkbox'
                        component={Checkbox}
                        label={`Additional Program`}
                      />
                      <div>
                        <span>Other:</span>
                      <Field
                      id='OtherReason'
                      name='OtherReason'
                      // type='textarea'
                      component={TextInput}

                      />
                      </div>
                        <div className="mb-4">
                          <Button
                            type="submit"
                            variant="primary"
                            hide={false}
                            disabled={formProps.isValid === false}
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    </Form>
                    )}
                  />
                )} */}

                {displayReason === null && (
                  <div>
                    <p>{translate('program change reason')}</p>
                    <Formik
                      initialValues={{
                        choice: "",
                      }}
                      validationSchema={this.validationSchemaForChoice()}
                      onSubmit={this.handleSubmitChoice}
                      onHide={onHide}
                      render={(formProps) => (
                        <Form>
                          <div>
                            <Field
                              required
                              id="choice"
                              name="choice"
                              label={``}
                              values={formProps.values}
                              setFieldValue={formProps.setFieldValue}
                              options={[Reasons.AddingProgram, Reasons.SwitchingProgram].map((i) => {
                                return {
                                  label: i,
                                  value: i,
                                };
                              })}
                              component={RadioButton}
                            />
                            <div className="mb-4">
                              <Button
                                type="submit"
                                variant="primary"
                                hide={false}
                                disabled={formProps.isValid === false}
                              >
                                Next
                              </Button>
                            </div>
                          </div>
                        </Form>
                      )}
                    />
                  </div>
                )}
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
    agentProfile: state.agentProfile,
  };
}
//#endregion

//#region MapDispatchToProps
const mapDispatchToProps = {
  onSubmitAgentSwitchingProgramReasons:
    opportunityActions.AgentSwitchingProgram,
  onClickingAddProgram: opportunityActions.AgentSwitchingProgramCompleted,
};
//#endregion

//#region Export Component
export default connect(mapStateToProps, { ...mapDispatchToProps })(
  AgentSwitchingProgramReasonsModal
);
//#endregion
