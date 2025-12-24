import React, { Fragment, Component } from 'react';
import FilterFieldsSection from "./FilterFieldsSection.view"
import PropTypes from 'prop-types';
import { Row, Col, Button, Modal } from 'react-bootstrap';


class filterFields extends Component {



    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.formProps.validateForm()
    }


    render() {

        const {
            autoApplyFilter,
            onOpportunitiesFilterFieldChange,
            opportunityFilterOptions,
            onToggleFilterOptions,
            isFilterItemOptionsVisible,
            opportunitiesFilterCounts,
            formProps,
            isMobile
        } = this.props;

        return <Row>

            {opportunityFilterOptions &&
                opportunityFilterOptions.map((option, key) =>
                    <FilterFieldsSection
                        key={key}
                        {...formProps}
                        id={key}
                        option={option}
                        autoApplyFilter={autoApplyFilter}
                        onOpportunitiesFilterFieldChange={onOpportunitiesFilterFieldChange}
                        onToggleFilterOptions={onToggleFilterOptions}
                        isFilterItemOptionsVisible={isFilterItemOptionsVisible}
                        opportunitiesFilterCounts={opportunitiesFilterCounts}
                        isMobile={isMobile}
                    />
                )}

        </Row>;
    }
}

filterFields.propTypes = {
    autoApplyFilter: PropTypes.bool,
    onOpportunitiesFilterFieldChange: PropTypes.func,
    opportunityFilterOptions: PropTypes.array,
    opportunitiesActiveFilter: PropTypes.object,
    onToggleFilterOptions: PropTypes.func,
    isFilterItemOptionsVisible: PropTypes.func,
    opportunitiesFilterCounts: PropTypes.object
}




export default filterFields;
