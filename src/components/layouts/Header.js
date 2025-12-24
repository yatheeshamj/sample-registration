import "./header.scss";
import SCREEN_CONFIG from "../../screensConfig";

import React, { Component, Fragment } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import LanguageToggle from "./LanguageToggle";
import { NavLink, Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Translate } from "spotify-shared-web/localize";
import classNames from "classnames";
import logo from "../../assets/logo.svg";
// LoadingComponent

import VisibilitySensor from "react-visibility-sensor";
import * as headerActions from "spotify-shared/actions/headerActions";
import { boostrapBreakpoints } from "../../const/helpers";
import * as admissionStepsSelector from "spotify-shared/selectors/admissionSteps";
import * as globalParametersSelector from "spotify-shared/selectors/globalParameters";
import { REACT_APP_PORTAL_BASE_URL, Show_Agent_header } from "../../config";
import {
  REACT_APP_CHANGEPASSWORD_URL,
  Show_ChangePassword_header,
} from "../../config";
import { withRouter } from "react-router-dom";
import { retrieveGlobalParameter } from "spotify-shared/actions/globalParameters";
import {
  generateVALink,
  openBroswerLinkNewWindow,
  openBroswerLinkNewTab,
  CheckspotifyKnowledgeZone,
  generatespotifyKnowledgeZone,
} from "spotify-shared/actions/3rdPartyLinks";
import { GlobalParameterTypes } from "spotify-shared/constants";
import * as LinksSelector from "spotify-shared/selectors/3rdPartyLinks";

import { COUNTRY_IDS, USER_ID } from "../../constants";
import { useScrollTrigger } from "@material-ui/core";
import LoadingComponent from "spotify-shared-web/components/common/LoadingComponent";

import { AgentStatus } from "spotify-shared/constants";
// COUNTRY_IDS


const CURRENT_SCREEN = SCREEN_CONFIG.header;

class Header extends Component {
  constructor() {
    super();
    this.onVAClick = this.onVAClick.bind(this);
    this.openNewWindow = this.openNewWindow.bind(this);
    this.onOpenBroswerLinkNewTab = this.onOpenBroswerLinkNewTab.bind(this);
    this.showFullNav = this.showFullNav.bind(this);
    this.onSetspotifyKnowledgeZone = this.onSetspotifyKnowledgeZone.bind(this);
    this.onGeneratespotifyKnowledgeZone =
      this.onGeneratespotifyKnowledgeZone.bind(this);
  }

  componentDidMount() {
    if (!this.props.MessagesUrl)
      this.props.retrieveGlobalParameter(GlobalParameterTypes.MessagesUrl);
    if (!this.props.FAQUrl)
      this.props.retrieveGlobalParameter(GlobalParameterTypes.FAQUrl);
    if (!this.props.JamaicaFixDate)
      this.props.retrieveGlobalParameter(GlobalParameterTypes.JAMAICA_FIX_DATE);
    
    this.props.retrieveGlobalParameter(GlobalParameterTypes.CDD_Pay_Day_Limit);
    this.props.retrieveGlobalParameter(GlobalParameterTypes.DOLE_GOLIVE_CCD);
  }

  onVAClick() {
    var floatingButtons = document.getElementsByClassName("bcFloat");
    if (
      floatingButtons &&
      floatingButtons[0] &&
      floatingButtons[0].style.display == "block"
    ) {
      floatingButtons[0].querySelector("a").click();
    } else if (
      typeof nanorep != "undefined" &&
      nanorep.floatingWidget &&
      nanorep.floatingWidget.expand
    ) {
      nanorep.floatingWidget.expand();
    }
  }

  onChange = (isVisible) => {
    if (isVisible === true) {
      this.props.setHeaderVisible();
    } else {
      this.props.setHeaderInvisible();
    }
  };
  onChangePassword(url) {
    var title = "Change Password";
    var w = 500;
    var h = 800;

    const dualScreenLeft =
      window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop =
      window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
        ? document.documentElement.clientWidth
        : screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    const newWindow = window.open(
      url,
      title,
      `scrollbars=yes, width=${w / systemZoom}, height=${h / systemZoom
      }, top=${top}, left=${left}`
    );

    if (window.focus && newWindow) newWindow.focus();
  }

  openNewWindow(url) {
    this.props.openBroswerLinkNewWindow(url);
  }

  onOpenBroswerLinkNewTab(url) {
    this.props.openBroswerLinkNewTab(url);
  }

  showFullNav() {
    return (
      this.props.agentProfile.status==AgentStatus.Active ||
      (this.props.agentProfile &&
        this.props.agentProfile.contractorTypeCompleted === true &&
        this.props.agentProfile.registrationType == "506920000")
    );
  }

  onGeneratespotifyKnowledgeZone() {
    this.props.generatespotifyKnowledgeZone({});
  }

