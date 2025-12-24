import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainLayout from '../../layouts/MainLayout';
import HowItWorks from '../../shared/sidebars/HowItWorks';
import styles from './Profile.module.scss';
import { logoutRedirect, loginRedirect } from '../../../actions/loginActions';
import ProfilePartialFormContainer from './ProfilePartialFormContainer';

class ProfilePartial extends Component {

    render() {
        const { logoutRedirect, loginRedirect, registrationType } = this.props;

        var clickAction = registrationType == null ? loginRedirect : logoutRedirect;
        var buttonName = registrationType == null ? "Login" : "Logout";

        return (
            <>
                <MainLayout
                    headerTitle='Welcome to spotify'
                    headerSubtitle='Changing the way the world works!'
                    navTitle='Need to continue registration?'
                    buttonName={buttonName}
                    handleClick={clickAction}
                >
                    <div className={`${styles['container-wrapper']} row`}>
                        <div className={`${styles['form-container']} col-md-7`}>
                            <ProfilePartialFormContainer profile={this.props.profile} />
                        </div>
                        <div className={`${styles['how-it-works']} col-md-5`}>
                            <HowItWorks />
                        </div>
                    </div>
                </MainLayout>
                <MainLayoutFooter />
            </>
        );
    }
}

const mapStateToProps = login => login
const mapDispatchToProps = { logoutRedirect, loginRedirect };

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePartial);
