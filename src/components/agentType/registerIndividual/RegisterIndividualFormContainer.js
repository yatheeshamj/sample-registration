import React, { Component } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import styles from './RegisterIndividualFormContainer.module.scss';

import RegisterIndividualForm from './RegisterIndividualForm';
import registerIndividualSchema from './registerIndividualSchema';

import formHelpers from 'spotify-shared/helpers/formHelpers'

import { registerIndividual } from '../../../actions/agentTypeActions';

class RegisterIndividualFormContainer extends Component {
  handleSubmit = (values) => {
    const formData = formHelpers.constructFormData(values);

    this.props.registerIndividual(
      Object.assign(formData, {
        agentId: this.props.agentProfile.agentId,
        countryId: this.props.agentProfile.countryId
      })
    );
  };

  render() {
    const { registerIndividual } = this.props.agentType;

    return (
      <div className={styles['form-container']}>
        <Formik
          initialValues={registerIndividual.formInfo}
          validationSchema={registerIndividualSchema}
          onSubmit={this.handleSubmit}
          render={(formikProps) => (
              <RegisterIndividualForm
              overrideIsLoading={this.props.overrideIsLoading}
              registerIndividual={registerIndividual}
              verifySsnUnique={this.handleSsnVerification}
              handleRestartClick={this.props.handleRestartClick}
              {...formikProps}
            />
          )}
        />
      </div>
    );
  }
}

function mapStateToProps({ agentType }) {
  return { agentType };
}

export default connect(
  mapStateToProps,
  { registerIndividual }
)(RegisterIndividualFormContainer);
