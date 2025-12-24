
//framework & 3rd parties
import React, { Fragment, Component } from 'react';

import * as Yup from "yup"
import { connect } from 'react-redux';
import { Translate } from '../../../localize';
import ConfirmModal from "../../common/ConfirmModal"

import { Formik, Field, Form } from "formik";
import ModalWithFormWrapper from "../../common/ModalWithForm"
import formHelpers from 'spotify-shared/helpers/formHelpers'
import NumberFormat from 'react-number-format';
import { getDateDifferenceInDays } from "spotify-shared/helpers/utils"
import RadioButton from "../../common/form/RadioButton"
import { getTimeZoneForCountryByCurrency } from "spotify-shared/helpers/country"
import ErrorMessage from "../../common/ErrorMessage"
//import { Checkbox } from '@material-ui/core';
import Checkbox from "../../common/form/SingleCheckbox"

import SuccessMessage from "../../common/SuccessMessage"
import SelectInput from "../../common/form/SelectInput"
import * as enrolledProgramSelectors from "spotify-shared/selectors/enrolledPrograms"
import * as enrolledProgramActions from "spotify-shared/actions/enrolledPrograms"


const getClassNameHelper = (schedule, timeZone) => {

    return `${schedule.daysOfWeek} ${formHelpers.formatTime(schedule.classStartDateTime)} - ${formHelpers.formatTimeAddHours(schedule.classStartDateTime, schedule.classDuration)} ${timeZone}`
}


const FormBody = ({
    opportunity,
    enrollmentToCancel,
    hasErrors,
    savedSuccessfully,
    dropStatusReasons,
    formProps // this is why we need to have a form body
}) => {

    const timeZone = getTimeZoneForCountryByCurrency(opportunity.currencyCode);


    return (<Translate>
        {({ translate }) => <Fragment>
            {hasErrors === true && <ErrorMessage
                title={`${translate('Class Drop Error')}`}
                message={enrollmentToCancel.error} />
            }

            {savedSuccessfully === true &&
                <SuccessMessage
                    title={`${translate('Class Dropped')}`}
                    message={`${translate('The class has been successfully dropped.')}`} />
            }
            {hasErrors === false && savedSuccessfully === false &&
                <Fragment>

                    <div className="custom-control custom-radio">
                        <input id="classToDrop" name="SelectClass" type="radio" className="custom-control-input" required="" value="" defaultChecked />
                        <label className="custom-control-label" htmlFor="classToDrop">{getClassNameHelper(opportunity.primaryClassSchedule, timeZone)}</label>
                    </div>
                    <p> {translate('You are requesting to drop this client certification course. To continue, please choose the appropriate drop reason and select Drop Class.')}</p>
                    <p>{translate("Drops due to Bereavement, Military orders or Jury Duty should be canceled via AVA, Ask 'How to Drop a Client Course' and follow the prompts to speak to live specialist.")}</p>


                    <Field

                        onChange={formProps.handleChange}
                        name="dropReason"
                        label={translate('Drop Reason')}
                        blankOption={translate('Drop Reason')}
                        options={dropStatusReasons && dropStatusReasons.map(o => {
                            return {
                                ...o,
                                label: o.label,
                                value: o.value
                            }
                        })}
                        id="dropReason"
                        component={SelectInput}
                    />

                    <h4>Drop Policy</h4>

                    <Field
                        onChange={formProps.handleChange}
                        name="dropPolicy"
                        checked={formProps.values.dropPolicy}
                        label={translate("Drop Policy Text")}
                        id="dropPolicy"
                        component={Checkbox} />

                    <p>{translate('This Policy applies to drops made before the actual start of the course and drops made during a certification course.')}</p>
                </Fragment>
            }




        </Fragment>}
    </Translate >);
}

class DropEnrollmentModal extends Component {

    constructor(props) {
        super(props);

        this.validationSchema = this.validationSchema.bind(this);
        this.savedSuccessfully = this.savedSuccessfully.bind(this);

        this.state = {
            canDropClass: true,
        };

    }

    //componentDidMount() {
    //    if (this.props.isDropFetching === false && this.props.dropStatusReasons.length === 0) this.props.getDropStatusReasons();
    //}

    okButtonLabel() {

        if (this.savedSuccessfully())
            return "View Opportunities";
        if (this.hasErrors())
            return "View Opportunities";
        else
            return "Drop Class";
    }

    cancelButtonLabel() {
        if (this.savedSuccessfully())
            return 'Close';
        else if (this.hasErrors())
            return "Close";
        else
            return "Stay in Class";
    }


    savedSuccessfully() {
        return this.props.enrollmentToCancel.isComplete;
    }

    hasErrors() {
        return (this.props.enrollmentToCancel != null && this.props.enrollmentToCancel.error != null);
    }

    validate() {
        isModalVisible = true;
    }


    validationSchema() {

        return Yup.object().shape({
            dropPolicy: Yup.mixed().required().oneOf([true, 'true'], 'Policy must be accepted'),
            dropReason: Yup.string().required('Required'),
        });
    }

    render() {
        const {
            opportunity,
            title,
            isModalVisible,
            onSubmit,
            onHideModal,
            onCancel,
            enrollmentToCancel,
            dropStatusReasons,
            initialOnSubmit
            
        } = this.props;

        return <Translate>

            {({ translate }) => <Fragment>
                <ModalWithFormWrapper
                    overrideIsSubmitting={this.savedSuccessfully() || this.hasErrors()}
                    id={"DropEnrollmentModal"}
                    title={title}
                    isVisible={isModalVisible}
                    onHide={onHideModal}
                    onSubmit={onSubmit}
                    showClearAndHide={false}
                    onCancel={onCancel}
                    closeButton={false}
                    backdrop='static'
                    applyLbl={translate(this.okButtonLabel())}
                    cancelLbl={translate(this.cancelButtonLabel())}
                    hideApply={this.hasErrors()}
                    validationSchema={this.validationSchema()}
                    initialFormValues={{
                        dropReason: "",
                        dropPolicy: false
                    }}>
                    <FormBody opportunity={opportunity} enrollmentToCancel={enrollmentToCancel} hasErrors={this.hasErrors()} savedSuccessfully={this.savedSuccessfully()} dropStatusReasons={dropStatusReasons} />
                </ModalWithFormWrapper>



            </Fragment>}
        </Translate>;
    }
}







function mapStateToProps(state, props) {





    return {



    }
}




export default function DropEnrollmentModalConnect(reduxConnect, extendStateToProps, extendsDispatchToProps = {}) {


    function mapStateToProps(state, props) {

        const dropStatusReasons = enrolledProgramSelectors.getDropStatusReasons(state);
        const isDropFetching = enrolledProgramSelectors.isDropFetching(state);
        //const enrollmentToCancel = enrolledProgramSelectors.getEnrollmentToCancel(state);
        
        //
        const extendedState = extendStateToProps !== undefined ? extendStateToProps(state, props) : {}

        return {
            dropStatusReasons,
            isDropFetching
          //  enrollmentToCancel
            // extends with passed in props if any
            , ...extendedState
        }
    }

    const mapDispatchToProps = {
        getDropStatusReasons: enrolledProgramActions.getDropStatusReasons

        // extends with passed in props if any
        , ...extendsDispatchToProps
    };



    return reduxConnect(
        mapStateToProps,
        { ...mapDispatchToProps }
    )(DropEnrollmentModal);
}