  onSetspotifyKnowledgeZone() {
    this.props.CheckspotifyKnowledgeZone({});
  }

  render() {
    const { agentProfile, newHeader } = this.props;
    const navBarTitle = "Join a Service Partner";
    const isUSUser = agentProfile.countryId === COUNTRY_IDS.US;
    const title = (!isUSUser) ? "Select Your Contractor Type" : "Register as a Sole Proprietor";


    return (
      <Fragment>
        <VisibilitySensor onChange={this.onChange} partialVisibility={true}>
          {({ isVisible }) => (
            <Translate>
              {({ translate }) => (
                <Navbar
                  id="mainTopNave"
                  expand="lg"
                  className="justify-content-center bg-white primary-header separator"                >
                  <div
                    className={classNames({
                      container: this.props.width >= boostrapBreakpoints.md,
                      "container-fluid":
                        this.props.width < boostrapBreakpoints.md,
                    })}
                  >
                    <Navbar.Brand className="col-skip-right">
                      <img src={logo} alt="" />
                    </Navbar.Brand>
                    <Navbar.Toggle
                      className="order-first col-skip-left"
                      aria-controls="navbarNav"
                    />
                    <Navbar.Collapse id="navbarNav" className="flex-column">
                      <div className="header-utilities d-flex flex-column align-items-end">
                        <a className="header-utility">
                          <LanguageToggle
                            closeModal={undefined}
                            countryCode={this.props.agentProfile.countryCode} />
                        </a>
                        {Show_Agent_header && (
                          <a className={`header-utility`}>
                            {translate(`${CURRENT_SCREEN}.id`, { userId: USER_ID })} :{" "}
                            <b> {this.props.agentProfile.agentId} </b>
                          </a>
                        )}
                        {Show_Agent_header && (
                          <a className={`header-utility`}>
                            {translate(`${CURRENT_SCREEN}.userName`)} :
                            <b>
                              {" "}
                              {this.props.agentProfile.firstName}{" "}
                              {this.props.agentProfile.lastName}
                              {/*//TODO uncomment this to know countryCode
                               {` ( ${this.props.agentProfile.countryCode} )`} */}
                            </b>
                          </a>
                        )}
                        {!newHeader && <a className="header-utility  pointer">
                          <span
                            className="has-info chng1__getting__Started"
                            onClick={() => this.props.onZeroStateClick()}
                          >
                            {translate(`${CURRENT_SCREEN}.introduction`)}
                          </span>
                        </a> }

                        {this.showFullNav() && (
                          <a
                            className="header-utility pointer"
                            href={`${REACT_APP_PORTAL_BASE_URL}Profile?widget=PCCheckWidget`}
                          >
                            {translate(`${CURRENT_SCREEN}.pcCheck`)}
                          </a>
                        )}

                        

                        <NavLink
                          to={"/logout"}
                          exact={true}
                          activeClassName="active"
                          className={`header-utility chng2 `}
                        >
                          {translate(`${CURRENT_SCREEN}.logout`)}
                        </NavLink>
                      </div>
                      <div
                        id="mainMenuOptions"
                        className={classNames({
                          "nav navbar-nav w-100 h-100 justify-content-center align-items-baseline": true,
                          " fix-header-margin-left":
                            this.props.width >= boostrapBreakpoints.md,
                        })}
                      >
                        
                        {((this.props.location.pathname === "/validateaccount" && this.props.location.search === "?step=pcscan") || this.props.location.pathname.toLowerCase() === "/admissionpccheck" )&& (
                          <a
                            className={classNames({
                              "nav-link pointer": true,
                              active: true,
                              "pt-lg-4": true,
                              // "col-lg-3":true
                            })}
                            key={"aref"}
                          >
                            {translate(`${CURRENT_SCREEN}.pcCheck`)}
                          </a>
                        )}

                        {((this.props.location.pathname === "/validateaccount" && this.props.location.search === "?step=assessment") || this.props.location.pathname.toLowerCase() === "/harverassessment" ) && (
                          <a
                            className={classNames({
                              "nav-link pointer": true,
                              active: true,
                              "pt-lg-4": true,
                              // "col-lg-3":true
                            })}
                            key={"aref"}
                          >
                            {translate(`${CURRENT_SCREEN}.assessment`)}
                          </a>
                        )}
                        
                        {((this.props.location.pathname === "/validateaccount" && this.props.location.search === "?step=education") || this.props.location.pathname.toLowerCase() === "/educationalmodule" )&& (
                          <a
                            className={classNames({
                              "nav-link pointer": true,
                              active: true,
                              "pt-lg-4": true,
                              // "col-lg-3":true
                            })}
                            key={"aref"}
                          >
                             {translate(`${CURRENT_SCREEN}.education`)}
                          </a>
                        )}

                        {this.showFullNav() && (
                          // <li className={`nav-item`} >
                          <a
                            href={`${REACT_APP_PORTAL_BASE_URL}home`}
                            className={`nav-link `}
                          >
                            {translate(`${CURRENT_SCREEN}.portal`)}
                          </a>
                        )}

                        {((this.props.location.pathname.includes("opportunities") ) || (this.props.location.pathname.includes("opportunity")) || (this.props.location.pathname === "/my-preferences")) && (
                          <a
                            className={classNames({
                              "nav-link pointer": true,
                              active:
                                this.props.location.pathname ===
                                "/opportunities",
                              "pt-lg-4": true,
                              // "col-lg-3":true
                            })}
                            key={"aref"}
                            onClick={() => {
                              this.props.history.push("/opportunities");
                            }}
                          >
                            {" "}
                            {this.props.shouldShowWaitList  ? translate("waitList") : translate("Client Opportunities")}
                          </a>
                        )}
                        {this.props.location.pathname === "/contractortype" && (new URLSearchParams(this.props.location.search).get('type') === null) && (
                          <a
                            className={classNames({
                              "nav-link pointer": true,
                              active:
                                this.props.location.pathname ===
                                "/contractortype",
                              "pt-lg-4": true,
                              // "col-lg-3":true
                            })}
                            key={"aref"}
                          // onClick={() => {
                          //   this.props.history.push("/contractortype");
                          // }}
                          >
                            {/* {title} */}
                            {translate(`${CURRENT_SCREEN}.selectYourContractorTypeHeader`)}

                          </a>
                        )}

                        {this.props.location.pathname === "/contractortype" && (new URLSearchParams(this.props.location.search).get('type') !== null) && (
                          <a
                            className={classNames({
                              "nav-link pointer": true,
                              active:
                                this.props.location.pathname ===
                                "/contractortype",
                              "pt-lg-4": true,
                              // "col-lg-3":true
                            })}
                            key={"aref"}
                          // onClick={() => {
                          //   this.props.history.push("/contractortype");
                          // }}
                          >
                            {/* {" "}
                            {(new URLSearchParams(this.props.location.search).get('type').toLowerCase()==="work for someone else") ? (<Fragment>
                              {navBarTitle}
                            </Fragment>):new URLSearchParams(this.props.location.search).get('type')}{" "} */}
                            {translate(new URLSearchParams(this.props.location.search).get('type').toLowerCase())}
                          </a>
                        )}

                        {(this.props.location.pathname === "/contractortype/soleproprietor" || this.props.location.pathname === "/contractortype/soleproprietor-us" || this.props.location.pathname === "/contractortype/soleproprietor-in") && (
                          <a
                            className={classNames({
                              "nav-link pointer": true,
                              active: true,
                              "pt-lg-4": true,
                              // "col-lg-3":true
                            })}
                            key={"aref"}

                          >
                            {" "}
                            {translate(`${CURRENT_SCREEN}.registerAsSoleProprietor`)}{" "}
                          </a>
                        )}

                        {(this.props.location.pathname === "/contractortype/soleproprietor-jm") && (
                          <a
                            className={classNames({
                              "nav-link pointer": true,
                              active: true,
                              "pt-lg-4": true,
                              // "col-lg-3":true
                            })}
                            key={"aref"}

                          >
                            {" "}
                            Register as a Sole Trader{" "}
                          </a>
                        )}

                        {(this.props.location.pathname === "/contractortype/join-business" || this.props.location.pathname === "/contractortype/joinservicepartner" || this.props.location.pathname === "/contractortype/joinservicepartner-us") && (
                          <a
                            className={classNames({
                              "nav-link pointer": true,
                              active: true,

                              "pt-lg-4": true,
                              // "col-lg-3":true
                            })}
                            key={"aref"}

                          >
                            {" "}
                            {translate(`${CURRENT_SCREEN}.joinAServicePartner`)}{" "}
                          </a>
                        )}

                        {(this.props.location.pathname === "/contractortype/register-business" || this.props.location.pathname === "/contractortype/servicepartner" || this.props.location.pathname === "/contractortype/servicepartner-us") && (
                          <a
                            className={classNames({
                              "nav-link pointer": true,
                              active: true,
                              "pt-lg-4": true,
                              // "col-lg-3":true
                            })}
                            key={"aref"}
                            onClick={() => {
                              this.props.history.push("/contractortype/register-business");
                            }}
                          >
                            {" "}
                            {translate(`${CURRENT_SCREEN}.registerYourCompany`)}{" "}
                          </a>
                        )}
                        {this.showFullNav() && (
                          <NavDropdown
                            title={translate(`${CURRENT_SCREEN}.support.heading`)}
                            id="Support-nav-dropdown"
                          >
                            {/*<NavDropdown.Item
                              href="javascript:void(0)"
                              onClick={this.onVAClick}
                            >
                              {translate(`${CURRENT_SCREEN}.support.spotifyVirtualAssistant`)}
                            </NavDropdown.Item> */}
                            <NavDropdown.Item
                              href="javascript:void(0)"
                              onClick={() =>
                                this.onOpenBroswerLinkNewTab(
                                  "https://www.spotifyworkfromhome.com/equipment/"
                                )
                              }
                            >
                              {translate(`${CURRENT_SCREEN}.support.systemEquipment`)}
                            </NavDropdown.Item>
                            <NavDropdown.Item
                              href="javascript:void(0)"
                              onClick={() =>
                                this.openNewWindow(
                                  "https://spotify.service-now.com/"
                                )
                              }
                            >
                              {translate(`${CURRENT_SCREEN}.support.incidentStatus`)}
                            </NavDropdown.Item>
                            {
                              <NavDropdown.Item
                                href="javascript:void(0)"
                                onClick={this.onGeneratespotifyKnowledgeZone}
                              >
                                {translate(`${CURRENT_SCREEN}.support.knowledgeZone`)}
                              </NavDropdown.Item>
                            }
                            {this.props.FAQUrl && (
                              <NavDropdown.Item
                                href={this.props.FAQUrl}
                                target="_blank"
                              >
                                {translate(`${CURRENT_SCREEN}.support.portalFAQ`)}
                              </NavDropdown.Item>
                            )}
                          </NavDropdown>
                        )}

                        {this.showFullNav() && (
                          <NavDropdown
                            title={translate(`${CURRENT_SCREEN}.profile.heading`)}
                            id="My-Profile-nav-dropdown"
                          >
                            <NavDropdown.Item
                              target="_self"
                              href={`${REACT_APP_PORTAL_BASE_URL}/Profile`}
                            >
                              {translate(`${CURRENT_SCREEN}.profile.heading`)}
                            </NavDropdown.Item>
                            <NavDropdown.Item
                              target="_self"
                              href={`${REACT_APP_PORTAL_BASE_URL}/business`}
                            >
                              {translate(`${CURRENT_SCREEN}.profile.information`)}
                            </NavDropdown.Item>
                            {this.props.MessagesUrl && (
                              <NavDropdown.Item
                                href={this.props.MessagesUrl}
                                target="_blank"
                              >
                                {translate(`${CURRENT_SCREEN}.profile.messaging`)}
                              </NavDropdown.Item>
                            )}
                            <NavDropdown.Item
                              href="javascript:void(0)"
                              onClick={() =>
                                this.onChangePassword(
                                  `${REACT_APP_CHANGEPASSWORD_URL}`
                                )
                              }
                            >
                              {translate(`${CURRENT_SCREEN}.profile.changePassword`)}
                            </NavDropdown.Item>
                          </NavDropdown>
                        )}
                      </div>
                    </Navbar.Collapse>
                  </div>
                </Navbar>
              )}
            </Translate>
          )}
        </VisibilitySensor>
      </Fragment>
    );
  }
}

