import React, { Component } from 'react';
import styles from './LoadingComponent.module.scss';
import { Spin } from 'antd';

import loadingImage from '../../assets/images/common/loading-component.gif';

class OverlaySpinner extends Component {

    render() {
        const spinnerStyle = this.props.spinnerStyle || styles['overlay-spinner'];
        return (

            <Spin
                spinning={this.props.loading}
                indicator={
                    // <div className={styles['loading-component']}>
                    <img className={styles[`${spinnerStyle}`]} src={loadingImage} alt='' />
                    // </div>
                }
            >
                {this.props.content}
            </Spin>
        );
    }
}

export default OverlaySpinner;
