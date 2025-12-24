import React, { Fragment } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import { Translate } from 'spotify-shared-web/localize'
import PropTypes from 'prop-types';
import MobileFilterModal from "./MobileFilterModal"
import DesktopFilterPane from "./DesktopFilterPane"
import Button from 'spotify-shared-web/components/common/Button';
import SelectInput from "spotify-shared-web/components/common/form/SelectInput"

import { StickyContainer, Sticky } from 'react-sticky';
import commonStyle from "../../../shared/CommonStyle.module.scss"
const filterBarView = ({
    isMobile,
    isFilterItemOptionsVisible,
    isMobileFilterModalVisible,
    isFilterOptionsFetching,

    opportunitiesActiveFilter,
    opportunityFilterOptions,
    opportunitiesSortOptions,
    opportunitiesSortedBy,

    onOpportunitiesFilterFieldChange,
    onToggleFilterItemOptions,
    onShowMobileFilterModal,
    onHideMobileFilterModal,
    onApplyFilter,
    onOpportunitiesSortChange,
    onClearFilter,
    opportunitiesFilterCounts


}) => <Translate>
        {({ translate }) =>
            <Fragment>
                <Col className="filter-section" >
                    <Row className="filter-section-header">
                        <div className={`d-none d-lg-block d-md-block col-lg-12 col-md-12 pl-4 pr-4 ${commonStyle['semiBoldWeight']} ${commonStyle['blackColor']} ${commonStyle['paragraph_3']}`}
                            style={{ paddingBottom: "6px",fontStyle: "normal" }}
                        >
                            {translate('Sort By')}
                        </div>
                        <Col xs={8} sm={8} md={12} lg={12} className='pl-4 pr-4'>
                            <SelectInput
                                blankOption={translate('Click for options')}
                                label={isMobile ? translate('Sort By') : null}
                                value={opportunitiesSortedBy}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    onOpportunitiesSortChange(value);
                                }}
                                options={opportunitiesSortOptions.map(o => {
                                    return {
                                        ...o,
                                        label: translate(o.label)
                                    }
                                })}
                            />
                        </Col>
                        <Col xs={2} sm={3} className="d-md-none  d-lg-none  d-xl-none" >
                            <Button
                                isSubmitting={isFilterOptionsFetching}
                                disabled={isFilterOptionsFetching}
                                style={{
                                    "float": "right"
                                }}
                                size="medium"
                                onClick={() => onShowMobileFilterModal()}>
                                {translate('Filter')}
                            </Button>
                        </Col>

                    </Row>
                    <Row className="filter-section-container">
                        <Col className='pl-4 pr-4'>
                            {(isMobile === true) &&
                                <Fragment>

                                    <MobileFilterModal
                                        onClearFilter={onClearFilter}
                                        opportunitiesActiveFilter={opportunitiesActiveFilter}
                                        isMobileFilterModalVisible={isMobileFilterModalVisible}
                                        onApplyFilter={onApplyFilter}
                                        onHideMobileFilterModal={onHideMobileFilterModal}
                                        onOpportunitiesFilterFieldChange={onOpportunitiesFilterFieldChange}
                                        opportunityFilterOptions={opportunityFilterOptions}
                                        onToggleFilterItemOptions={onToggleFilterItemOptions}
                                        isFilterItemOptionsVisible={isFilterItemOptionsVisible}
                                        opportunitiesFilterCounts={opportunitiesFilterCounts}
                                    />
                                </Fragment>
                            }
                            {isMobile === false &&
                                <DesktopFilterPane
                                    onClearFilter={onClearFilter}
                                    opportunitiesActiveFilter={opportunitiesActiveFilter}
                                    onOpportunitiesFilterFieldChange={onOpportunitiesFilterFieldChange}
                                    opportunityFilterOptions={opportunityFilterOptions}
                                    onToggleFilterItemOptions={onToggleFilterItemOptions}
                                    isFilterItemOptionsVisible={isFilterItemOptionsVisible}
                                    opportunitiesFilterCounts={opportunitiesFilterCounts}
                                    isFilterOptionsFetching={isFilterOptionsFetching}
                                />
                            }

                        </Col>
                    </Row>
                </Col>
            </Fragment>
        }
    </Translate>;

filterBarView.propTypes = {
    isMobile: PropTypes.bool,
    isMobileFilterModalVisible: PropTypes.bool,
    isFilterItemOptionsVisible: PropTypes.func,
    onShowMobileFilterModal: PropTypes.func,
    onHideMobileFilterModal: PropTypes.func,
    onOpportunitiesFilterFieldChange: PropTypes.func,
    onToggleFilterItemOptions: PropTypes.func,
    onApplyFilter: PropTypes.func,
    opportunitiesActiveFilter: PropTypes.object,
    opportunityFilterOptions: PropTypes.array,
    onOpportunitiesSortChange: PropTypes.func,
    onClearFilter: PropTypes.func,
    opportunitiesFilterCounts: PropTypes.object
}

export default filterBarView;
