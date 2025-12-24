
//framework & 3rd parties
import React, { Component, Fragment } from 'react';
import { Modal, Carousel } from 'react-bootstrap';
import { Translate } from 'spotify-shared-web/localize'
import { fetchWelcomeContent } from 'spotify-shared/actions/welcomeContent';
import { getWelcomeContent } from 'spotify-shared/selectors/welcomeContent';
import { connect } from 'react-redux';
import Slider from '../shared/Slider';


import "./index.scss"

class StateModal extends Component {


	render() {

		const {
			isVisible,
			onHide,
			zeroStateContent
		} = this.props;

		return <Translate>
			{({ translate }) => <Fragment>
				<Modal dialog className="zeroState" id={"ZeroStateModal"}
					show={isVisible}
					onHide={onHide}
				>
					<Modal.Header closeButton>
						<Modal.Title>
							<span className="overlay-title">{zeroStateContent.name}</span>
							<div dangerouslySetInnerHTML={{ __html: zeroStateContent.htmlContent }} />
						</Modal.Title>
					</Modal.Header>
					<Modal.Body className="overlay-body">
						{zeroStateContent && zeroStateContent.relatedContent && zeroStateContent.relatedContent.length > 0 &&
							<Slider items={zeroStateContent.relatedContent} interval={null} />
						}
					</Modal.Body>
					<Modal.Footer>
			

					</Modal.Footer>
				</Modal>
			</Fragment>}
		</Translate>;
	}
}


function mapStateToProps(state, props) {
	return {
		zeroStateContent: getWelcomeContent(state),
	}
}

const mapDispatchToProps = {
};

export default connect(
	mapStateToProps,
	{ ...mapDispatchToProps }
)(StateModal);
