import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Field, Form } from "formik";
import styles from "./JoinBusinessForm.module.scss";
import { getJoinBusinessStatus } from "../../../actions/agentTypeActions";
import TextField from "@material-ui/core/TextField";
import { Translate } from "spotify-shared-web/localize";
import Button from "spotify-shared-web/components/common/Button";
import formHelpers from "spotify-shared/helpers/formHelpers";
import FindCallCenter from "./FindCallCenter";
import { COUNTRY_IDS } from "../../../constants";
import { useInputStyles } from "../../../styles";
import classNames from "classnames";
import commonStyle from "../../../../src/components/shared/CommonStyle.module.scss";
import SCREEN_CONFIG from "../../../screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.registerAsServicePartner;

const JoinBusinessForm = ({
  form,
  field,
  errors,
  touched,
  values,
  handleChange,
  handleBlur,
  setFieldValue,
  setFieldTouched,
  joinBusiness,
  handleRestartClick,
  agentProfile,
  getBusinessByFein,
  getBusinessById,
  handleModalOpen,
  agentType,
  setFieldError,
  joinBusinessScreenConfig

}) => {
  const classes = useInputStyles();


  return (
    <Translate>
      {({ translate }) => (
        <>
          <div>
            <Form>
              {joinBusiness.error ? (
                <div className={styles["server-error"]}>
                  {joinBusiness.error}
                </div>
              ) : null}

              <div className={`row`}>
                {/* {agentProfile.countryId !== COUNTRY_IDS.UK &&
                  agentProfile.countryId !== COUNTRY_IDS.CA && ( */}
                <>
                  <div
                    className={`${joinBusinessScreenConfig.searchByBusinessId.display
                      ? 'col-md-6 col-lg-10 col-xl-6 col-xxl-5 col-sm-1 pd-md-3'
                      : ''
                      } ${styles["fein-field"]}`}
                  >
                    {joinBusinessScreenConfig.searchByBusinessId.display && <div className={` input-group`}>
                      <Field
                        id="fein"
                        name="fein"
                        type="string"
                        autoComplete="off"
                        onChange={(e) => {
                          formHelpers.isValueNumber(e.target.value) &&
                            handleChange(e);
                        }}
                        classes={{
                          root:
                            !(
                              (joinBusiness["fein"].error && values.fein) ||
                              errors["fein"]
                            ) && classes.root,
                        }}
                        fullWidth
                        value={values.fein}
                        placeholder={translate(`${CURRENT_SCREEN}.businessIdPlaceholder`)}
                        className={classNames({
                          "form-control": true,
                          root:
                            !(
                              (joinBusiness["fein"].error && values.fein) ||
                              errors["fein"]
                            ) && classes.root,
                        })}
                        style={{ height: "40px", padding: "0.5rem 1rem" }}
                      />
                      <div class="input-group-append">
                        <Button
                          type="button"
                          size="search_button"
                          onClick={() => {
                            values.businessId = "";
                            setFieldError("businessId", "");
                            !values.fein
                              ? setFieldError(
                                "fein",
                                translate(`${CURRENT_SCREEN}.enterBusinessId`)
                              )
                              : getBusinessByFein(
                                values.fein,
                                agentProfile.countryId
                              );
                          }}
                        >
                          {translate(`${CURRENT_SCREEN}.searchButton`)}
                        </Button>
                      </div>
                      {((values.fein && joinBusiness["fein"].error) ||
                        errors["fein"]) && (
                          <span className="form-text invalid-input pt-1">
                            {(
                              errors["fein"] ||
                              translate(`${CURRENT_SCREEN}.notMatchingBusinessId`)
                            ).toString()}
                          </span>
                        )}
                    </div>}
                  </div>
                  {joinBusinessScreenConfig.searchByBusinessId.display && joinBusinessScreenConfig.searchByServicePartnerId.display && <div className={`${styles["ORstyle"]} col-xxl-1 col-xl-12`}>
                    {translate(`${CURRENT_SCREEN}.or`)}
                  </div>}
                </>
                {/* )} */}
                <div
                  className={`col-md-6 col-lg-10 col-xl-6 col-xxl-5 col-sm-12 ${styles["search-fein"]} ${styles["only-search-field"]}`}
                >
                  {joinBusinessScreenConfig.searchByServicePartnerId.display && <div className={` input-group `}>
                    <Field
                      id="businessId"
                      name="businessId"
                      type="string"
                      autoComplete="off"
                      onChange={(e) => {
                        formHelpers.isValueNumber(e.target.value) &&
                          handleChange(e);
                      }}
                      fullWidth
                      value={values.businessId}
                      placeholder={translate(`${CURRENT_SCREEN}.servicePartnerIdPlaceholder`)}
                      className={classNames({
                        "form-control": true,
                        root:
                          !(
                            (values.businessId &&
                              joinBusiness["businessId"].error) ||
                            errors["businessId"]
                          ) && classes.root,
                        "form-height": true,
                      })}
                      style={{ height: "40px", padding: "0.5rem 1rem" }}
                    />
                    <div class="input-group-append">
                      <Button
                        type="button"
                        size="search_button"
                        onClick={() => {
                          !values.businessId
                            ? setFieldError(
                              "businessId",
                              translate(`${CURRENT_SCREEN}.enterServicePartner`),
                            )
                            : getBusinessById(
                              values.businessId,
                              agentProfile.countryId
                            );
                          setFieldError("fein", "");
                          values.fein = "";
                        }}
                      >
                        {translate(`${CURRENT_SCREEN}.searchButton`)}
                      </Button>
                    </div>
                    {((joinBusiness["businessId"].error && values.businessId) ||
                      errors["businessId"]) && (
                        <span className="form-text invalid-input pt-1">
                          {(
                            errors["businessId"] ||
                            translate(`${CURRENT_SCREEN}.notMatchingServicePartnerId`)
                          ).toString()}
                        </span>
                      )}
                  </div>}
                </div>
              </div>
              <h3
                className={`${commonStyle["semiBoldWeight"]} ${commonStyle["blackColor"]} ${commonStyle["subHeading1"]} ${commonStyle["withinComponentMargin"]} ${commonStyle["componentsMargin"]} `}
              >
                {translate(`${CURRENT_SCREEN}.listDescription`)}
              </h3>
              {joinBusinessScreenConfig.viewListButton.display && <Button
                type="button"
                size="newMedium"
                style={{ height: "40px" }}
                className={`${commonStyle["lastComponent5"]}`}
                onClick={() =>
                  handleModalOpen(agentProfile.countryId, agentProfile.agentId)
                }
              >
                {translate(`${CURRENT_SCREEN}.viewListButton`)}
              </Button>}

              {joinBusiness.businessSelected.businessId ? (
                <div className="row mt-5">
                  <div className="col-lg-12">
                    {joinBusiness.businessSelected.businessId ? (
                      <Fragment>
                        <div className={styles["business-found"]}>
                          <h2>{translate(`${CURRENT_SCREEN}.businessSelected`)}:</h2>
                          {joinBusiness.businessSelected.businessId} -{" "}
                          {joinBusiness.businessSelected.name}
                        </div>
                        <Button
                          size="medium"
                          color="orange"
                          type="submit"
                          isSubmitting={joinBusiness.isSubmitting}
                          disabled={!joinBusiness.businessSelected.businessId}
                          id="btnJoinBusinessNext"
                        >
                          {translate(`${CURRENT_SCREEN}.nextButton`)}
                        </Button>
                      </Fragment>
                    ) : null}
                  </div>
                  <div className="col-lg-12"></div>
                </div>
              ) : null}

              {/*<div className={`${styles['footer__restart']} mt-5`}>
                        <p>
                            {translate("Not sure you want to work for someone else, or want to look at the other options more closely?")}&nbsp;
                                <button
								id="btnJoinBusinessChangeContractorType"
                                type='button'
                                className={styles['restart-button']}
                                onClick={handleRestartClick}
                            >
                                {translate("Change Your Contactor Type")}
                            </button>
                        </p>
                            </div>*/}
            </Form>
          </div>
        </>
      )}
    </Translate >
  );
};

function mapStateToProps({ agentType }) {
  return { agentType };
}

export default connect(mapStateToProps, {
  getJoinBusinessStatus,
})(JoinBusinessForm);
