import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainLayout from '../layouts/MainLayout';


import Button from 'spotify-shared-web/components/common/Button';

class Welcome extends Component {

    render() {


        return (
            <>
                <MainLayout
                    headerTitle='Page not found'
                    headerSubtitle=''
                    navTitle='Something went wrong'
                    buttonName='Home'
                    handleClick={() => {

                    }}>
                    <div >


                    </div>
                </MainLayout>
                <MainLayoutFooter />
            </>


        );
    }
}

export default Welcome

