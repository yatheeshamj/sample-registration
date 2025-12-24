//framework & 3rd parties
import React, { Component, Fragment } from "react";
import classNames from "classnames";
import { Row, Col, Modal } from "react-bootstrap";
import { Translate } from "../../localize";
import PropTypes from "prop-types";

import ModalWithFormWrapper from "../common/ModalWithForm";
import { Field } from "formik";
import Checkbox from "../common/form/CheckboxInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import LoadingComponent from "../common/LoadingComponent";
import moment from "moment";


const FormBody = ({
  shouldCheckBoxbeDisplayed,
  isRefundAvailable,
  classStartDate,
  classNoShowFees,
  currencyCode,
  calculate,
  formProps,
}) => {
  const choices = ["true"];
  const willBeRefunded = () => {
    const startDate = new Date(classStartDate).getTime();
    // const curDate = new Date().getTime();
    const diff = parseInt(isRefundAvailable) * 24 * 60 * 60 * 1000;

    let curDate;
    if (currencyCode == "£") {
      const curUkTime = moment().tz("Europe/London").format();
      const temp1 = moment().tz("Europe/London").utcOffset()
      const temp2 = moment().tz("America/New_York").utcOffset()
      console.log(temp1, temp2, "Timezones")

      //get the time difference between Newyork and London
      curDate = new Date(curUkTime).getTime() + (temp1 - temp2) * 60 * 1000
    }
    else {
      const curUsTime = moment().tz("America/New_York").format();
      console.log(curUsTime, "calculated Current Date")
      curDate = new Date(curUsTime).getTime()
    }

    if (startDate - curDate > diff) {
      return true;
    }
    return false;
  };

  return (
    <Fragment>
      {!shouldCheckBoxbeDisplayed && (
        <p>Are you sure you want to cancel your enrollment in the class?</p>
      )}

      {shouldCheckBoxbeDisplayed && !isRefundAvailable && <LoadingComponent />}
      {shouldCheckBoxbeDisplayed && isRefundAvailable && !willBeRefunded() && (
        <>
          <p>
            Are you sure you want to cancel your enrollment in the class?</p>
          <Field
            required
            value={formProps.values.ConsentNoshowForfeit}
            name="ConsentNoshowForfeit"
            label={`I understand that, in cancelling my enrollment, the ${currencyCode}${classNoShowFees} Class Confirmation Deposit will NOT be refunded.`}
            hint={null}
            options={choices.map((key) => {
              return { value: true, label: "ConsentNoshowForfeit" };
            })}
            id="ConsentNoshowForfeit"
            component={Checkbox}
          />
        </>
      )}
      {shouldCheckBoxbeDisplayed && isRefundAvailable && willBeRefunded() && (
        <p>
          Are you sure you want to cancel the enrollment?. Please note that your
          deposit will be refunded
        </p>
      )}
    </Fragment>
  );
};

class NoshowForfeitModal extends Component {
  validationSchema2() {
    let schemaObj = {};
    return Yup.object(schemaObj)
  }

  validationSchema() {
    let schemaObj = {};

    if (!this.props.hasAgentpayedNoShowDeposit) {
      return Yup.object(schemaObj)
    }

    schemaObj["ConsentNoshowForfeit"] = Yup.boolean()
      .required()
      .oneOf([true], "you must accept the terms");
    return Yup.object(schemaObj);
  }

  calculate() {
    const { noshowRefund, classStartDate, currencyCode } = this.props

    const startDate = new Date(classStartDate).getTime();
    let curDate;
    if (currencyCode == "£") {
      const curUkTime = moment().tz("Europe/London").format();
      console.log(curUkTime, "calculated Current Date")
      const temp1 = moment().tz("Europe/London").utcOffset()
      const temp2 = moment().tz("America/New_York").utcOffset()
      console.log(temp1, temp2, "Timezones")

      //get the time difference between Newyork and London
      curDate = new Date(curUkTime).getTime() + (temp1 - temp2) * 60 * 1000
    }
    else {
      const curUsTime = moment().tz("America/New_York").format();
      console.log(curUsTime, "calculated Current Date")
      curDate = new Date(curUsTime).getTime()
    }

    const diff = parseInt(noshowRefund) * 24 * 60 * 60 * 1000;

    if (startDate - curDate > diff) {
      return true
    }
    return false
  }


  render() {
    const {
      isModalVisible,
      onSubmitSave,
      onHide,
      noshowRefund,
      classStartDate,
      hasAgentpayedNoShowDeposit,
      classNoShowFees,
      currencyCode
    } = this.props;

    return (
      <Translate>
        {({ translate }) => (
          <Fragment>
            <ModalWithFormWrapper
              id={"NoShowDeposit"}
              title={"Cancel Enrollment"}
              isVisible={isModalVisible}
              onHide={onHide}
              onSubmit={onSubmitSave}
              onCancel={onHide}
              hideApply={false}
              hideCancel={false}
              closeButton={false}
              backdrop="static"
              centered={true}
              showClearAndHide={false}
              applyLbl={translate("Continue")}
              cancelLbl={translate("Return to enrollment")}
              validationSchema={((noshowRefund != null) && (this.calculate()) || (!hasAgentpayedNoShowDeposit)) ? this.validationSchema2() : this.validationSchema()}
              isInitialValid={((noshowRefund != null) && (this.calculate()) || (!hasAgentpayedNoShowDeposit)) ? true : false}
              initialFormValues={{
                ConsentNoshowForfeit: "",
              }}
            >
              <FormBody
                shouldCheckBoxbeDisplayed={
                  hasAgentpayedNoShowDeposit
                }
                isRefundAvailable={noshowRefund}
                classStartDate={classStartDate}
                classNoShowFees={classNoShowFees}
                currencyCode={currencyCode}
                calculate={this.calculate}
              />
            </ModalWithFormWrapper>
          </Fragment>
        )}
      </Translate>
    );
  }
}


export default NoshowForfeitModal;
