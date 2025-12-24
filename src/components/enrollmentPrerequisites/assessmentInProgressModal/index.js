
import React, { Fragment, Component } from 'react';
import { Translate } from 'spotify-shared-web/localize'
import ConfirmModal from "spotify-shared-web/components/common/ConfirmModal"

class AssessmentInProgressModal extends Component {

    constructor(props) {
        super(props);
    }




    render() {
        const {
            assessment,
            isModalVisible,
            onSubmit,
            onHideModal,

        } = this.props;

        return isModalVisible && <Translate>
            {({ translate }) => <Fragment>
                <ConfirmModal
                    title={`${assessment.displayName} In Progess`}
                    isVisible={isModalVisible}
                    onHide={onHideModal}
                    onSubmit={onSubmit}
					okLbl={translate("Refresh to View Results")}
                    hideCancel={true}
                    closeButton={false}
                >

                    <p>{assessment.inProgressModalText}</p>
                </ConfirmModal>
            </Fragment>}
        </Translate>;
    }
}







export default AssessmentInProgressModal;

