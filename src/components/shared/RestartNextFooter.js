import React, { Component } from 'react';
import styles from './RestartNextFooter.module.scss';
import Button from 'spotify-shared-web/components/common/Button';
import commonStyle from '../shared/CommonStyle.module.scss'

class RestartNextFooter extends Component {
  static defaultProps = {
    handleNextCTA: 'Next'
  };

  render() {
    const {
      handleNextClick,
      handleNextCTA,
      handleRestartClick,
      isNextDisabled,
      hideNext,
        restartText,
        changeContratorTypeBtnId ="btnFooterChangeContratorType"
    } = this.props;
    return (
      <div className={`${styles['footer']} ${commonStyle['widthChange5']}`} style={{"flexDirection":"row-reverse"}} >
        {
          hideNext !== true &&
          <div className={styles['footer__next']}>
            <Button disabled={isNextDisabled} onClick={handleNextClick} id="btnNext" color="orange" size="medium">
              {handleNextCTA}
            </Button>
          </div>
        }
        
      </div>
    );
  }
}

export default RestartNextFooter;
