import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainLayout from '../layouts/MainLayout';
import { loginRedirect } from '../../actions/loginActions';
import { registerRedirect } from '../../actions/registrationActions';
import HowItWorks from '../shared/sidebars/HowItWorks';
import styles from '../registration/profile/Profile.module.scss';
import Button from 'spotify-shared-web/components/common/Button';

class Welcome extends Component {

    render() {
        const { loginRedirect, registerRedirect } = this.props;

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
                        <div className={`${styles['form-container']} col-md-7 row`}>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type
                                specimen book. It has survived not only five centuries, but also the leap
                                into electronic typesetting, remaining essentially unchanged. It was
                                populspotifyd in the 1960s with the release of Letraset sheets containing
                                Lorem Ipsum passages, and more recently with desktop publishing software
                                like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                            <div className="col-md-5">
                                <Button onClick={registerRedirect}>Register</Button>
                            </div>
                            <div className="col-md-2 pt-3">
                                Or
                            </div>
                            <div className="col-md-5 ">
                                <Button onClick={loginRedirect}>Login</Button>
                            </div>
                        </div>
                        <div className={`${styles['how-it-works']} col-md-5`}>
                            <HowItWorks />
                        </div>
                    </div>
                </MainLayout >
                <MainLayoutFooter />
            </>
        );
    }
}

export default connect(
    null,
    { loginRedirect, registerRedirect }
)(Welcome);

