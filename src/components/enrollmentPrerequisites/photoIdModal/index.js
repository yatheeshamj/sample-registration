
import React, { Fragment, Component } from 'react';
import { Translate } from 'spotify-shared-web/localize'
import ConfirmModal from "spotify-shared-web/components/common/ConfirmModal"
import LoadingComponent from 'spotify-shared-web/components/common/LoadingComponent';
import VideoPlayer from 'spotify-shared-web/components/common/VideoPlayer';
import Buttonspotify from 'spotify-shared-web/components/common/Button';
import { PhotoId_HasClickedOnUrl } from 'spotify-shared/actions/photoId';
import { connect } from 'react-redux';
import "../index.scss";
import warningIcon from "../../../assets/images/warning-red.svg";

class PhotoIdModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userClickedOnUrl: false
		}
		this.handleHasClickedOnUrl = this.handleHasClickedOnUrl.bind(this);
		this.resetUserClickedOnUrl = this.resetUserClickedOnUrl.bind(this);
	}

	handleHasClickedOnUrl() {
		this.setState({ userClickedOnUrl: true });
		this.props.PhotoId_HasClickedOnUrl();
	}

	resetUserClickedOnUrl() {
		this.setState({ userClickedOnUrl: false });
		this.props.onHideModal();
	}

	render() {
		const {
			assessment,
			isModalVisible,
			onSubmit,
			onHideModal
			, photoIdIsFetching
			, photoIdIsStatusLoading
			, photoIdStatusPullCount
			, photoIdError
			, isMobileDevice
			, data
			, photoIdMedia
			, status
		} = this.props;

		return isModalVisible && <Translate>
			{({ translate }) => <Fragment>
				<ConfirmModal
					title={assessment.displayName}
					isVisible={isModalVisible}
					onHide={this.resetUserClickedOnUrl}
					onSubmit={onSubmit}
					okLbl={`Jumio`}
					hideOk={true}
					hideCancel={true}>

					<LoadingComponent hide={photoIdIsFetching == false} />

					{photoIdIsFetching == false &&
						<Fragment>

							<div className="text-center">
								{/* {(photoIdMedia && photoIdMedia.url) &&
								
								!this.state.userClickedOnUrl &&
									<Fragment>
										<VideoPlayer
											url={photoIdMedia.url}
											controls
											width={'100%'}
											height={'100%'}
										/>
										<br />
									</Fragment>
								} */}

								{photoIdMedia &&
									photoIdMedia.url &&
									!this.state.userClickedOnUrl && status &&
									status.redirectUrl &&
									!this.state.userClickedOnUrl ? (
									<Fragment>
										<VideoPlayer
											url={photoIdMedia.url}
											controls
											width={"100%"}
											height={"100%"}
										/>
										<br />

										{!status.reachedMaxAttempts &&
											!status.incodeApiDown &&
											status.canRetry &&
											status.redirectUrl &&
											status.maxAttempts >= status.numberOfAttempts &&
											status.numberOfAttempts >= 1 && (
												<Fragment>
													<br />

													<div className="row align-items-center">
														<div className="col">
															{`Your Photo ID Verification failed. Please try again.`}
															<br />
															<img
																className=""
																style={{
																	height: "25px",
																	marginRight: "10px",
																}}
																src={warningIcon}
																alt=""
															/>{`You have ${status.maxAttempts - status.numberOfAttempts} attempts left.`}
														</div>
													</div>
													<br />
												</Fragment>
											)
										}

									</Fragment>
								) : (
									<Fragment>
										<div>{status.actionContent}</div>
										<img
											className=""
											style={{
												height: "25px",
												marginRight: "10px",
											}}
											src={warningIcon}
											alt=""
										/>{`You have ${Math.max(0, status.maxAttempts - status.numberOfAttempts)} attempts left.`}

										<br />
										<br />
									</Fragment>
								)}

								{(status && status.redirectUrl) && !this.state.userClickedOnUrl && <a target="_blank" rel="noopener noreferrer" href={status && status.redirectUrl} onClick={this.handleHasClickedOnUrl}> Click Here</a>}

								{/* TO SHOW REFERSH STATUS BUTTON */}
								{this.state.userClickedOnUrl &&
									<Fragment>
										<Buttonspotify onClick={this.resetUserClickedOnUrl}>{translate('Refresh Status')}</Buttonspotify>
									</Fragment>
								}
							</div>
						</Fragment>
					}

				</ConfirmModal>
			</Fragment>}
		</Translate>;
	}
}


//#region MapDispatchToProps
const mapDispatchToProps = {
	PhotoId_HasClickedOnUrl: PhotoId_HasClickedOnUrl,
};
//#endregion

function mapStateToProps(state) {
	return {
		PhotoId: state.photoId,
		hasClickedOnUrl: state.photoId.hasClickedOnUrl
	};
}


//#region Export Component
export default connect(mapStateToProps, { ...mapDispatchToProps })(
	PhotoIdModal
);




// export default PhotoIdModal;

