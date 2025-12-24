import './filterBar.scss';
import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { FilterBarBase } from "spotify-shared/components";
import FilterBarView from "./FilterBar.view";



// Components
class FilterBar extends FilterBarBase {

    constructor() {
        super();

        this.isMobile = this.isMobile.bind(this);

    }

  
    /* override from base  */
    isMobile() {
        return this.props.isMobile;
    }

    render() {
        const {
            opportunityFilterOptions, opportunitiesActiveFilter, onOpportunitiesFilterFieldChange
            , onOpportunitiesSortChange, opportunitiesSortedBy, opportunitiesSortOptions, onClearFilter
            , opportunitiesFilterCounts, isFilterOptionsFetching
        } = this.props;

        const { isMobile, showMobileFilterModal, hideMobileFilterModal, toggleFilterItemOptions,
            isFilterItemOptionsVisible, applyFilter, isMobileFilterModalVisible
        } = this;

        return <FilterBarView
            isMobile={isMobile()}
            isFilterItemOptionsVisible={isFilterItemOptionsVisible}
            isMobileFilterModalVisible={isMobileFilterModalVisible()}
            isFilterOptionsFetching={isFilterOptionsFetching}

            onShowMobileFilterModal={showMobileFilterModal}
            onHideMobileFilterModal={hideMobileFilterModal}
            onOpportunitiesFilterFieldChange={onOpportunitiesFilterFieldChange}
            onToggleFilterItemOptions={toggleFilterItemOptions}
            onApplyFilter={applyFilter}
            onOpportunitiesSortChange={onOpportunitiesSortChange}


            opportunitiesActiveFilter={opportunitiesActiveFilter}
            opportunityFilterOptions={opportunityFilterOptions}
            opportunitiesSortOptions={opportunitiesSortOptions}
            opportunitiesSortedBy={opportunitiesSortedBy}
            onClearFilter={onClearFilter}
            opportunitiesFilterCounts={opportunitiesFilterCounts}

        />;
    }

}


FilterBar.propTypes = {
    setOpportunityFilter: PropTypes.func.isRequired,
    onOpportunitiesSortChange: PropTypes.func.isRequired,
    opportunityFilterOptions: PropTypes.array,
    opportunitiesActiveFilter: PropTypes.object,
    onOpportunitiesFilterFieldChange: PropTypes.func,
    opportunitiesSortedBy: PropTypes.string,
    opportunitiesSortOptions: PropTypes.array,
    onClearFilter: PropTypes.func,
    opportunitiesFilterCounts: PropTypes.object
};

//#region MapStateToProps

function mapStateToProps(state, props) {
    return {
        windowWidth: state.window.width
    };
}
//#endregion


//#region Export Component
export default connect(
    mapStateToProps
)((FilterBar));
//#endregion
