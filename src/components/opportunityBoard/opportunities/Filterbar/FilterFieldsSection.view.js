
import React, { Fragment } from 'react';
import classNames from "classnames";
import PropTypes from 'prop-types';
import { Formik, Field, Form } from "formik";
import Checkbox from "spotify-shared-web/components/common/form/CheckboxInput"
import { Translate } from 'spotify-shared-web/localize'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { getFilterOptionQuestionResponseKey } from "spotify-shared/helpers/opportunityBoard";
import commonStyle from '../../../shared/CommonStyle.module.scss'


const filterFieldsSection = ({
    id,
    option,
    autoApplyFilter,
    onOpportunitiesFilterFieldChange,
    onToggleFilterOptions,
    isFilterItemOptionsVisible,
    setFieldValue,
    opportunitiesFilterCounts,
    values,
    isMobile
}) => {
    return  <Translate>
        {({ translate }) => option.value.length > 0 && 
            <Fragment>
        
                <div id={id} className={`col-12 filter-item pt-0 py-0 ${commonStyle['titleMargin']}`}>
                    <legend className="filter-item-title col-form-label col-sm-12 pt-0">
                        <span className={` ${commonStyle['filter-item-title']} ${commonStyle['filter__title']}`} onClick={() => isMobile && onToggleFilterOptions(id)}>
                            {option.label === "Servicing times" ? (
                                <span>{option.label} <span>({translate("Servicing times are in ET")})</span> </span>
                            ):(
                                <span>{option.label}</span>
                            )}
                        </span>
                        <button
                            type="button"
                            style={{ "margin": "0px 5px 5px 5px", "padding": 0, "maxWidth": "25%" }}
                            className="float-right btn btn-small d-md-none  d-lg-none  d-xl-none"
                            onClick={() => onToggleFilterOptions(id)}>
                            {isFilterItemOptionsVisible(id) === false && <KeyboardArrowDownIcon />}
                            {isFilterItemOptionsVisible(id) === true && <KeyboardArrowUpIcon />}
                        </button>

                        <span className="float-right btn btn-small d-md-none  d-lg-none  d-xl-none"
                            style={
                                {
                                    "width": "50%"
                                }
                            }>
                            <p style={
                                {
                                    "margin": "0 5px 0 5px"
                                    , "overflow": "hidden"
                                    , "textAlign": "right"
                                    , "textOverflow": "ellipsis"
                                    , "whiteSpace": "nowrap"

                                }
                            }>
                                {option.value.map((_value, key) => {
                                    const questionResponseKey = getFilterOptionQuestionResponseKey(option, _value);
                                    if (values[questionResponseKey]) {
                                        return _value.value + ",";
                                    }
                                })}

                            </p>
                        </span>
                    </legend>
                    {isFilterItemOptionsVisible(id) &&
                        <div className={classNames({ "filter-item-body col-sm-12": true })}>
                            {option.type === "checkbox" &&
                                <Fragment>
                                    {option.value.map((_value, key) => {
                                        const questionResponseKey = getFilterOptionQuestionResponseKey(option, _value);
                                        const fieldCount = opportunitiesFilterCounts[questionResponseKey];
                                        const fieldCountLbl = fieldCount !== undefined ? `(${fieldCount})` : "(n/a)";
                                        const fieldLabel = `${_value.value} ${fieldCountLbl}`;
                                        // debugger
                                        return <div key={key}
                                            className={classNames({
                                                "form-check": true,
                                                "row": isMobile === false
                                            })} >
                                            <Field
                                                key={key}
                                                onChange={(e) => {
                                                    setFieldValue(questionResponseKey, e.target.checked);
                                                    autoApplyFilter && onOpportunitiesFilterFieldChange({
                                                        field: questionResponseKey,
                                                        value: e.target.checked
                                                    });
                                                }}
                                                disabled={fieldCount === 0}
                                                name={_value.value}
                                                checked={values[questionResponseKey] || false}
                                                label={fieldLabel}
                                                name={questionResponseKey}
                                                id={questionResponseKey}
                                                component={Checkbox} />
                                        </div>;

                                    })}
                                </Fragment>
                            }
                        </div>
                    }
                </div>
            </Fragment>
        }
    </Translate>;
}


filterFieldsSection.propTypes = {
    autoApplyFilter: PropTypes.bool,
    applyFilter: PropTypes.func,
    opportunityFilterOptions: PropTypes.array,
    onToggleFilterOptions: PropTypes.func,
    isFilterItemOptionsVisible: PropTypes.func,
}

export default filterFieldsSection;
