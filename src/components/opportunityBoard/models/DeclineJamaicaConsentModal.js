import React, { Component, Fragment } from "react";

import { Translate } from "spotify-shared-web/localize";


import ModalWithFormWrapper from "spotify-shared-web/components/common/ModalWithForm";
import Buttonspotify from "spotify-shared-web/components/common/Button";
import LoadingComponent from "spotify-shared-web/components/common/LoadingComponent";

class DeclineJamaicaConsentModal extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        const { isVisible, isModalVisible, onSubmitSave, onHide } = this.props;
        return (
            <Translate>
                {({ translate }) => (
                    <Fragment>
                        <ModalWithFormWrapper
                            id={"NoShowDeposit"}
                            title={"Decline Jamaica Legal Consent"}
                            isVisible={isModalVisible}
                            onHide={onHide}

                            onSubmit={onSubmitSave}
                            onCancel={onHide}
                            hideApply={false}
                            hideCancel={false}
                            closeButton={false}
                            centered={true}
                            showClearAndHide={false}
                            applyLbl={translate("Decline Agreement")}
                            cancelLbl={translate("Close")}
                            isInitialValid={true}
                        >
                            <Fragment>
                                <p>

                                    If you "Decline to Sign" your Profile will be inactivated; any active SOWs will be terminated; and you will not be able to service on the spotify Platform &reg;.</p>

                            </Fragment>
                        </ModalWithFormWrapper>

                    </Fragment>
                )}
            </Translate>
        );
    }
}



export default DeclineJamaicaConsentModal;
