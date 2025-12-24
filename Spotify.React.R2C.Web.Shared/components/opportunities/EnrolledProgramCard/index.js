

import React, { Fragment, Component } from 'react';

import { Row, Col, Button, Modal } from 'react-bootstrap';
import CardTitle from "../Card/cardtitle";
import InProgressDetails from "../Card/inProgressDetails";
import InProgressActions from "../Card/inProgressActions";
import classNames from "classnames"

import * as _3rdPartyLinksActions from "spotify-shared/actions/3rdPartyLinks"
import * as enrolledProgramSelectors from "spotify-shared/selectors/enrolledPrograms"
import * as enrolledProgramActions from "spotify-shared/actions/enrolledPrograms"
import * as performanceMetricsSelector from "spotify-shared/selectors/performanceMetrics"
import * as LinksSelector from "spotify-shared/selectors/3rdPartyLinks";


class EnrolledProgramCard extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };




        this.onOpenStarmatic = this.onOpenStarmatic.bind(this);
        this.onGenerateChatRoom = this.onGenerateChatRoom.bind(this);
        this.onGenerateKnowledgeZone = this.onGenerateKnowledgeZone.bind(this);



        this.onGenerateSelfPaced = this.onGenerateSelfPaced.bind(this);
        this.onGenerateVirtualClassroom = this.onGenerateVirtualClassroom.bind(this);
        this.onGenerateCrowdhub = this.onGenerateCrowdhub.bind(this);
        this.onGeneratespotifyKnowledgeZone = this.onGeneratespotifyKnowledgeZone.bind(this);
        //this.onSetspotifyKnowledgeZone = this.onSetspotifyKnowledgeZone.bind(this);

    }

    componentDidMount() {
       // if(!this.props.spotifyKnowledgeZoneLink)  this.onSetspotifyKnowledgeZone();
    }

    onDownloadPDF(pdfLink) {
        this.props.downloadPDFForWeb(pdfLink);
    }
    //changes
    onGenerateSelfPaced(primaryClassSchedule,opportunitycrmId) {
        this.props.generateSelfPaced({primaryClassSchedule,opportunitycrmId});
    }

    // onGenerateSelfPaced(primaryClassSchedule,) {
    //     this.props.generateSelfPaced(primaryClassSchedule);
    // }

    onGenerateVirtualClassroom(primaryClassSchedule) {
        this.props.generateVirtualClassroom(primaryClassSchedule);
    }

    onGenerateCrowdhub({ enrolledProgram, programCrmId }) {
        this.props.generateCrowdhub({ enrolledProgram, programCrmId });
    }


    onInProgressResumeClick() {
        this.props.onInProgressResumeClick(this.props.crmId, this.props.enrollmentId)
    }

    onOpenStarmatic({ programCrmId }) {
        this.props.openStarmatic(programCrmId)
    }

    onGenerateChatRoom({ programCrmId }) {
        this.props.generateChatRoom(programCrmId)
    }

    onGenerateKnowledgeZone({ enrolledProgram, programCrmId }) {
        this.props.generateKnowledgeZone({ enrolledProgram, programCrmId })
    }

   /* onSetspotifyKnowledgeZone()
    {
        this.props.checkspotifyKnowledgeZone({});
    }  */
    
    onGeneratespotifyKnowledgeZone()
    {
        this.props.generatespotifyKnowledgeZone({});
    }


    render() {
        const {
            enrolledProgram,
            commitmentAdherencePercentage,
            currentOrNextSlotDateTimeProgram



        } = this.props;

        return <div className="OpportunityCardWrapper">

            <Col className={classNames({
                "OpportunityCard": true,
                "InProgress": true
            })}>
                <div className="OpportunityCardHeader">
                    <CardTitle _logo={enrolledProgram.logoUrl} _title={enrolledProgram.programName} />

                </div>
                <div className="OpportunityCardBody">
                    <InProgressDetails
                        overallStarRating={this.props.overallStarRating}
                        enrolledProgram={enrolledProgram}
                        commitmentAdherencePercentage={commitmentAdherencePercentage}
                        currentOrNextSlotDateTimeProgram={currentOrNextSlotDateTimeProgram}
                        onDownloadPDF={this.onDownloadPDF}
                        onGenerateSelfPaced={this.onGenerateSelfPaced}
                        onGenerateVirtualClassroom={this.onGenerateVirtualClassroom}
                        onGenerateCrowdhub={this.onGenerateCrowdhub}
                        hideDates={true} />

                </div>
                <div className="OpportunityCardFooter row">
                    <InProgressActions
                       {...this.props}
                        programCrmId={enrolledProgram.crmId}
                        enrolledProgram={enrolledProgram}
                        onDownloadPDF={this.onDownloadPDF}
                        onGenerateSelfPaced={this.onGenerateSelfPaced}
                        onGenerateVirtualClassroom={this.onGenerateVirtualClassroom}
                        onGenerateCrowdhub={this.onGenerateCrowdhub}
                        onOpenStarmatic={this.onOpenStarmatic}
                        onGenerateChatRoom={this.onGenerateChatRoom}
                        onGenerateKnowledgeZone={this.onGenerateKnowledgeZone}
                        onGeneratespotifyKnowledgeZone = {this.onGeneratespotifyKnowledgeZone}

                    />


                </div>
            </Col>
        </div>;
    }
}



export default function CardConnect(reduxConnect, extendStateToProps, extendsDispatchToProps = {}) {


    function mapStateToProps(state, props) {

        const opportunityProgramId = props.enrolledProgram.crmId;
        const overallStarRating = performanceMetricsSelector.getMetricForProgram(state, opportunityProgramId)
        const commitmentAdherencePercentage = performanceMetricsSelector.getCommitmentAdherencePercentage(state, opportunityProgramId)
        const currentOrNextSlotDateTimeProgram = performanceMetricsSelector.getCurrentOrNextSlotDateTimeProgram(state, opportunityProgramId)
        const spotifyKnowledgeZoneLink = LinksSelector.spotifyknowledgeZoneResults(state);

        //
        const extendedState = extendStateToProps !== undefined ? extendStateToProps(state, props) : {}

        return {
            agentProfile: state.agentProfile,
            enrolledProgram: props.enrolledProgram,
            overallStarRating,
            commitmentAdherencePercentage,
            currentOrNextSlotDateTimeProgram,
            spotifyKnowledgeZoneLink,
            // extends with passed in props if any
            ...extendedState
        }
    }

    const mapDispatchToProps = {

        generateSelfPaced: _3rdPartyLinksActions.generateSelfPaced
        , generateVirtualClassroom: _3rdPartyLinksActions.generateVirtualClassroom
        , generateCrowdhub: _3rdPartyLinksActions.generateCrowdhub
        , openStarmatic: _3rdPartyLinksActions.openStarmatic
        , generateChatRoom: _3rdPartyLinksActions.generateChatRoom
        , generateKnowledgeZone: _3rdPartyLinksActions.generateKnowledgeZone
        , generatespotifyKnowledgeZone: _3rdPartyLinksActions.generatespotifyKnowledgeZone
        //, checkspotifyKnowledgeZone: _3rdPartyLinksActions.CheckspotifyKnowledgeZone
        // extends with passed in props if any
        , ...extendsDispatchToProps
    };



    return reduxConnect(
        mapStateToProps,
        { ...mapDispatchToProps }
    )(EnrolledProgramCard);
}

