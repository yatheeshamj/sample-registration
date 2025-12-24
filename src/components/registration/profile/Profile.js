import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainLayout from '../../layouts/MainLayout';
import ProfileFormContainer from './ProfileFormContainer';
import HowItWorks from '../../shared/sidebars/HowItWorks';
import styles from './Profile.module.scss';
import { loginRedirect } from '../../../actions/loginActions';

class Profile extends Component {

    render() {
        const { loginRedirect } = this.props;

        return (
            <>
                <MainLayout
                    headerTitle='Welcome to spotify'
                    headerSubtitle='Changing the way the world works!'
                    navTitle='Need to continue registration?'
                    buttonName='Login'
                    handleClick={loginRedirect}
                >
                    <div className={`${styles['container-wrapper']} row`}>
                        <div className={`${styles['form-container']} col-md-7`}>
                            <ProfileFormContainer profile={this.props.profile} />
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
const mapDispatchToProps = { loginRedirect };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
