import React, { Component } from 'react';

import * as preferencePageActions from "../actions/preferencesActions"



export class PreferencePageContainerBase extends Component {


    constructor(props) {

        super(props);


        this.hasPendingTasks = this.hasPendingTasks.bind(this);

    }

    // componentDidMount() {

    //     const {

    //     } = this.props;

    //     this.props.getPreferences();

    // }



    hasPendingTasks() {
        return this.props.hasPendingTasks;
    }


    render() {



        return
    }
}



export function PreferencePageContainerBaseConnect(reduxConnect, Component, extendStateToProps, extendsDispatchToProps = {}) {

    function mapStateToProps(state, props) {

        const extendedState = extendStateToProps !== undefined ? extendStateToProps(state, props) : {};

        return {

            // preferences
            preferences: state.preferences,
            agentId: state.agentId,
            headerVisible: state.Header.headerVisible


            // extends with passed in props if any
            , ...extendedState
        };
    }

    const mapDispatchToProps = {

        getPreferences: preferencePageActions.getPreferences,
        updatePreferences: preferencePageActions.updatePreferences

        // extends with passed in props if any
        , ...extendsDispatchToProps
    };

    return reduxConnect(
        mapStateToProps,
        { ...mapDispatchToProps }
    )(Component);
}

