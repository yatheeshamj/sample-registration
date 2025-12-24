import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ProgressBar.module.scss';

const Checkpoint = ({ step, checkpointStyle, checkpointNameStyle }) => (
    <div className={styles[checkpointStyle]}>
        <div className={styles[checkpointNameStyle]}>{step.name}</div>
    </div>
);

class ProgressBar extends Component {

    getCheckpointStyle(step) {
        if (step.completed) {
            return 'checkpoint-complete';
        } else if (step.available || step.inProgress) {
            return 'checkpoint-active';
        } else {
            return 'checkpoint';
        }
    }

    getCheckpointNameStyle(step) {
        if (step.completed) {
            return 'checkpoint-name-complete';
        } else {
            return 'checkpoint-name';
        }
    }

    getDividerStyle(step) {
        if (step.completed) {
            return 'divider-complete';
        } else {
            return 'divider';
        }
    }

    render() {
        const { steps } = this.props.admissionSteps;

        return (
            <div className={styles['progress-bar']}>
                {
                    steps.map((step, i) => {

                        if (i === steps.length - 1) {
                            return (
                                <Checkpoint
                                    key={step.uniqueId}
                                    step={step}
                                    checkpointStyle={this.getCheckpointStyle(step)}
                                    checkpointNameStyle={this.getCheckpointNameStyle(step)}
                                />
                            );
                        } else {
                            return (
                                <React.Fragment key={step.uniqueId}>
                                    <Checkpoint
                                        key={step.uniqueId}
                                        step={step}
                                        checkpointStyle={this.getCheckpointStyle(step)}
                                        checkpointNameStyle={this.getCheckpointNameStyle(step)}
                                    />
                                    <div key={step.uniqueId + '_2'} className={styles[this.getDividerStyle(step)]} />
                                </React.Fragment>
                            );
                        }
                    })
                }
            </div>
        );
    }
}

function mapStateToProps({ admissionSteps }) {
    return { admissionSteps };
}

export default connect(mapStateToProps)(ProgressBar);
