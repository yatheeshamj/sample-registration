import React, { Component } from 'react';
import styles from './RegistrationHeader.module.scss';
import commonStyle from '../../../src/components/shared/CommonStyle.module.scss'

import spotifyLogo from '../../assets/images/spotify-logo.svg';

class RegistrationHeader extends Component {
  render() {
    const { title, subtitle, isSecondaryRegistrationHeader, renderStepsContainer, content, fullWidth } = this.props;

    return (
      <>
        <div className={`row pl-sm-4 pr-sm-4 pr-md-4`} >
          {!isSecondaryRegistrationHeader ? (
            <div className={` ${styles['header']} ${commonStyle['headerMargin']} ${commonStyle['paddingChangeMedium']} ${commonStyle['widthChange2']}`}>
              <div>
                <h1 className={` ${styles['headerstyle']} ${styles['header__title']} ${commonStyle['heading_1']} ${commonStyle['regularWeight']}`}>{title}</h1>
                <hr className={`w-100 d-none d-lg-block ${commonStyle['titleMargin']}`} style={{"borderTopWidth":"1px"}}/>
                <h4 className={`mb-0 ${styles['header__subtitle']} ${commonStyle['paragraph_1']} ${commonStyle['lightFont']}`}>{subtitle}</h4>
                {/* <div className={styles['header__logo']}>
                  <img src={spotifyLogo} alt='' />
                </div> */}
              </div>
            </div>

          ) : (
            <>
              <div className={fullWidth ? 'col-lg-12' : 'col-lg-7'}>
                <div className={styles['header']}>
                  <div>
                    <h1 className={styles['header__title']} style={{ "fontWeight": "500" }}>{title}</h1>
                    <hr className='w-100'></hr>
                    <h5 className={styles['header__subtitle']}>{subtitle}</h5>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12'>{content}</div>
                </div>
              </div>
              {renderStepsContainer && renderStepsContainer()}
            </>
          )}
        </div>
      </>
    );
  }
}

export default RegistrationHeader;
