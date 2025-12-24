import "./card.scss"
import React, { Fragment } from 'react';
import Earnings from "../earnings"
import MonthlyRevenue from "../monthlyrevenue";
import MediaWithSelect from "../mediaWithSelect";
import Incentives from "../incentives";


const Breakdown = ({
    hasIncentives,
    monthlyRevenue,
    averageWeeklyHours,
    hourlyRate,
    currencyCode,
    announcementFilePathCSP,
    onLearnMoreClick,
    onWatchVideoClick,
    crmId,
    name,
    _videoLink,
    _pdfLink,
    onDownloadPDF,
    onGeneratespotifyKnowledgeZone,
    spotifyKnowledgeZoneLink
}) =>
    <div className={`col-12 breakdown p-0`} >
        {/*
             Removed on 7/22/2020 as part of  Task 84802:Change Request: Remove Revenue Amount from the Card
            <MonthlyRevenue monthlyRevenue={monthlyRevenue} currencyCode={currencyCode} />
            <Earnings averageWeeklyHours={averageWeeklyHours} hourlyRate={hourlyRate} currencyCode={currencyCode} />
        */}

         {/* <Incentives hasIncentives={hasIncentives} />*/}
        <MediaWithSelect crmId={crmId} name={name}
            _videoLink={_videoLink}
            onDownloadPDF={onDownloadPDF}
            _pdfLink={_pdfLink}
            onLearnMoreClick={onLearnMoreClick}
            onWatchVideoClick={onWatchVideoClick}
            onGeneratespotifyKnowledgeZone={onGeneratespotifyKnowledgeZone}
            spotifyKnowledgeZoneLink={spotifyKnowledgeZoneLink}
        />


    </div>


export default Breakdown;
