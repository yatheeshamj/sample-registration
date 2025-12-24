import "./card.scss";
import commonStyle from "../../../../src/components/shared/CommonStyle.module.scss"
import React, { Fragment } from 'react';
import { OpportunityStatus } from "spotify-shared/constants"
import { getDateDifferenceInDays } from "spotify-shared/helpers/utils"

const CardTitle = ({
    showStatus = true,
    primaryClassSchedule,
    opportunity = {},
    enrolledProgram = {},
    onLearnMoreClick = () => { },
    _logo,
    _title
}) => {
    const logo = opportunity.logo && opportunity._isCertificationPassed ? opportunity.logo : opportunity.clientLogoURL;
    const title = enrolledProgram && opportunity._isCertificationPassed ? enrolledProgram.programName : opportunity.name;
    let daysToClassStart = getDateDifferenceInDays(opportunity.classStartDate);

    if (primaryClassSchedule) {
        daysToClassStart = getDateDifferenceInDays(primaryClassSchedule.classStartDateTime);

    }

    return <Fragment>
        <div className="opportunity-board_top__logo">
            <img className="pointer" src={_logo || logo}
                onClick={() => onLearnMoreClick(opportunity.crmId)} />
        </div>
        <h3 className={`pointer opportunity-board_top__title mb-0 ${commonStyle['regularFont']} ${commonStyle['semiBoldWeight']} ${commonStyle['opportunity__Card__Title']}`} onClick={() => onLearnMoreClick(opportunity.crmId)} >
            {_title || title}
        </h3>
        {showStatus && opportunity._isInCertification && daysToClassStart <= 0 &&
            <h4 className="text-center ">
                Certification in Progress
		    </h4>
        }
        {showStatus && opportunity._inProgress &&
            <h4 className="text-center ">
                {opportunity.enrollmentStatusReasonDisplayName || opportunity.enrollmentStatusReason}
            </h4>
        }

    </Fragment>
}

export default CardTitle;
