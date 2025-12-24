import React, { Component } from 'react';
import NavigationHeader from '../shared/NavigationHeader';
import RegistrationHeader from '../shared/RegistrationHeader';
import ProgressBar from '../shared/ProgressBar';

class MainLayout extends Component {
  render() {
    const {
      navTitle,
      navLinkPath,
      navLinkName,
      buttonName,
      handleClick,
      showProgress,
      headerTitle,
      headerSubtitle,
      children
    } = this.props;

    return (
      <div>
        
        <div
          className='container'
          style={{ marginTop: '32px', marginBottom: '32px' }}
        >
          {showProgress ? (
            <div className='row'>
              <div
                className='col-md-12'
                style={{ marginLeft: 0, marginRight: 0 }}
              >
                <ProgressBar />
              </div>
            </div>
          ) : null}
          <div className='row'>
            <div className='offset-md-1 col-md-10'>
              <RegistrationHeader
                title={headerTitle}
                subtitle={headerSubtitle}
              />
              <div className='row'>
                <div className='col-md-12'>{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainLayout;