//#region MapStateToProps

function mapStateToProps(state, props) {
  const { agentProfile } = state;
  const isAgentTypeComplete = admissionStepsSelector.isAgentTypeComplete(state);
  const canPickAClient = admissionStepsSelector.canPickAClient(state);
  const FAQUrl = globalParametersSelector.getGlobalParameterByString(
    state,
    GlobalParameterTypes.FAQUrl
  );
  const MessagesUrl = globalParametersSelector.getGlobalParameterByString(
    state,
    GlobalParameterTypes.MessagesUrl
  );
  const spotifyKnowledgeZoneLink = LinksSelector.spotifyknowledgeZoneResults(state);

  return {
    agentProfile: state.agentProfile,
    width: state.window.width,
    isAgentTypeComplete,
    canPickAClient,
    MessagesUrl,
    FAQUrl,
    spotifyKnowledgeZoneLink,
    agentProfile
  };
}
//#endregion

//#region MapDispatchToProps

const mapDispatchToProps = {
  setHeaderVisible: headerActions.setHeaderVisible,
  setHeaderInvisible: headerActions.setHeaderInvisible,
  retrieveGlobalParameter: retrieveGlobalParameter,
  generateVALink: generateVALink,
  openBroswerLinkNewWindow: openBroswerLinkNewWindow,
  openBroswerLinkNewTab: openBroswerLinkNewTab,
  CheckspotifyKnowledgeZone: CheckspotifyKnowledgeZone,
  generatespotifyKnowledgeZone: generatespotifyKnowledgeZone,
};
//#endregion

//#region Export Component
export default connect(mapStateToProps, { ...mapDispatchToProps })(
  withRouter(Header)
);
//#endregion
