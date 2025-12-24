import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainLayoutFullNavAuthenticated from "../layouts/MainLayoutFullNavAuthenticated";
import qs from 'qs';
import * as _3rdPartyLinksActions from 'spotify-shared/actions/3rdPartyLinks';
import LoadingComponent from 'spotify-shared-web/components/common/LoadingComponent';
import { withRouter } from 'react-router-dom'


class LMSAuthentication extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const queryString = this.props.location.search.substring(1);
		const queryObj = qs.parse(queryString, { ignoreQueryPrefix: true });
		this.props.generateAbsorbLMSLink(queryObj);
		
	}

	render() {
		return (
				<LoadingComponent />
		);
	}
}

function mapStateToProps(state, props) {
	return {
	}
}

const mapDispatchToProps = {
	generateAbsorbLMSLink: _3rdPartyLinksActions.generateAbsorbLMS
};

export default MainLayoutFullNavAuthenticated(withRouter(connect(
	mapStateToProps,
	{ ...mapDispatchToProps }
)(LMSAuthentication)));

