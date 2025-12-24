import "./Card/card.scss"
import React, { Fragment } from 'react';
import Buttonspotify from '../common/Button';
import videoIcon from '../../assets/images/watchVideo.png';
import infoIcon from '../../assets/images/viewFlyer.png';
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Translate } from '../../localize';
import Incentives from "../../components/opportunities/incentives";
import KnowledgezoneIcon from '../../assets/images/knowledgeZone.png';
import commonStyle from '../../../src/components/shared/CommonStyle.module.scss';
import SCREEN_CONFIG from "../../../src/screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.opportunitiesCard;

const MediaWithSelect = ({
    announcementFilePathCSP,
    crmId,
    name,
    onLearnMoreClick,
    onWatchVideoClick,
    canLearnMore,
    _videoLink,
    _pdfLink,
    onDownloadPDF,
    hasIncentives,
    onGeneratespotifyKnowledgeZone,
    spotifyKnowledgeZoneLink
}) =>

    <Translate>
        {({ translate }) => {
            return (<Fragment>

                <div className="d-flex flex-column flex-grow-1 justify-content-between" >
                    <div className=" btn-toolbar flex-column" role="toolbar" aria-label="Toolbar with button groups">

                        <div className={`d-flex`}>
                            {(_videoLink != null || _pdfLink != null) && <small className={`p-0 col-sm-4 text-left ${commonStyle['align-left']} learn-more`}>{translate(`${CURRENT_SCREEN}.learnMore`)}</small>}
                            <Incentives className={`col-sm-6 ${commonStyle['align-right']}`} hasIncentives={hasIncentives} />
                        </div>
                        <div className={`btn-group col-xs-2`} role="group" aria-label="Second group">

                            {
                                <OverlayTrigger
                                    placement={'left'}
                                    overlay={
                                        <Tooltip className="spotify-tooltip" id={`tooltip-left`}>
                                            {translate(`${CURRENT_SCREEN}.knowledgeZone`)}
                                        </Tooltip>
                                    }>

                                    <button data-opportunity-id={crmId} data-opportunity-name={name}
                                        className="opportunity-video mr-1 btn btn-primary btnNew btn-icon-img btn-icon-knowledgeimg " onClick={() => onGeneratespotifyKnowledgeZone()}>
                                        <img src={KnowledgezoneIcon} alt='' className={` photoIcon`} />
                                    </button>

                                </OverlayTrigger>
                            }

                            {_videoLink != null && _videoLink.sourceURL != null &&
                                <OverlayTrigger
                                    placement={'top'}
                                    overlay={
                                        <Tooltip className="spotify-tooltip" id={`tooltip-left`}>
                                            {translate(`${CURRENT_SCREEN}.watchVideo`)}
                                        </Tooltip>
                                    }>
                                    <button data-opportunity-id={crmId} data-opportunity-name={name}
                                        className="opportunity-video ml-3 mr-1 btn btn-primary btnNew btn-icon-img " onClick={() => onWatchVideoClick(_videoLink)}>
                                        <img src={videoIcon} alt='' className={`videoicon`} />
                                    </button>
                                </OverlayTrigger>
                            }

                            {_pdfLink != null &&
                                <OverlayTrigger
                                    placement={'top'}
                                    overlay={
                                        <Tooltip className="spotify-tooltip" id={`tooltip-top`}>
                                            {translate(`${CURRENT_SCREEN}.viewPdf`)}
                                        </Tooltip>
                                    }>
                                    <button 
                                        data-opportunity-id={crmId} 
                                        data-opportunity-name={name} 
                                        className="opportunity-announcements ml-3  btn btn-primary btnNew btn-icon-img" 
                                        onClick={() => onDownloadPDF(_pdfLink)}> 
                                        <img src={infoIcon} alt='' className={`infoicon`} />
                                    </button>
                                </OverlayTrigger>
                                /* Add logic to upload opportunity detail to localstorage */
                            }
                        </div>
                    </div>
                    <div className="d-flex flex-row " >
                        <div className=" btn-group flex-grow-1 mb-4" role="group" aria-label="Third group">

                            <OverlayTrigger
                                placement={'right'}
                                overlay={
                                    <Tooltip className="spotify-tooltip" id={`tooltip-right`}>
                                        {translate(`${CURRENT_SCREEN}.learnMore`)}
                                    </Tooltip>
                                }>
                                <Buttonspotify className="" disabled={canLearnMore === false} onClick={() => onLearnMoreClick(crmId)} style={{ "height": "46px", "fontSize": "14px", "lineHeight": "14px", "fontWeight": "600", "fontStyle": "normal" }} >{translate(`${CURRENT_SCREEN}.getStartedButton`)}</Buttonspotify>
                            </OverlayTrigger>
                        </div>
                    </div>
                </div>

            </Fragment>

            )
        }}

    </Translate>;

export default MediaWithSelect;
