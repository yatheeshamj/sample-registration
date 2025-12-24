import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './AgentType.module.scss';
import classNames from "classnames";
import MainLayout from '../layouts/MainLayout';
import LoadingComponent from 'spotify-shared-web/components/common/LoadingComponent';
import AgentTypeList from './AgentTypeList';
import AgentTypeHelp from './AgentTypeHelp';
import RegisterIndividualIcon from '../../assets/images/agentType/sole-proprietor.svg';
import JoinBusinessIcon from '../../assets/images/agentType/working-for-call-center.svg';
import { Translate } from 'spotify-shared-web/localize'
import { logoutRedirect } from '../../actions/loginActions';
import { getMedia, selectBusinessPath } from '../../actions/agentTypeActions';
import { AdmissionStep, COUNTRY_IDS, AgentPath } from '../../constants';
import { Fragment } from 'react';
import Button from 'spotify-shared-web/components/common/Button';
import { history } from "../../store";
import commonStyle from "../shared/CommonStyle.module.scss";
class AgentType extends Component {
    state = {
        isTermsChecked: true,
        isAgeChecked: true,
        majorType: undefined
    };


    handleTermsCheckboxChange = () => {
        this.setState({
            isTermsChecked: !this.state.isTermsChecked
        });
    };

    handleAgeCheckboxChange = () => {
        this.setState({
            isAgeChecked: !this.state.isAgeChecked
        });
    };

    handleBackLink = () => {
        this.setState({ majorType: undefined })
        // history.
        history.push({
            path: '/contractortype',
        })
    }

    componentDidMount() {
        // alert("error inside AgentType-New")
        const { agentProfile } = this.props
        this.props.getMedia(agentProfile.countryId);
        const isCheckboxChecked = localStorage.getItem('isCheckboxChecked');
        isCheckboxChecked && this.setState({
            isTermsChecked: true,
            isAgeChecked: true
        })
        localStorage.removeItem('isCheckboxChecked')
        const isUSUser = agentProfile.countryId === COUNTRY_IDS.US;
        const isJMUser = agentProfile.countryId === COUNTRY_IDS.JM;
        const isINUser = agentProfile.countryId === COUNTRY_IDS.IN;

        //JM-Code
        if (isJMUser) {
            this.handleAgentTypeSelect()
        }
    }

