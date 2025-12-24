import React, { Component, Fragment } from "react"
import { Formik, Field } from 'formik';
import * as Yup from "yup"
import { Translate } from 'spotify-shared-web/localize'
import MainLayoutFullNavAuthenticated from "../layouts/MainLayoutFullNavAuthenticated";
import Button from 'spotify-shared-web/components/common/Button';
import Checkbox from "spotify-shared-web/components/common/form/CheckboxInput"
import TextInput from "spotify-shared-web/components/common/form/TextInput"
import Password from "spotify-shared-web/components/common/form/PasswordInput"
import Select from "spotify-shared-web/components/common/form/SelectInput"
import CheckboxGroup from "spotify-shared-web/components/common/form/CheckboxGroup"
import RadioButton from "spotify-shared-web/components/common/form/RadioButton"
import { connect } from "react-redux";
import { trackError, trackEvent, trackTrace } from "spotify-shared/actions/applicationInsights"

class Sample extends Component {

    constructor(props) {
        super(props)

        this.state = {
            sampleData: {
                CheckMe: false,
                Select: "",
                Text: "",
                Password: "",
                RadioButton: "",
                CheckboxGroup: [],
                RadioButton: ""
            }
        }



        this.onTrackError = this.onTrackError.bind(this);
        this.onTrackEvent = this.onTrackEvent.bind(this);
        this.onTrackTrace = this.onTrackTrace.bind(this);
        this.onUnCaughtError = this.onUnCaughtError.bind(this);

    }

    onTrackTrace() {
        this.props.trackTrace("***** Something worth logging about just happened");
    }

    onTrackEvent() {
        this.props.trackEvent({
            name: 'Sample Event Tracking',
            properties: {
                date: new Date()
            }
        });
    }

    onTrackError() {
        try {

            throw "*****Something Really Bad happend"

        } catch (e) {

            this.props.trackError(e)
        }
    }

    onUnCaughtError() {
        throw "*****Oh no we didnt catch this one!!!"
    }

    render() {

        return <div class="container py-3 mb-3" >

            <div>
                <h2>Application Insight Testing</h2>


                <Button type="button" onClick={this.onTrackError}>
                    Track Error
                </Button>

                <Button type="button"
                    style={{ marginLeft: '5px' }}
                    onClick={this.onUnCaughtError}>
                    Uncaought Error
                </Button>

                <Button type="button"
                    style={{ marginLeft: '5px' }}
                    onClick={this.onTrackEvent}>
                    Track Event
                </Button>

                <Button type="button"
                    style={{ marginLeft: '5px' }}
                    onClick={this.onTrackTrace}>
                    Track Trace
                </Button>


            </div>



            <hr />

            <div>
                <h2>Form Testing</h2>

                <Formik
                    initialValues={this.state.sampleData}
                    onSubmit={(values, actions) => {

                        //  onSubmit(values, actions.setSubmitting, actions.resetForm);
                    }}
                    validationSchema={Yup.object().shape({
                        Text: Yup.string().required('Required'),
                        Password: Yup.string().required('Required'),
                        Select: Yup.string().required('Required'),
                        CheckboxGroup: Yup.array().required('Required'),
                        RadioButton: Yup.string().required('Required'),
                    })}>
                    {props => {
                        const {
                            values,
                            setFieldValue,
                            touched,
                            errors,
                            dirty,
                            isValid,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset,
                        } = props;
                        return (<form noValidate onSubmit={handleSubmit} >
                            <Translate>
                                {({ translate }) => (
                                    <div className="row">
                                        <div className="col-lg-6">

                                            <Field
                                                required
                                                onChange={handleChange}
                                                name={"Text"}
                                                value={values.Text}
                                                label={"Text"}
                                                hint={"Hint goes here"}
                                                id={"Text-123"}
                                                component={TextInput}
                                            />


                                            <Field
                                                required
                                                onChange={handleChange}
                                                name={"Password"}
                                                value={values.Password}
                                                label={"Password"}

                                                id={"Password-123"}
                                                component={Password}
                                            />

                                            <Field
                                                required
                                                onChange={handleChange}
                                                name={"Select"}
                                                label={"Select"}
                                                hint={"Hint goes here"}
                                                options={[{ value: false, label: "Option 1" }, { value: true, label: "Option 2" }]}
                                                id={"Select-123"}
                                                component={Select}
                                            />



                                            <Field
                                                onChange={handleChange}
                                                name={"CheckMe"}
                                                checked={values.CheckMe}
                                                label={"CheckMe"}
                                                id={123}
                                                component={Checkbox} />
                                            <Field
                                                required
                                                values={values}
                                                onChange={handleChange}
                                                name={"CheckboxGroup"}
                                                label={"Checkbox Group"}

                                                hint={"Hint goes here"}
                                                options={
                                                    [{ value: "ID5", label: "Option 5" },
                                                    { value: "ID6", label: "Option 6" }]
                                                }
                                                id={"CheckboxGroup"}
                                                component={CheckboxGroup}
                                            />
                                            <Field
                                                required
                                                values={values}
                                                onChange={handleChange}
                                                name={"CheckboxGroup2"}
                                                label={"Checkbox Group2"}

                                                hint={"Hint goes here"}
                                                options={
                                                    [{ value: "ID8", label: "Option 8" },
                                                    { value: "ID9", label: "Option 9" }]
                                                }
                                                id={"CheckboxGroup2"}
                                                component={CheckboxGroup}
                                            />



                                            <Field
                                                required
                                                values={values}
                                                setFieldValue={setFieldValue}

                                                name={"RadioButton"}
                                                label={"RadioButton"}
                                                hint={"Hint goes here"}
                                                options={
                                                    [{ value: "ID1", label: "Radio Option 1" },
                                                    { value: "ID2", label: "Radio Option 2" }]
                                                }
                                                id={"RadioButton"}
                                                component={RadioButton}
                                            />


                                            <Field
                                                required
                                                values={values}
                                                setFieldValue={setFieldValue}

                                                name={"RadioButton2"}
                                                label={"RadioButton2"}
                                                hint={"Hint goes here"}
                                                options={
                                                    [{ value: "ID3", label: "Radio Option 3" },
                                                    { value: "ID4", label: "Radio Option 4" }]
                                                }
                                                id={"RadioButton2"}
                                                component={RadioButton}
                                            />

                                        </div>
                                        <div className="col-lg-12">
                                            <Button type="submit"
                                                style={{ marginTop: '5px' }}
                                                disabled={isValid === false}> Save
                                            </Button>
                                        </div>
                                    </div>
                                )}

                            </Translate>

                        </form>);
                    }}
                </Formik>

            </div>
        </div>
    }
}





function mapStateToProps(state, props) {


    return {

    }
}

const mapDispatchToProps = {
    trackError, trackEvent, trackTrace
};

export default MainLayoutFullNavAuthenticated(connect(
    mapStateToProps,
    { ...mapDispatchToProps }
)(Sample));
