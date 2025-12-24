import React, { Fragment } from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { Formik, Field, Form } from "formik";
import PropTypes from 'prop-types';
import FilterFields from "./FilterFields.view"
import { Translate } from 'spotify-shared-web/localize'
import Loading from 'spotify-shared-web/components/common/LoadingComponent';
import commonStyle from '../../../shared/CommonStyle.module.scss';

const desktopFilterPane = ({
    opportunitiesActiveFilter,
    onOpportunitiesFilterFieldChange,
    opportunityFilterOptions,
    onToggleFilterItemOptions,
    isFilterItemOptionsVisible,
    onClearFilter,
    opportunitiesFilterCounts,
    isFilterOptionsFetching
}) => <Translate>
        {({ translate }) => <Fragment>
            <Formik
                enableReinitialize={true}
                initialValues={opportunitiesActiveFilter}
                render={formProps => (
                    <Form>
                        <Row>
                            <Col sm={6} className={`${commonStyle['titleMargin']}`} ><h3 className={`m-0 pt-1`} style={{"fontWeight": "normal","fontStyle": "normal",
    "fontSize": "15px",
    "lineHeight": "19.2px"}}>{translate("Filter")}</h3></Col>
                            <Col sm={6} style={{ "textAlign": "right" }}>
                                <a className="link pointer btn btn-link p-0" onClick={onClearFilter} style={{
                                    "fontStyle": "normal",
"fontWeight": "normal",
"fontSize": "15px",
"lineHeight": "19px"}} > {translate("Clear All")} </a>
                            </Col>
                        </Row>
                        {isFilterOptionsFetching && <Loading />}
                        {isFilterOptionsFetching === false &&
                            <FilterFields
                                formProps={formProps}
                                onOpportunitiesFilterFieldChange={onOpportunitiesFilterFieldChange}
                                opportunityFilterOptions={opportunityFilterOptions}
                                opportunitiesActiveFilter={opportunitiesActiveFilter}
                                toggleFilterOptions={onToggleFilterItemOptions}
                                isFilterItemOptionsVisible={isFilterItemOptionsVisible}
                                autoApplyFilter={true}
                                isMobile={false}
                                opportunitiesFilterCounts={opportunitiesFilterCounts}
                            />}
                    </Form>
                )} />
        </Fragment>}
    </Translate>;

export default desktopFilterPane;
