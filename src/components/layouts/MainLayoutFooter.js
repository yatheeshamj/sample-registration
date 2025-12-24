import React, { useState } from "react"
import styles from './MainLayoutFooter.module.scss'
import { FooterLinks } from '../../constants'
import ModalWithFormWrapper from "spotify-shared-web/components/common/ModalWithForm";
import SCREEN_CONFIG from '../../screensConfig';
import { Translate } from 'spotify-shared-web/localize'
import spotifyLogo from '../../assets/images/spotify-logo-with-text.svg';

const CURRENT_SCREEN = SCREEN_CONFIG.footer;

const CONTACTUS = "contactUs";


const MainLayoutFooter = () => {
    const date = new Date();
    const year = date.getFullYear();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const acceptableUsePolicyObj = <Translate id="footer.acceptableUsePolicy" />;
    const acceptableUsePolicyText = acceptableUsePolicyObj.key;

    const systemEquipmentPolicyObj = <Translate id="footer.systemEquipmentPolicy" />;
    const systemEquipmentPolicyText = systemEquipmentPolicyObj.key;

    const privacyPolicyObj = <Translate id="footer.privacyPolicy" />;
    const privacyPolicyText = privacyPolicyObj.key;

    const termsOfUsePolicyObj = <Translate id="footer.termsOfUsePolicy" />;
    const termsOfUsePolicyText = termsOfUsePolicyObj.key;

    const classConfirmationPolicyObj = <Translate id="footer.classConfirmationPolicy" />;
    const classConfirmationPolicyText = classConfirmationPolicyObj.key;

    const contactUsObj = <Translate id="footer.contactUs" />;
    const contactUsText = contactUsObj.key;

    const spotifyNameObj = <Translate id="footer.spotifyName" />;
    const spotifyNameText = spotifyNameObj.key;

    const allRightsReservedObj = <Translate id="footer.allRightsReserved" />;
    const allRightsReservedText = allRightsReservedObj.key;
    return (
        <Translate>
            {({ translate }) => <div className={styles['footer']}>
                <ModalWithFormWrapper

                    id={"NoShowDepositWithCloseButton"}
                    title={'Contact Us'}
                    isVisible={show}
                    onHide={handleClose}
                    onSubmit={handleClose}
                    onCancel={handleClose}
                    hideApply={true}
                    hideCancel={true}
                    closeButton={true}
                    centered={true}
                    showClearAndHide={false}
                    applyLbl={"Close"}
                    cancelLbl={"Close"}
                    isInitialValid={true}

                >
                    <p>
                        If you are stuck or confused when signing up for the platform, you can get registration support :
                    </p>
                    <p class="summary-title">Via Email :</p>
                    <ul>
                        <li><p>India<br /><a href='indiasupport@registration.spotify.com' class="link1">indiasupport@registration.spotify.com</a></p></li>

                    </ul>
                    <ul>
                        <li><p>Canada<br /><a href='CAregistration@registration.spotify.com' class="link1">CAregistration@registration.spotify.com</a></p></li>

                    </ul>
                    <ul>
                        <li><p>USA/UK<br /><a href='registration@registration.spotify.com' class="link1">registration@registration.spotify.com</a></p></li>

                    </ul>
                    <ul>
                        <li><p>Jamaica<br /><a href='jamaica@registration.spotify.com' class="link1">jamaica@registration.spotify.com</a></p></li>

                    </ul>
                    <ul>
                        <li><p>Phlippines<br /><a href='Phlippines@registration.spotify.com' class="link1">Phlippines@registration.spotify.com</a></p></li>

                    </ul>
                    {/* <p class="summary-title">Via Phone :</p>
                    <ul>
                        <li>8335008019</li>
                    </ul> */}

                </ModalWithFormWrapper>
                <div className="footer-banner">
                    <div className="align-item-center display-content">
                        <div className="footer-logo">
                            <img src={spotifyLogo} alt='' />
                        </div>
                        <div className="trademark">
                            {"© spotify Virtual Solutions, " + (year) + ". All Rights Reserved"}
                        </div>
                    </div>
                    <div className={styles["footer-links"]}>
                        {/* <a href={FooterLinks.FTC_NOTICE} class="FTC-Notice" rel="noopener noreferrer" target="_blank">FTC Notice</a>
                        &nbsp; | &nbsp; */}
                        <a href={FooterLinks.ACCEPTABLE_USE_POLICY} rel="noopener noreferrer" target="_blank">Acceptable Use Policy</a>
                        &nbsp; | &nbsp;
                        <a href={FooterLinks.CLASS_CONFIRMATION_POLICY} rel="noopener noreferrer" target="_blank">Class Confirmation Deposit Policy</a>
                        &nbsp; | &nbsp;
                        
                        <a href={FooterLinks.PRIVACY_POLICY} rel="noopener noreferrer" target="_blank">Privacy Policy</a>
                        &nbsp; | &nbsp;
                        <a href={FooterLinks.SYSTEM_EQUIPMENT_POLICY} rel="noopener noreferrer" target="_blank">System & Equipment Policy</a>
                        &nbsp; | &nbsp;
                        <a href={FooterLinks.TERMS_OF_USE} rel="noopener noreferrer" target="_blank">Terms of Use Policy</a>
                        &nbsp; | &nbsp;
                        <a className="footer-links" onClick={() => handleShow()}>Contact Us</a>
                        {/* &nbsp; | &nbsp;
                        <a className="footer-link">AWS</a> */}
                    </div>
                </div>
            </div>
            }
        </Translate>
    )
}

export default MainLayoutFooter;
