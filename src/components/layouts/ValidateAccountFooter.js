import "./validatefooter.scss"
import React, { Fragment, useState } from "react"
import { Translate } from 'spotify-shared-web/localize'
import classNames from "classnames";
import { boostrapBreakpoints } from "../../const/helpers"
import { FooterLinks } from '../../constants'
import SCREEN_CONFIG from '../../screensConfig';
import spotifyLogo from '../../assets/images/spotify-logo-with-text.svg';

import ModalWithFormWrapper from "spotify-shared-web/components/common/ModalWithForm";

const CURRENT_SCREEN = SCREEN_CONFIG.footer;

const CONTACTUS = "contactUs";

const validateaccountfooter = ({ width, footerConfig }) => {
    const date = new Date();
    const year = date.getFullYear();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return <Fragment>
        <Translate>
            {({ translate }) => <div className="footer top-spacing">
                <div
                    className={
                        classNames({
                            "container": width >= boostrapBreakpoints.lg,
                            "container-fluid": width < boostrapBreakpoints.lg
                        })
                    }>



                    <ModalWithFormWrapper

                        id={"NoShowDepositWithCloseButton"}
                        title={translate(`${CONTACTUS}.heading`)}
                        isVisible={show}
                        onHide={handleClose}
                        onSubmit={handleClose}
                        onCancel={handleClose}
                        hideApply={false}
                        hideCancel={true}
                        closeButton={true}
                        centered={true}
                        showClearAndHide={false}
                        applyLbl={"Close"}
                        cancelLbl={"Close"}
                        isInitialValid={true}

                    >
                        <div>
                            {!footerConfig.contactUs.viaPhone.display && <p>
                                {translate(`${CONTACTUS}.description`)}
                            </p>}
                        </div>
                        <Fragment>
                            {footerConfig.contactUs.viaPhone.display && footerConfig.contactUs.viaEmail.display && (
                                <Fragment>
                                    <p>
                                        {translate(`${CONTACTUS}.support`)}
                                    </p>
                                    <p className="summary-title">{translate(`${CONTACTUS}.viaEmail`)}</p>
                                    <ul>
                                        <li style={{ marginLeft: '20px' }}>
                                            {/* <p>
                                                {translate(`${CONTACTUS}.email`)}<br />
                                                <a href={translate(`${CONTACTUS}.viaEmailValue`)} className="link1">
                                                    {translate(`${CONTACTUS}.viaEmailValue`)}
                                                </a>
                                            </p> */}
                                            <a href={translate(`${CONTACTUS}.viaEmailValue`)} className="link1">
                                                {translate(`${CONTACTUS}.viaEmailValue`)}
                                            </a>
                                        </li>
                                    </ul>
                                    <p className="summary-title">{translate(`${CONTACTUS}.viaPhone`)}</p>
                                    <ul>
                                        <li style={{ marginLeft: '20px' }}>{translate(`${CONTACTUS}.viaPhoneValue`)}</li>
                                    </ul>
                                </Fragment>
                            )}
                        </Fragment>

                    </ModalWithFormWrapper>
                    <div className="footer-banner">
                        <div className="align-item-center display-content">
                            <div className="footer-logo">
                                <img src={spotifyLogo} alt='' />
                            </div>
                            <div className="trademark">
                                {translate(`${CURRENT_SCREEN}.spotifyName`) + (year) + translate(`${CURRENT_SCREEN}.allRightsReserved`)}
                            </div>
                        </div>
                        <div className="footer-links">
                            {/* <a href={FooterLinks.FTC_NOTICE} rel="noopener noreferrer" className="FTC-Notice" target="_blank">{translate(`${CURRENT_SCREEN}.ftcNotice`)}</a>
                            &nbsp; | &nbsp; */}
                            <a href={FooterLinks.ACCEPTABLE_USE_POLICY} rel="noopener noreferrer" target="_blank">{translate(`${CURRENT_SCREEN}.acceptableUsePolicy`)}</a>
                            &nbsp; | &nbsp;
                            <a href={FooterLinks.CLASS_CONFIRMATION_POLICY} rel="noopener noreferrer" target="_blank">{translate(`${CURRENT_SCREEN}.classConfirmationPolicy`)}</a>
                            &nbsp; | &nbsp;

                            <a href={FooterLinks.PRIVACY_POLICY} rel="noopener noreferrer" target="_blank">{translate(`${CURRENT_SCREEN}.privacyPolicy`)}</a>
                            &nbsp; | &nbsp;
                            <a href={FooterLinks.SYSTEM_EQUIPMENT_POLICY} rel="noopener noreferrer" target="_blank">{translate(`${CURRENT_SCREEN}.systemEquipmentPolicy`)}</a>
                            &nbsp; | &nbsp;
                            <a href={FooterLinks.TERMS_OF_USE} rel="noopener noreferrer" target="_blank">{translate(`${CURRENT_SCREEN}.termsOfUsePolicy`)}</a>
                            &nbsp; | &nbsp;
                            <a className="footer-links" onClick={() => handleShow()}>{translate(`${CURRENT_SCREEN}.contactUs`)}</a>
                            {/* &nbsp; | &nbsp;
                            <a className="footer-link">AWS</a> */}
                        </div>
                    </div>

                </div>
            </div>
            }
        </Translate>
    </Fragment >;
}

export default validateaccountfooter;
