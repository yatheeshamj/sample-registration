import "./card.scss"
import React, { Fragment } from 'react';
import { getOpportunityPreferenceMatchIndicatorMsgHelper } from "spotify-shared/helpers/opportunity"
import * as moment from "moment";
import warningIcon from '../../../assets/images/warning-red.svg';
import { Translate } from '../../../localize'

const Banner = ({
    hideIfNoBanner = false,
    hideIneligible = false,
    displayfrom,
    displayto,
    oppFlag,
    colorValue,
    qaScore,
    enrollmentStatus,
    _isIneligible,
    chkDisplayIcon,
    colorId,
    colorName,
    showHide,
    sponsored

}) => {

    const prefMatchMsg = getOpportunityPreferenceMatchIndicatorMsgHelper(qaScore);

    const bannerStyle2 = {
        padding: "10px",
        fontFamily: "Arial",
        textAlign: "center",
        backgroundColor: "#203864",
        color: "white"
    };

    const bannerStyle = {
        padding: "10px",
        fontFamily: "Arial",
        textAlign: "center",
        backgroundColor: `#${colorValue}`,
        color: "white"
    };
    const noBannerStyle = {
        padding: "10px",
        fontFamily: "Arial",
        textAlign: "center",
        backgroundColor: "white",
        height: "44px"
    };

    const displayBanner = () => {
        var now = moment();
        var from = moment.utc(displayfrom);
        var to = moment.utc(displayto);

        /* Remove this check per Irena (SAT-4/15)
        /*if (enrollmentStatus == null) {*/
        return from <= now && now <= to;
        /*}
        return false;*/
    }

    return <Translate>
        {({ translate }) => <div className="row">
            {
                /*prefMatchMsg &&
                <div className="col-12 banner" style={bannerStyle}>
                    {prefMatchMsg}
                </div>
                */
            }
            {_isIneligible && hideIneligible === false &&
                <div className="col-12 banner not-eligible" style={bannerStyle2}>
                    <img className="programIcons"
                        style={{
                            "height": "25px"
                        }}
                        src={warningIcon} alt='' />
                    {translate('You are not eligible')}
                </div>
            }

            {displayBanner() &&
                <div className="col-12 banner" style={bannerStyle}>
                    {oppFlag}
                </div>
            }
            {!displayBanner() && hideIfNoBanner === false &&
                <div className="col-12 banner" style={noBannerStyle}></div>
            }
        </div >}
    </Translate>;
}



export default Banner;
