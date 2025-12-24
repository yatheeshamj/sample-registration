
//framework & 3rd parties
import React, { Fragment, Component } from 'react';
import { Translate } from '../../../localize';
import ModalWithFormWrapper from "../../common/ModalWithForm"
import LoadingComponent from "spotify-shared-web/components/common/LoadingComponent";


class LMSMessageModal extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        const {
            title,
            isModalVisible,
            onSubmit,
            onHideModal,
            onCancel, 
            message ,
            enrolledOppId,
            primaryClassSchedule         
        } = this.props;

        return <Translate>

            {({ translate }) => <Fragment>
                <ModalWithFormWrapper
                    id={"VPN Access "}
                    title={title}
                    isVisible={isModalVisible}
                    onHide={onHideModal}
                    onSubmit={()=>onSubmit(primaryClassSchedule,enrolledOppId)}
                    showClearAndHide={false}
                    onCancel={onCancel}
                    applyLbl={"Ok"}
                    isInitialValid={true} 
                    hideCancel={true}
                    >

                   {message!=null?<p>{message}</p>:<LoadingComponent/>}
                </ModalWithFormWrapper>



            </Fragment>}
        </Translate>;
    }
}

export default LMSMessageModal
