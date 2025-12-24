
import React from 'react'
import { connect } from 'react-redux'
import {
    withRouter
} from 'react-router-dom'

import {
    ensureIsAuthenticatedWithAgentProfile

} from "../../actions/authActions";


const ensureIsAuthenticatedWithAgentProfileComp = Comp => {
    const Wrapper = props => (
        class extends React.Component {

            constructor(props) {
                super(props);
                this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
            }
           

            componentDidMount() {
                this.props.ensureIsAuthenticatedWithAgentProfile();
            }

            isUserAuthenticated() {
                return this.props.agentProfile.agentId != null;
            }

            render() {

                return <Comp isUserAuthenticated={this.isUserAuthenticated} {...this.props} />;
            }
        }
    );

    return withRouter(connect(mapStateToProps, mapDispatchToProps)(Wrapper()));
}

function mapStateToProps(state) {
    return {
        agentProfile: state.agentProfile
    }
}

const mapDispatchToProps = {
    ensureIsAuthenticatedWithAgentProfile
}

export default ensureIsAuthenticatedWithAgentProfileComp
