import React, { Component, Fragment } from "react"
import { Translate } from 'spotify-shared-web/localize'
import MainLayoutFullNavAuthenticated from "../layouts/MainLayoutFullNavAuthenticated";
import { connect } from "react-redux";
import ErrorMessage from "spotify-shared-web/components/common/ErrorMessage"

class ErrorPage extends Component {

    constructor(props) {
        super(props)


    }


    render() {

        return <div class="container py-3 mb-3" >
            <Fragment>
                <ErrorMessage title={"Error"} message={"An unknown error has occurred. Please contact support "} />
            </Fragment>
        </div>
    }
}





function mapStateToProps(state, props) {


    return {

    }
}

const mapDispatchToProps = {
    
};

export default MainLayoutFullNavAuthenticated(connect(
    mapStateToProps,
    { ...mapDispatchToProps }
)(ErrorPage));
