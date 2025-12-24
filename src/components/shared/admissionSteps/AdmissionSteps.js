import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import styles from './AdmissionSteps.module.scss';
import { STEP_DESCRIPTIONS } from './data';
import commonStyle from '../CommonStyle.module.scss'
import { Translate } from 'spotify-shared-web/localize'

class AdmissionSteps extends Component {
    getStepListStyling = (substep) => {
        if (substep.completed) {
            return 'step-complete';
        } else if (substep.inProgress || substep.available) {
            return 'step-active';
        } else {
            return '';
        }
    };
    getAddStepListStyling = (substep) => {
        if (substep.completed) {
            return 'step-complete__add';
        } else if (substep.inProgress || substep.available) {
            return 'step-active__add';
        } else {
            return '';
        }
    };

    getStepCheckStyling = (substep) => {
        if (substep.completed) {
            return 'check-complete';
        } else {
            return 'check-active';
        }
    };

    getStepDescriptions = (substeps, i) => {

        const { business, region, parentStep, screenConfig } = this.props;


        switch (parentStep) {
            case 'Validate Account':
                return STEP_DESCRIPTIONS['validate'].step_descriptions[i];
            default:
                return STEP_DESCRIPTIONS[business][region].step_descriptions[i];
            //return [];
        }
    };

    render() {
        const { substeps, headerCopy } = this.props

        return (<Translate>
            {({ translate }) => <>
                <div className={` mb-md-5 mb-xxl-3 mb-xl-3 mb-sm-4 ${styles['admissionStepTopmargin']}`} >
                    <h4
                        className={`mb-sm-4 mt-md-5 ${styles['header']} ${commonStyle['headerForm']} ${commonStyle['mediumFont']} ${commonStyle['paragraph_1']}`}>
                        {headerCopy}
                    </h4>

                    <div className={`${styles['stepWrapper']}`}>
                        <ol numbered className={`ml-sm-3 mb-sm-3 ${styles['step-list']} ${commonStyle['paragraph_3']} ${commonStyle['mediumFont']} ${commonStyle['regularWeight']}`}>
                            {substeps.map((substep, i) => {
                                return (
                                    <li
                                        key={Math.random()}
                                        className={`${styles['step-item']} ${styles[this.getStepListStyling(substep)]
                                            } `}
                                    >
                                        <div className={`${styles['step-item__copy']} ${styles[this.getAddStepListStyling(substep)]} ${commonStyle['paragraph_3']} ${commonStyle['regularWeight']}`}>
                                            {translate(`stepDescriptions.${this.getStepDescriptions(substeps, i)}`)}
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </div>
            </>}
        </Translate>
        );
    }
}

export default AdmissionSteps;
