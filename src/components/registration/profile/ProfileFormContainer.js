import React, { Component } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import styles from './ProfileFormContainer.module.scss';

import ProfileForm from './ProfileForm';
import LoadingComponent from '../../common/LoadingComponent';
import profileSchema from './profileSchema';

import formHelpers from '../../../helpers/formHelpers';

import usFlagIcon from '../../../assets/images/us-flag-icon.svg';
import ukFlagIcon from '../../../assets/images/uk-flag-icon.svg';
import canadaFlagIcon from '../../../assets/images/canada-flag-icon.svg';

import { createAgentProfile } from '../../../actions/registrationActions';

import { verifyFeinUnique } from '../../../actions/agentTypeActions';

class ProfileFormContainer extends Component {
  state = {
    passwordInputType: 'password',
    selectCountryManually: null,
    hasSubmitted: false,
    recent: ''
  };

  mergeFormInfoWithCountry = (profile) => {
    const countryId = this.getCountryIdWithCode(
      profile.formInfo.countryObj.code,
      profile.formOptions.countries
    );

    profile.formInfo.countryId = countryId;

    return profile.formInfo;
  };

  getCountryIcon = (countryId) => {
    switch (countryId) {
      // TODO: are these constant?
      case '06f90dc0-69ff-e011-961b-0ee1388ccc3a':
        return usFlagIcon;
      case 'e7c93b0a-2207-e111-961b-0ee1388ccc3a':
        return ukFlagIcon;
      case 'e8c93b0a-2207-e111-961b-0ee1388ccc3a':
        return canadaFlagIcon;
      default:
        return null;
    }
  };

  getCountryIdWithCode = (countryCode, countries) => {
    const countryMatch = countries.find((country) => {
      return country.code === countryCode;
    });
    if (countryMatch) {
      return countryMatch.id;
    }
    return null;
  };

  handleSelectCountryManually = () => {
    this.setState({
      selectCountryManually: true
    });
  };

  handlePasswordInputTypeChange = (e) => {
    this.setState((previousState) => {
      if (previousState.passwordInputType === 'password') {
        return {
          passwordInputType: 'text'
        };
      } else {
        return {
          passwordInputType: 'password'
        };
      }
    });
  };

  handleSubmit = (values) => {
    const cookies = new Cookies();
    const formData = formHelpers.constructFormData(values);
    this.props.createAgentProfile(
      Object.assign(formData, {
        campaignCode: cookies.get('campaign_code')
      })
    );
    this.setState({
      hasSubmitted: true
    });
  };

  setRecent = (name) => {
    this.setState({
      recent: name
    });
  };

  render() {
    const { profile } = this.props;

    return (
      <div className={styles['form-container']}>
        <p className={styles['form-container__copy']}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
          laudantium iusto quidem labore porro a exercitationem eveniet.
        </p>
        {profile.isFetchCountryComplete &&
        profile.isFetchCountriesComplete &&
        profile.isFetchStatesComplete &&
        profile.isFetchProvincesComplete ? (
          <Formik
            initialValues={this.mergeFormInfoWithCountry(profile)}
            validationSchema={profileSchema}
            validateOnBlur={true}
            onSubmit={this.handleSubmit}
            render={(formikProps) => (
              <ProfileForm
                {...formikProps}
                profile={profile}
                getCountryIcon={this.getCountryIcon}
                getCountryIdWithCode={this.getCountryIdWithCode}
                selectCountryManually={this.state.selectCountryManually}
                handlePasswordInputTypeChange={
                  this.handlePasswordInputTypeChange
                }
                handleSelectCountryManually={this.handleSelectCountryManually}
                passwordInputType={this.state.passwordInputType}
                hasSubmitted={this.state.hasSubmitted}
                verifyFeinUnique={this.props.verifyFeinUnique}
                setRecent={this.setRecent}
                recent={this.state.recent}
              />
            )}
          />
        ) : (
          <LoadingComponent />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ registration }) => {
  return {
    profile: registration.profile
  };
};

export default connect(
  mapStateToProps,
  { createAgentProfile, verifyFeinUnique }
)(ProfileFormContainer);
