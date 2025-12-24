import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import { Row, Col, Button, Modal } from 'react-bootstrap';
import commonStyle from '../../../shared/CommonStyle.module.scss';

class PreferenceBar extends Component {

    constructor() {
        super();
        this.state = {
        };

    }

    render() {

        const {
            isFirstInstance,
            initializeOpportunityBoardSecondInstance,
            isSecondInstanceAvailable
        } = this.props;

        return <Fragment>
            
            {/* initialValues={isFirstInstance, isSecondInstanceAvailable} */}
            <Formik> 
               <Form>
                <Row>
                    <Col  sm={6} className={`${commonStyle['titleMargin']}`}>
                    <h3 className={`m-0 pt-1`} style={{"fontWeight": "normal","fontStyle": "normal",
                        "fontSize": "15px",
                        "lineHeight": "19.2px"}}>Preferences</h3>
                    </Col>


                    <Col sm={6} style={{ "textAlign": "right" }}>
                    {isSecondInstanceAvailable && 
                        <a className="link pointer btn btn-link p-0" onClick={initializeOpportunityBoardSecondInstance}  style={{
                                    "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": "15px",
                        "lineHeight": "19px"}} > Next </a> }
                    </Col>

                </Row>
               </Form>
            </Formik>
        </Fragment>;
    }

}

PreferenceBar.propTypes = {
    isFirstInstance: PropTypes.bool,
    initializeOpportunityBoardSecondInstance: PropTypes.func,
    isSecondInstanceAvailable : PropTypes.bool
};

function mapStateToProps(state, props) {
    return {
        windowWidth: state.window.width
    };
}


//#region Export Component
export default connect(
    mapStateToProps
)((PreferenceBar));
//#endregion
