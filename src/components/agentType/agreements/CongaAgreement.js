import React, { Component } from "react";
import commonStyle from "../../shared/CommonStyle.module.scss";
import styles from "./CongaAgreement.module.scss";
import { Translate } from 'spotify-shared-web/localize';
import Button from 'spotify-shared-web/components/common/Button';
import AgreementSvg from "./../../../assets/images/Agreement Signing.svg"
import LoadingComponent from "spotify-shared-web/components/common/LoadingComponent";
import { CongaAgreementStatus } from "../../../constants";



export const CongoAgreementBlock = ({
    agreements,
    openAgreementModal,
    isFetchingComplete,
    isSignInProgress,
    errorMessage
}) => {

    return (
        <Translate>
            {({ translate }) => <>

                <div className={`d-md-flex ${styles['card-new']} `}>
                    <div className={styles['img-container']}>
                        <img className={` ${styles['img-us']}`}
                            src={AgreementSvg}
                            alt=''
                        />
                    </div>
                    <div className={`${styles['description']} `}>

                        { agreements && agreements.muleSoftDocStatus!== CongaAgreementStatus.Completed && (!isSignInProgress) && <p className={styles['agent-item__content-wrapper--description']}>
                            {translate("agreementCopy")}
                        </p>}
                        { agreements && agreements.muleSoftDocStatus!== CongaAgreementStatus.Completed && isSignInProgress && <p className={styles['agent-item__content-wrapper--description']}>
                            {translate("agreementInProgressMessage")}
                        </p>}
                        { agreements && agreements.muleSoftDocStatus==CongaAgreementStatus.Completed && <p className={styles['agent-item__content-wrapper--description']}>
                            {translate("agreementSignedMessage")}
                        </p>}
                        
                        <div>
                            {(isFetchingComplete) && agreements && agreements.muleSoftDocSignURL != null &&  agreements.muleSoftDocSignURL !== "" && agreements.muleSoftDocStatus!== CongaAgreementStatus.Completed && <Button

                                type='button'
                                size='custom_block_button'
                                onClick={openAgreementModal}

                            >
                                {translate("View and Sign Agreements")}
                            </Button>}
                            {
                                (isFetchingComplete) && agreements && agreements.muleSoftDocSignURL != null && agreements.muleSoftDocStatus == CongaAgreementStatus.Completed &&
                                <Button

                                    type='button'
                                    size='custom_block_button'
                                    disabled="true"

                                >
                                    Signed
                                </Button>
                            }
                            {!isFetchingComplete && <LoadingComponent />
                            }

                            {isFetchingComplete && errorMessage!="" && <p className={styles['error-message']}>{errorMessage}</p>}

                        </div>
                    </div>

                </div>
            </>}
        </Translate>
    )
}
