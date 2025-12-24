import React, { Component } from 'react';
import NavigationHeader from '../shared/NavigationHeader';
import RegistrationHeader from '../shared/RegistrationHeader';

class AuthLayout extends Component {
    render() {
        const {
            navTitle,
            navLinkPath,
            navLinkName,
            headerTitle,
            headerSubtitle,
            children
        } = this.props;
              

        return (
            <div>
                <NavigationHeader
                    title={navTitle}
                    linkPath={navLinkPath}
                    buttonName={navLinkName}
                />
                <div
                    className='container'
                    style={{ marginTop: '66px', marginBottom: '66px' }}
                >
                    <div className='row'>
                        <div className='offset-md-1 col-md-10'>
                            <RegistrationHeader
                                title={headerTitle}
                                subtitle={headerSubtitle}
                            />
                            <div className='row'>
                                <div className='col-md-8'>{children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthLayout;
