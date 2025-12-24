
//framework & 3rd parties
import React, { Fragment } from 'react';
import classNames from "classnames";
import { Row, Col, Modal } from 'react-bootstrap';
import { Translate } from 'spotify-shared-web/localize'
import PropTypes from 'prop-types';
import { Formik, Field, Form } from "formik";
import FilterFields from "./FilterFields.view"
import ModalWithFormWrapper from "spotify-shared-web/components/common/ModalWithForm"

const mobileFilterModal = ({
    opportunitiesActiveFilter,
    isMobileFilterModalVisible,
    onApplyFilter,
    onHideMobileFilterModal,
    onOpportunitiesFilterFieldChange,
    opportunityFilterOptions,
    onToggleFilterItemOptions,
    isFilterItemOptionsVisible,
    opportunitiesFilterCounts,
    onClearFilter
}) => <Translate>
        {({ translate }) => <Fragment>
            <ModalWithFormWrapper
                title={translate("Filter")}
                isVisible={isMobileFilterModalVisible}
                onHide={onHideMobileFilterModal}
                onSubmit={onHideMobileFilterModal}
                showClearAndHide={false}
                onCancel={() => {
                    onClearFilter();
                    onHideMobileFilterModal();
                }}
                cancelLbl="Clear All"
                isInitialValid={true}
                initialFormValues={opportunitiesActiveFilter}>
                <FilterFields
                    isMobile={true}
                    onOpportunitiesFilterFieldChange={onOpportunitiesFilterFieldChange}
                    opportunityFilterOptions={opportunityFilterOptions}
                    opportunitiesActiveFilter={opportunitiesActiveFilter}
                    onToggleFilterOptions={onToggleFilterItemOptions}
                    isFilterItemOptionsVisible={isFilterItemOptionsVisible}
                    autoApplyFilter={true}
                    opportunitiesFilterCounts={opportunitiesFilterCounts}
                />
            </ModalWithFormWrapper>
        </Fragment>}
    </Translate>;

export default mobileFilterModal;
