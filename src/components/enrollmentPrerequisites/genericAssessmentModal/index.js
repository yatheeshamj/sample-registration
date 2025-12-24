
import React, { Fragment, Component } from 'react';
import { Translate } from 'spotify-shared-web/localize'
import ConfirmModal from "spotify-shared-web/components/common/ConfirmModal"

class GenericAssessmentModal extends Component {

    constructor(props) {
        super(props);
    }




    render() {
        const {
            assessment,
            isModalVisible,
            onSubmit,
            onHideModal,
            isStepPhotoId=isStepPhotoId? isStepPhotoId:false
        } = this.props;

        return isModalVisible && <Translate>
            {({ translate }) => <Fragment>
                <ConfirmModal
                    title={assessment.displayName}
                    isVisible={isModalVisible}
                    onHide={onHideModal}
                    onSubmit={onSubmit}
                    okLbl={isStepPhotoId ?`${assessment.inProgress ? 'Resume' : 'Start'} `:`${assessment.inProgress ? 'Resume' : 'Start'} Prerequisite`}
                    hideCancel={true}>

                    <ul>
                        {assessment.timeLimit != null && assessment.timeLimit != undefined && <li> Time Limit: {assessment.timeLimit}</li>}
                        {assessment.averageTimeToComplete != null && assessment.averageTimeToComplete != undefined && <li>Average Time to Complete: {assessment.averageTimeToComplete}</li>}
                        {assessment.averageWaitingTime != null && assessment.averageWaitingTime != undefined && <li> Average Waiting Time: {assessment.averageWaitingTime}</li>}
                    </ul>

                    <div>Requirements</div>
                    <ul>
                        {assessment.enrollmentStepRequirements.sort((a, b) => b.sortOrder < a.sortOrder ? 1 : -1).map((r, key) => <li key={key}>{r.name}</li>)}
                    </ul>

                    <pre className='assessment-details'>{assessment.assessmentDetails}</pre>
                </ConfirmModal>
            </Fragment>}
        </Translate>;
    }
}







export default GenericAssessmentModal;

