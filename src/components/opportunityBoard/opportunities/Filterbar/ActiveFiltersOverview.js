import React, { Fragment } from "react"
import { Row, Col, } from 'react-bootstrap';
import { Translate } from 'spotify-shared-web/localize'
import { FilterOptionQuestionDelimiter } from "spotify-shared/helpers/opportunityBoard"
const ActiveFiltersOverview = ({
    opportunitiesActiveFilter,
    onOpportunitiesFilterFieldChange,
    anyActiveOpportunityFilters
}) => {

    return <Translate>
        {({ translate }) =>
            <Fragment>
                <Row>
                    <Col className="pt-2">
                        {anyActiveOpportunityFilters &&
                            <div style={
                                {
                                    "float": "left"
                                    , "marginRight": "5px"
                                    , "padding": "10px 0px 0px 0px"

                                }}>
                                {translate("Active Filters")}
                            </div>
                        }

                        {opportunitiesActiveFilter &&
                            Object.keys(opportunitiesActiveFilter).map((field, key) => {
                                const isSelected = opportunitiesActiveFilter[field];
                                return isSelected && <div key={key}
                                    style={
                                        {
                                            "float": "left"
                                            , "width": "fit-content"
                                            , "margin": "0px 5px 5px 0px"
                                            , "padding": "5px"
                                            , "border": "1px dotted black"

                                        }

                                    }>
                                    {field.split(FilterOptionQuestionDelimiter)[1]}
                                    <button
                                        style={{ "margin": "0px 5px 5px 5px", "padding": 0 }}
                                        type="button"
                                        className=" btn btn-small d-md-none  d-lg-none  d-xl-none"
                                        onClick={(e) => {
                                            onOpportunitiesFilterFieldChange({
                                                field: field,
                                                value: undefined
                                            });
                                        }}>
                                        X
                                    </button>
                                </div>;
                            })}
                    </Col>
                </Row>
            </Fragment>
        }
    </Translate>;

};


export default ActiveFiltersOverview;
