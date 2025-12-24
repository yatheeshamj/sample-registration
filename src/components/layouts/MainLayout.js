import React, { Component } from 'react';
import NavigationHeader from '../shared/NavigationHeader';
import RegistrationHeader from '../shared/RegistrationHeader';
import ProgressBar from '../shared/ProgressBar';
import MainLayoutFooter from './MainLayoutFooter';
import cookie from 'react-cookies';
import LanguageToggle from "./LanguageToggle"
import withAppInsights from '../../appInsights';
import commonStyle from '../shared/CommonStyle.module.scss'
import Header from "./Header";
import StateModal from "../zerostate/stateModal";
class MainLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ZeroStateModal: false,
        };
        this.onHideZeroStateModal = this.onHideZeroStateModal.bind(this);
        this.onZeroStateClick = this.onZeroStateClick.bind(this);
    }

    onHideZeroStateModal() {
        this.setState({ ZeroStateModal: false });
    }
    onZeroStateClick() {
        this.setState({ ZeroStateModal: true });
    }

    render() {
        const {
            navTitle,
            navLinkPath,
            navLinkName,
            buttonName,
            handleClick,
            showProgress,
            headerTitle,
            headerSubtitle,
            isSecondaryRegistrationHeader,
            renderStepsContainer,
            children,
            fullWidth,
            showRegistrationHeader,
            countryCode,

            width,
            newHeader,
        } = this.props;

        // const userLanguagePreference = cookie.load("userLanguagePreference");
        // const userCountry = userLanguagePreference ? userLanguagePreference.match(/-(\w{2})\//)[1] : "US";





        return (
            <div>
                <div>
                    <LanguageToggle
                        closeModal={undefined}
                        countryCode={countryCode} />
                </div>
                
                {!newHeader ? (
                    <NavigationHeader
                        title={navTitle}
                        linkPath={navLinkPath}
                        linkName={navLinkName}
                        buttonName={buttonName}
                        handleClick={handleClick}
                    />
                ) : (
                    <>
                        <Header onZeroStateClick={this.onZeroStateClick} newHeader={newHeader} />
                        <StateModal
                            isVisible={false}
                            onHide={this.onHideZeroStateModal}
                        />
                    </>
                )}

                <div
                    className={`container ${commonStyle['containerMargin']}`}
                >
                    {showProgress ? (
                        <div className='row'>
                            <div
                                className='col-md-12'
                                style={{ marginLeft: 0, marginRight: 0 }}
                            >
                                <ProgressBar />
                            </div>
                        </div>
                    ) : null}
                    <div className='row'>
                        <div className='col-md-12'>
                            {showRegistrationHeader ? (
                                <RegistrationHeader
                                    title={headerTitle}
                                    subtitle={headerSubtitle}
                                    isSecondaryRegistrationHeader={isSecondaryRegistrationHeader}
                                    renderStepsContainer={renderStepsContainer}
                                    content={children}
                                    fullWidth={fullWidth}
                                />
                            ) : null}
                            {
                                !isSecondaryRegistrationHeader && (
                                    <div className='row'>
                                        <div className='col-md-12'>{children}</div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}

export default withAppInsights(MainLayout);
