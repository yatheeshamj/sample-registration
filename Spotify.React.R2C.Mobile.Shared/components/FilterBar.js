import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';



// Components
class FilterBarBase extends Component {

    constructor() {
        super();
        this.state = {
            isMobileFilterModalVisible: false,
            filterItemState: {
                // object to track which items are collasped in filter modal
            }
        };

        this.hideMobileFilterModal = this.hideMobileFilterModal.bind(this);
        this.showMobileFilterModal = this.showMobileFilterModal.bind(this);
        this.toggleFilterItemOptions = this.toggleFilterItemOptions.bind(this);
        this.isFilterItemOptionsVisible = this.isFilterItemOptionsVisible.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.isMobileFilterModalVisible = this.isMobileFilterModalVisible.bind(this);

    }

    componentDidMount() {
    }

    isMobileFilterModalVisible() {
        return this.state.isMobileFilterModalVisible;
    }

    hideMobileFilterModal() {
        this.setState((prevState, props) => ({
            ...prevState,
            isMobileFilterModalVisible: false
        }));
    }

    showMobileFilterModal() {
        this.setState((prevState, props) => ({
            ...prevState,
            isMobileFilterModalVisible: true
        }));
    }


    toggleFilterItemOptions(key) {
        this.setState((prevState, props) => ({
            ...prevState,
            filterItemState: {
                ...prevState.filterItemState,
                [key]: !prevState.filterItemState[key]
            }
        }));
    }

    isFilterItemOptionsVisible(key) {
        return (this.isMobile() && this.state.filterItemState[key]) || (this.isMobile() === false);
    }



    applyFilter(filterValues) {
        const { setOpportunityFilter } = this.props;
        setOpportunityFilter(filterValues);
    }
 
    isMobile() {
        // need to override in web
        return true;
    }

    render() {
        return <Fragment></Fragment>;
    }

}


FilterBarBase.propTypes = {
    setOpportunityFilter: PropTypes.func.isRequired,
    onOpportunitiesSortChange: PropTypes.func.isRequired,
    opportunityFilterOptions: PropTypes.array,
    opportunitiesActiveFilter: PropTypes.object,
    onOpportunitiesFilterFieldChange: PropTypes.func
};

export default FilterBarBase
