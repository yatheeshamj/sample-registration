import React, { Component } from 'react';
import styles from './LoadingComponent.module.scss';
import { Spin } from 'antd';

import loadingImage from '../../assets/images/common/loading-component.gif';

class OverlayTextLoader extends Component {

    render() {
        // const spinnerStyle = this.props.spinnerStyle || styles['overlay-spinner'];
        // const spinnerStyle = styles['fetching-results'];
        return (

            <Spin
                style={{ width: '50%' }}
                spinning={this.props.loading}
                indicator={<div className="fetching-results">{this.props.loadingText}</div>}
            >
                {this.props.content}
            </Spin>
        );
    }
}

export default OverlayTextLoader;
