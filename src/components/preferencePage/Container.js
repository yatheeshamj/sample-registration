import React, { Component } from 'react';
import { Formik, Field, FieldArray } from 'formik';
import { connect } from 'react-redux';
import LoadingComponent from 'spotify-shared-web/components/common/LoadingComponent';
import { Nav, Tabs, Tab, Row, Col, TabPane, H, Modal } from 'react-bootstrap';
import { CHECK_BOX } from 'spotify-shared/actionTypes/preferencesTypes';

import Button from 'spotify-shared-web/components/common/Button';
import {
    PreferencePageContainerBase,
    PreferencePageContainerBaseConnect
} from "spotify-shared/containers/PreferencePageContainerBase"
import MainLayoutFullNavAuthenticated from "../layouts/MainLayoutFullNavAuthenticated";
import * as Yup from "yup"
import { Translate } from 'spotify-shared-web/localize'
import CheckboxGroup from "spotify-shared-web/components/common/form/CheckboxGroup"
import RadioButton from "spotify-shared-web/components/common/form/RadioButton"
import { withRouter } from 'react-router-dom'

import { Redirect } from "react-router-dom";
import { StickyContainer, Sticky } from 'react-sticky';



class PreferencePageContainer extends PreferencePageContainerBase {



    constructor(props) {
        super(props);

        localStorage.removeItem('redirect_path')
        this.ClickSubmitButton = this.ClickSubmitButton.bind(this);
        this.OnPreferencesCompleted = this.OnPreferencesCompleted.bind(this);

        this.state = {
            initialValuesArray: {}
        }

        this.CHECK_BOX = true;  // isMultiSelect = true for Checkbox

    }

    initialValues = {
        initialPreferences: this.props.preferences
    };

    componentDidMount() {
        this.props.getPreferences();
    }

    componentDidUpdate(prevProps) {
        if (this.props.preferences.isSubmitting === false && prevProps.preferences.isSubmitting === true
            && !this.props.preferences.error) {
            // submitting is complete
            this.OnPreferencesCompleted()
        }
    }


    OnPreferencesCompleted() {

        this.props.history.push("/opportunities");
    }



    // radiobtn initial values array / saved values array looks like: values[questionId] = answerId
    // checkbox initial values array / saved values array looks like: values[questionId] = [answerId,answerId]
    // state/props/api array looks like: data: [questionId,question, sortOrder isMultiSelect,
    //                                                          answers[{ answerId, questionId, answer, sortOrder, isSelected }]]
    GetAnswerInitialValuesArrayFromData = (prefs) => {

        var Answers;
        var answer;
        var data;
        var QuestionId;


        Answers = {}//this.state.initialValuesArray;

        for (var i = 0; i < prefs.data.length; i++) {

            data = prefs.data[i];

            for (var a = 0; a < data.answers.length; a++) {

                QuestionId = data.questionId;

                if (data.answers[a].isSelected) {
                    answer = data.answers[a].answerId;

                    if (data.isMultiSelect == this.CHECK_BOX) {
                        // Check Box
                        if (Answers[QuestionId] === undefined) {
                            Answers[QuestionId] = [];
                        }
                        Answers[QuestionId].push(answer);
                    }
                    //Radio Button
                    else {
                        Answers[QuestionId] = answer;
                    }

                }
            }
        }


        return (Answers);


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


        this.props.updatePreferences(this.props.agentId, this.GetNewAnswersToSave(values));

    }




    render() {


        if (this.props.preferences.isFetchComplete === false)
            return <LoadingComponent />

        this.state.initialValuesArray = this.GetAnswerInitialValuesArrayFromData(this.props.preferences);
        if (this.props.preferences.isFetchComplete === true)
            return (
                <Formik
                    enableReinitialize={false}
                    initialValues={this.state.initialValuesArray}
                    onSubmit={(values, actions) => {
                        this.ClickSubmitButton(values);
                    }}
                    validationSchema={Yup.object().shape({
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
                        return (
                            <form noValidate onSubmit={handleSubmit}>
                                <Translate>
                                    {({ translate }) => (
                                        <StickyContainer>
                                            <div className="container">


                                                <Sticky>
                                                    {({ style }) => {
                                                        let _styles = {
                                                            ...style
                                                        };
                                                        if (_styles.position === "fixed") {
                                                            _styles["zIndex"] = 1000;
                                                            _styles["width"] = "100%";
                                                            _styles["borderBottom"] = "1px solid  #E3E9E9";
                                                        }

                                                        return (
                                                            <div className="row" style={_styles}>
                                                                <div className="col-sm-6" Style="background:white" >
                                                                    <h1>{translate('Preferences')}</h1>
                                                                    <h5>{translate('Tell us about yourself so we can tailor opportunities to fit you best')}</h5>

                                                                </div>
                                                                {this.props.headerVisible === false ?
                                                                    (
                                                                        <div className="col-sm-6" Style="background:white" >
                                                                            <a
                                                                                className="link pointer"
                                                                                key={"aref1"}
                                                                                onClick={() => { this.props.history.push("/opportunities"); }}
                                                                            >
                                                                                {translate('Skip for now')}
                                                                            </a>
                                                                            &nbsp;&nbsp;&nbsp;
                                                                            <Button type="submit"
                                                                                style={{ marginTop: '5px' }}
                                                                                onClick={handleSubmit}
                                                                                disabled={this.props.preferences.isSubmitting ? true : false}
                                                                                isSubmitting={this.props.preferences.isSubmitting}
                                                                            >
                                                                                {translate('Submit')}
                                                                            </Button>
                                                                        </div>
                                                                    ) :
                                                                    (<div></div>)
                                                                }
                                                            </div>);
                                                    }
                                                    }
                                                </Sticky>

                                                <div className="row">
                                                    <div className="col-lg-12" >

                                                        {this.props.preferences && this.props.preferences.isFetchComplete ? (

                                                            this.props.preferences.data.map((quest) => {
                                                                //debugger;

                                                                return <Field
                                                                    required
                                                                    values={values}
                                                                    setFieldValue={setFieldValue}
                                                                    onChange={handleChange}
                                                                    label={quest.question}
                                                                    name={quest.questionId}
                                                                    options={this.GetAnswerOptionsArrayFromData(quest)}
                                                                    id={quest.questionId}
                                                                    key={quest.questionId}
                                                                    component={quest.isMultiSelect == this.CHECK_BOX ? CheckboxGroup : RadioButton}
                                                                />


                                                            })

                                                        ) :
                                                            (

                                                                <LoadingComponent />

                                                            )}



                                                    </div>
                                                    <div className="col-sm-10 p-3" >

                                                        <Button type="submit"
                                                            style={{ marginTop: '5px' }}
                                                            onClick={handleSubmit}
                                                            disabled={this.props.preferences.isSubmitting ? true : false}
                                                            isSubmitting={this.props.preferences.isSubmitting}
                                                        >
                                                            {translate('Submit')}
                                                        </Button>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <a
                                                            className="link pointer"
                                                            key={"aref"}
                                                            onClick={() => { this.props.history.push("/opportunities"); }}
                                                        >
                                                            {translate('Skip for now')}
                                                        </a>

                                                    </div>
                                                </div>
                                            </div>
                                        </StickyContainer>
                                    )}
                                </Translate>
                            </form>);
                    }}
                </Formik>

            )
    }
}






function extendMapStatetoProps(state) {
    return {};
}


export default MainLayoutFullNavAuthenticated(PreferencePageContainerBaseConnect(connect, withRouter(PreferencePageContainer), extendMapStatetoProps));
