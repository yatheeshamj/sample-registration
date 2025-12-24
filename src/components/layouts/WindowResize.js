import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
// actions

import { actions, selectors } from "spotify-shared"

const setWindowSize = actions.windowResize.setWindowSize

// Components

class WindowResize extends Component {

    constructor() {
        super()
        this.state = {
            height: window.innerHeight,
            width: window.innerWidth,
        };

        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentDidUpdate(prevProps) {

    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        const { setWindowSize } = this.props;
        setWindowSize({
            height: window.innerHeight,
            width: window.innerWidth
        });
    }



    render() {
        return (<Fragment>

            </Fragment>);
    }

}


//#region MapStateToProps

function mapStateToProps(state, props) {

    return {


    };
}
//#endregion

//#region MapDispatchToProps

const mapDispatchToProps = {
    setWindowSize: setWindowSize
};
//#endregion

//#region Export Component
export default connect(
    mapStateToProps,
    { ...mapDispatchToProps }
)((WindowResize));
//#endregion
