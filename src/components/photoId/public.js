import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainLayoutFullNavAuthenticated from "../layouts/MainLayoutFullNavAuthenticated";
import qs from 'qs';
import * as _3rdPartyLinksActions from 'spotify-shared/actions/3rdPartyLinks';
import LoadingComponent from 'spotify-shared-web/components/common/LoadingComponent';
import { withRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout';
import * as photoIdActions from "spotify-shared/actions/photoId"
import * as photoIdSelectors from "spotify-shared/selectors/photoId"
import Buttonspotify from 'spotify-shared-web/components/common/Button'

class ResultsPage extends Component {
    state = {}
    constructor(props) {
        super(props);

        this.GoToOpportunity = this.GoToOpportunity.bind(this);
    }

    componentDidMount() {
        //?transactionStatus=ERROR&customerInternalReference=36b9886f-551d-ec11-b866-005056ba4d44&transactionReference=31ed613f-19ed-43fb-bbb4-ac93e4bd7c6d&errorCode=9200
        const queryString = this.props.location.search.substring(1);
        const queryObj = qs.parse(queryString, { ignoreQueryPrefix: true });

        console.log(queryObj)

        let customerInternalReference = queryObj["customerInternalReference"];
        let errorCode = queryObj["errorCode"];
        let transactionReference = queryObj["transactionReference"];
        let transactionStatus = queryObj["transactionStatus"];

        let obj = {
            customerInternalReference,
            errorCode,
            transactionReference,
            transactionStatus
        };

        this.setState({
            ...obj
        });

        this.props.photoIdResponse(obj);


        setTimeout(() => {
            this.GoToOpportunity();
        }, 5 * 60 * 1000);

    }

    GoToOpportunity() {
        const { customerInternalReference } = this.state;

        let _split = customerInternalReference.split("|");
        var enrollmentId = _split[0]
        var opportunityId = _split[1]
        this.props.history.push(`/opportunity/${opportunityId}/enrollment-prerequisites/${enrollmentId}`);
        //window.location.href = `/opportunity/${opportunityId}/enrollment-prerequisites/${enrollmentId}`
    }

    render() {
        return (
            <>
                <MainLayout
                    headerTitle='Jumio'
                    navTitle=''
                    navLinkPath=''
                    navLinkName=''
                >
                    <div >

                        {this.state.transactionStatus === 'SUCCESS' &&
                            <div>

                            </div>
                        }
                        {this.state.transactionStatus === 'ERROR' &&
                            <div>

                            </div>
                        }

                        <p>
                            You have completed the Photo ID submission process. It may take up to 5 minutes to process the results.
                            Please wait 5 minutes for this page to refresh and display the results.
                            <br />
                            Thank you.
                        </p>

                        <Buttonspotify onClick={this.GoToOpportunity}>
                            Refresh Page to See Status
                        </Buttonspotify>


                    </div>
                </MainLayout>
                <MainLayoutFooter />
            </>
        );
    }
}

function mapStateToProps(state, props) {
    return {
    }
}

const mapDispatchToProps = {
    photoIdResponse: photoIdActions.photoIdResponse
};

export default (withRouter(connect(
    mapStateToProps,
    { ...mapDispatchToProps }
)(ResultsPage)));

