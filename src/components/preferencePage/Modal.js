import React from 'react';
import { Formik, Field } from 'formik';
import { connect } from 'react-redux';
import LoadingComponent from 'spotify-shared-web/components/common/LoadingComponent';
import { Modal } from 'react-bootstrap';
import Button from 'spotify-shared-web/components/common/Button';
import {
    PreferencePageContainerBase,
    PreferencePageContainerBaseConnect
} from "spotify-shared/containers/PreferencePageContainerBase"
import * as Yup from "yup"
import { Translate } from 'spotify-shared-web/localize'
import CheckboxGroup from "spotify-shared-web/components/common/form/CheckboxGroup"
import RadioButton from "spotify-shared-web/components/common/form/RadioButton"
import { withRouter } from 'react-router-dom'
import Cookies from 'universal-cookie';
import SCREEN_CONFIG from "../../screensConfig";


const CURRENT_SCREEN = SCREEN_CONFIG.preferences;


class PreferenceModal extends PreferencePageContainerBase {



    constructor(props) {
        super(props);
        this.ClickSubmitButton = this.ClickSubmitButton.bind(this);
        this.CHECK_BOX = true;  // isMultiSelect = true for Checkbox
    }

    componentDidMount() {
        this.props.getPreferences(null, true);
    }

    componentDidUpdate() {
        const { preferences } = this.props;
        if (preferences && preferences.isFetchComplete == true && preferences.data.length === 0) {
            const cookies = new Cookies();
            cookies.set('showPreferenceModal', false, { expires: new Date(2147483647 * 1000) });
            this.props.onHide();
        }
    }


    // radiobtn/checkbox display arrays looks like: [{value:answerId, label:answer}]
    // state/props/api array looks like: data: [questionId,question, sortOrder isMultiSelect, 
    //                                                      answers[{ answerId, questionId, answer, sortOrder, isSelected }]]
    GetAnswerOptionsArrayFromData = (data) => {

        var Answers;
        var ansobj;

        Answers = [];

        if (data == undefined || data.answers == undefined)
            return;


        for (var a = 0; a < data.answers.length; a++) {

            ansobj = {
                value: data.answers[a].answerId,
                label: data.answers[a].answer
            }
            Answers.push(ansobj);

        }


        return (Answers);


    }


    // state/props/api array looks like: data: [questionId,question, sortOrder isMultiSelect, 
    //                                              answers[{ answerId, questionId, answer, sortOrder, isSelected }]]
    GetNewAnswersToSave = (values) => {

        var theQuestionsAndAnswers = [];
        var SavedAnswers;
        var prefs;

        prefs = this.props.preferences;

        var SavedAnswers = values;

        for (var i = 0; i < prefs.data.length; i++) {
            var QuestionId;
            var answer;
            var Answers;
            var questionobj;


            QuestionId = prefs.data[i].questionId;

            answer = SavedAnswers[QuestionId];
            // debugger;
            if (answer !== undefined) {

                // if answer is an array (Chkbx), then just add it in
                // if it's not (RadioButton), create and array, add the value in and then add it in

                if (answer.constructor.name == "Array") {

                    Answers = answer;

                } else {

                    Answers = [];
                    Answers.push(answer);

                }


                questionobj = {

                    QuestionId,
                    Answers
                };


                theQuestionsAndAnswers.push(questionobj);
            }

        }

        return theQuestionsAndAnswers;
    }

    ClickSubmitButton = (values) => {

        const cookies = new Cookies();
        cookies.set('showPreferenceModal', false, { expires: new Date(2147483647 * 1000) });
        this.props.updatePreferences(this.props.agentId, this.GetNewAnswersToSave(values));
        this.props.onHide();
    }

    validateField = (value) => {
        let error;
        if (!value || (value && value.length === 0)) {
            error = 'Required';
        }
        return error;
    }

    render() {
        const { isOpen } = this.props;


        if (this.props.preferences.isFetchComplete === false)
            return <LoadingComponent />

        if (this.props.preferences.isFetchComplete === true)
            return (
                <Translate>
                    {({ translate }) => (
                        <Modal dialog id={"ZeroStateModal"}
                            show={isOpen}
                            scrollable={true}
                            centered={true}
                        >
                            <Modal.Header>
                                <Modal.Title>
                                    <h1>{translate(`${CURRENT_SCREEN}.heading`)}</h1>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="overlay-body">
                                <Formik
                                    enableReinitialize={false}
                                    onSubmit={(values, actions) => {
                                        this.ClickSubmitButton(values);
                                    }}
                                    initialValues={{}}
                                    validateOnChange={true}
                                    validateOnBlur={false}>
                                    {props => {
                                        const {
                                            values,
                                            setFieldValue,
                                            handleChange,
                                            handleSubmit,
                                            touched,
                                            errors
                                        } = props;
                                        return (
                                            < form noValidate onSubmit={handleSubmit} >

                                                <>
                                                    <div className="container">
                                                        {this.props.headerVisible === false ?
                                                            (
                                                                <div className="col-sm-6" Style="background:white" >
                                                                    <Button type="submit"
                                                                        style={{ marginTop: '5px' }}
                                                                        onClick={() => handleSubmit}
                                                                        isSubmitting={this.props.preferences.isSubmitting}
                                                                    >
                                                                        {translate(`${CURRENT_SCREEN}.submitButton`)}
                                                                    </Button>
                                                                </div>
                                                            ) :
                                                            (<div></div>)
                                                        }
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-12" >

                                                            {this.props.preferences && this.props.preferences.isFetchComplete ? (

                                                                this.props.preferences.data.map((quest) => {

                                                                    return (
                                                                        <div>
                                                                            <Field
                                                                                required
                                                                                values={values}
                                                                                setFieldValue={setFieldValue}
                                                                                validate={this.validateField}
                                                                                onChange={handleChange}
                                                                                label={quest.question}
                                                                                name={quest.questionId}
                                                                                options={this.GetAnswerOptionsArrayFromData(quest)}
                                                                                id={quest.questionId}
                                                                                key={quest.questionId}
                                                                                component={quest.isMultiSelect == this.CHECK_BOX ? CheckboxGroup : RadioButton}
                                                                            />
                                                                        </div>
                                                                    );

                                                                })

                                                            ) :
                                                                (
                                                                    <LoadingComponent />
                                                                )}
                                                        </div>
                                                        <div className="col-sm-10 p-3" >
                                                            <Button type="submit"
                                                                style={{ marginTop: '5px' }}
                                                                onClick={() => { handleSubmit }}
                                                                isSubmitting={this.props.preferences.isSubmitting}
                                                            >
                                                                {translate(`${CURRENT_SCREEN}.submitButton`)}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </>

                                            </form>
                                        );
                                    }
                                    }
                                </Formik >
                            </Modal.Body>
                        </Modal >
                    )
                    }
                </Translate>
            )
    }
}






function extendMapStatetoProps(state) {
    return {};
}


export default PreferencePageContainerBaseConnect(connect, withRouter(PreferenceModal), extendMapStatetoProps);
