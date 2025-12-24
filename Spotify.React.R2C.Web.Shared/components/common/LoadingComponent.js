import React, { Component } from 'react';
import styles from './LoadingComponent.module.scss';

import loadingImage from '../../assets/images/common/loading-component.gif';

class LoadingComponent extends Component {
  render() {
    return (
      !this.props.hide && <div className={styles['loading-component']}>
        <img className={styles['loading-spinner']} src={loadingImage} alt='' />
      </div>
    );
  }
}

export default LoadingComponent;
