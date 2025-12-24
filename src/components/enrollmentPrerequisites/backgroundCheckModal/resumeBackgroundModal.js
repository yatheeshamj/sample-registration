
import React, { Fragment, Component } from 'react';
import { Translate } from 'spotify-shared-web/localize'
import ConfirmModal from "spotify-shared-web/components/common/ConfirmModal";

class ResumeBackgroundCheckModal extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const {
            backgroundCheckMessage,
            isModalVisible,
            onSubmit,
            onHideModal,
        } = this.props;

        return (
            <Translate>
                {({ translate }) => (
                    isModalVisible ? (
                        <Fragment>
                            <ConfirmModal
                                title={"Background Check Status"}
                                isVisible={isModalVisible}
                                onHide={onHideModal}
                                onSubmit={onSubmit}
                                okLbl={translate("Ok")}
                                hideCancel={true}
                                closeButton={false}
                            >
                                <p>{backgroundCheckMessage}</p>
                                <p>Kindly be advised that the background verification process is anticipated to require a duration of 24 hours. We kindly request your understanding and patience during this period. For any further inquiries or updates, we recommend revisiting at a later time.</p>
                            </ConfirmModal>
                        </Fragment>
                    ) : null
                )}
            </Translate>
        );
    }

}







export default ResumeBackgroundCheckModal;