    renderAgentMajorTypes = () => {
        const { isAgeChecked, isTermsChecked } = this.state;
        const { agentProfile } = this.props;
        const isDisabled = !isTermsChecked || !isAgeChecked;
        const isCAUser = agentProfile.countryId === COUNTRY_IDS.CA;
        const isUKUser = agentProfile.countryId === COUNTRY_IDS.UK;
        const isUSUser = agentProfile.countryId === COUNTRY_IDS.US;
        //JM-Code
        const isJMUser = agentProfile.countryId === COUNTRY_IDS.JM;
        const isINUser = agentProfile.countryId === COUNTRY_IDS.IN;

        const agentMajorTypes = [

            {
                childTypes: [AdmissionStep.JOIN_BUSINESS],
                greyText: "I want to",
                blueText: "WORK FOR SOMEONE ELSE",
                backText: "Want to explore alternatives?",
                icon: JoinBusinessIcon,
                id: "btnJoinBusiness"
            },
            {
                childTypes: [AdmissionStep.SOLE_PROPRIETOR, AdmissionStep.NEW_CALL_CENTER],
                greyText: "I want to",
                blueText: "BE MY OWN BOSS",
                backText: "Want to explore alternatives?",
                icon: RegisterIndividualIcon,
                id: "btnBeOwnBoss"
            }
        ]

        return (<Translate>
            {({ translate }) => <>
                <div className={`h-100 row`}>
                    {/* JM-Code */}
                    {(isJMUser) &&
                        <div className={`col-12`}>
                            <Button color="orange" size="medium"
                                onClick={() => {
                                    if (!isDisabled) {
                                        //this.setState({ majorType: agentMajorTypes[0]})
                                        this.handleAgentTypeSelect()
                                    }
                                }}
                                disabled={isDisabled}
                                id={agentMajorTypes[0].id}>
                                {translate("Next")}
                            </Button>
                        </div>
                    }
                    {(isUSUser || isCAUser || isUKUser || isINUser) &&
                        agentMajorTypes.map((type, index) => (
                            <div key={index} className={`col-lg-6 col-md-6 col-sm-12 pt-sm-3 pt-lg-0 `}>
                                <div className={`h-100 row`}>
                                    <div className={`col-12 p-lg-3`}>
                                        <div className={`${styles["AgentMajorType-card"]} `}>
                                            <div className={`text-center ${styles['img-container']}`}>
                                                <img
                                                    // className={`img-fluid`}
                                                    src={type.icon}
                                                    alt=""
                                                />
                                            </div>
                                            <div className={`${styles['card-h']}`}>
                                                <h4 className={`${styles["font2-lineHeight2"]} `}>{translate(type.greyText)}</h4>
                                                <Button
                                                    color="primary"
                                                    size="block"
                                                    onClick={() => {
                                                        if (!isDisabled) {
                                                            history.push({
                                                                path: '/contractortype',
                                                                search: '?type=' + `${translate(type.blueText)}`
                                                            })
                                                            this.setState({ majorType: type });

                                                        }

                                                    }}
                                                    disabled={isDisabled}
                                                    id={type.id}
                                                >
                                                    {translate(type.blueText)}
                                                </Button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </>}
        </Translate>)
    }

    handleAgentTypeSelect = () => {
        const { agentProfile } = this.props;
        this.props.selectBusinessPath(
            agentProfile.agentId,
            AgentPath.SOLE_PROPRIETOR
        );
    };

    render() {
        const { agentProfile, agentType, agentTypeSteps, logoutRedirect, admissionSteps } = this.props;
        const { isAgeChecked, isTermsChecked } = this.state;
        const isCAUser = agentProfile.countryId === COUNTRY_IDS.CA;
        const isUKUser = agentProfile.countryId === COUNTRY_IDS.UK;
        const isUSUser = agentProfile.countryId === COUNTRY_IDS.US;
        //JM-Code
        const isJMUser = agentProfile.countryId === COUNTRY_IDS.JM;

        return (<Translate>
            {({ translate }) => <>
                <Fragment>
                    {agentType.isSelectingPath || admissionSteps.isFetchInProgress ? (
                        <LoadingComponent />
                    ) : (
                        <Fragment>
                            <div className='row'>
                                <div className='col-xl-6  col-lg-9 col-md-10 offset-md-1 offset-lg-0 col-12'>
                                    {agentType.redirectMessage && (
                                        <div className={styles['server-error']}>
                                            {agentType.redirectMessage}
                                        </div>
                                    )}
                                    { }

                                    {/* JM-Code */}
                                    {!this.state.majorType && !isJMUser && <Fragment>
                                        <br />
                                        <h1>{(isUSUser || isUKUser || isCAUser || isINUser) ? translate("HOW WILL YOU USE THE PLATFORM?") : translate("BEGIN YOUR JOURNEY ON THE spotify® PLATFORM")}</h1>
                                        {(isUSUser || isUKUser || isCAUser || isINUser) && <p className={styles['font1-lineHeight1']}>{translate("You can use the platform to run a home-based business or as an agent working for a Service Partner in the network.")}</p>}

                                        {/* <h4  className={styles['font2-lineHeight2']}>{translate("Please confirm the following…")}</h4> */}
                                        {/* <div className={styles['tos-inputs-wrapper']}>
                                                <input
                                                    name='age'
                                                    type='checkbox'
                                                    className={styles['checkbox-input']}
                                                    checked={isAgeChecked}
                                                    onChange={this.handleAgeCheckboxChange}
                                                />
                                                <p className={styles['font1-lineHeight1']}>
                                                    {translate("I'm over 18.")}
                                                </p>
                                            </div>
                                            <div className={styles['tos-inputs-wrapper']}>
                                                <input
                                                    name='terms'
                                                    type='checkbox'
                                                    className={styles['checkbox-input']}
                                                    checked={isTermsChecked}
                                                    onChange={this.handleTermsCheckboxChange}
                                                />
                                                <p className={styles['font1-lineHeight1']}>
                                                    {translate("contractortypeCheckbox")}
                                                </p>
                                            </div> */}
                                        {/* <br /> */}
                                        {(isUSUser || isUKUser || isCAUser || isINUser) && <h4 className={styles['font2-lineHeight2']}>{translate("Now explore your options!")}</h4>}
                                    </Fragment>}
                                </div>
                            </div>

                            <div className='row col-skip'>
                                <div className={classNames({
                                    "col-lg-6 col-md-12 px-md-0 px-lg-4 px-xl-3 ": !this.state.majorType,
                                    "col-lg-12 px-md-0 px-lg-3": this.state.majorType,

                                })}>
                                    {
                                        this.state.majorType
                                            ? (<AgentTypeList
                                                agentTypeSteps={agentTypeSteps}
                                                agentProfile={agentProfile}
                                                agentId={agentProfile.agentId}
                                                isTermsChecked={isAgeChecked && isTermsChecked}
                                                majorType={this.state.majorType}
                                                handleBackLink={this.handleBackLink}
                                            />
                                            )
                                            : this.renderAgentMajorTypes()
                                    }
                                </div>
                                <div className='col-lg-6 col-md-12 pt-sm-4 p-lg-3 pr-lg-0 px-md-0'>
                                    {(isUSUser || isCAUser || isUKUser || isINUser) && !this.state.majorType && <AgentTypeHelp media={agentType.media} />}
                                </div>
                            </div>
                        </Fragment>
                    )}
                </Fragment>
            </>}
        </Translate>);
    }
}
const mapStateToProps = ({
    agentProfile,
    agentType,
    auth,
    registration,
    admissionSteps
}) => {
    return { agentProfile, agentType, auth, registration, admissionSteps };
};
export default connect(
    mapStateToProps,
    { logoutRedirect, getMedia, selectBusinessPath }
)(AgentType);
