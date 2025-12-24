import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainLayout from '../layouts/MainLayout';
import { loginRedirect } from '../../actions/loginActions';
import cookie from 'react-cookies';
import { registerRedirect } from '../../actions/registrationActions';
import styles from '../registration/profile/Profile.module.scss';
import Button from 'spotify-shared-web/components/common/Button';
import { Translate } from 'spotify-shared-web/localize'
import { addTranslationForLanguage } from 'react-localize-redux';
import SCREEN_CONFIG from '../../screensConfig';
import { setActiveLanguage } from 'react-localize-redux';
import LanguageToggle from '../layouts/LanguageToggle';
import MainLayoutFooter from '../layouts/MainLayoutFooter';

const CURRENT_SCREEN = SCREEN_CONFIG.contactValidation;

class LogOut extends Component {

    constructor(props) {
        super(props);
    }
    // componentDidMount() {
    //     const userLanguagePreference = cookie.load("userLanguagePreference");
    //     if (userLanguagePreference) {
    //         const regex = /c=([a-zA-Z-]+)/;
    //         setActiveLanguage(userLanguagePreference.match(regex)[1]);
    //     }
    // }

    render() {
        const { loginRedirect, registerRedirect } = this.props;

        return (
            <Translate>
                {({ translate }) =>
                    <>

                        <MainLayout
                            headerTitle='Logged Out'
                            headerSubtitle='You were successfully logged out'
                            // navTitle={translate(`${CURRENT_SCREEN}.heading`)}
                            navTitle="Need to continue registering?"
                            // buttonName={translate(`${CURRENT_SCREEN}.loginButton`)}
                            buttonName="Login"
                            handleClick={loginRedirect}
                            showProgress={false} >
                            <div className={`${styles['container-wrapper']} row`} style={{ padding: '10px' }} >
                                {/* <div className={`${styles['form-container']} col-md-7 row`}>

                                <div className="col-md-5">
                                    <Button onClick={registerRedirect}>Register</Button>
                                </div>
                                <div className="col-md-2 pt-3">
                                    Or
                                </div>

                                <div className="col-md-5 ">
                                    <Button onClick={loginRedirect}>Login</Button>
                                </div>
                            </div> */}

                                {/* <h1 className={styles['title']}>{translate(`${CURRENT_SCREEN}.heading`)}</h1> */}
                                <h1 className={styles['title']}>THANK YOU FOR USING THE spotify<sup>&reg;</sup> PLATFORM</h1>
                            </div>
                            <div className={styles['subtitle']}>
                                {/* <p>{translate(`${CURRENT_SCREEN}.description`)}</p> */}
                                <p>Please click the button below to log back in to the portal, or to continue registration.</p>
                            </div>
                            <div  >
                                {/* <Button onClick={loginRedirect} color="orange" >{translate(`${CURRENT_SCREEN}.loginButton`)}</Button> */}
                                <Button onClick={loginRedirect} color="orange" >LOG IN</Button>
                            </div>

                        </MainLayout>
                        <MainLayoutFooter />
                    </>
                }
            </Translate>
        );
    }
}

const mapDispatchToProps = {
    loginRedirect,
    registerRedirect,
    setActiveLanguage,
};

export default connect(
    null,
    mapDispatchToProps
)(LogOut);

