import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Translate } from 'spotify-shared-web/localize'
import styles from './AadharFormContainer.module.scss';
import commonStyle from '../../../../src/components/shared/CommonStyle.module.scss';
import {Formik} from 'formik';
import AadharScheme from './AadharSchema';
import formHelpers from 'spotify-shared/helpers/formHelpers'

import TextField from '@material-ui/core/TextField';
import { useStyles } from '../../../styles';
import { withStyles } from "@material-ui/core/styles";
import { Fragment } from 'react';
import AadharForm from './AadharForm';
import { verifySsnAndName, updateName, verifySsnAndNameByCountry } from '../../../actions/agentTypeActions';
//import AadharNameEditForm from './AadharNameEditForm';
import Button from 'spotify-shared-web/components/common/Button';

class AadharFormContainer extends Component {

    constructor(props) {
    super(props)

    this.state = {
        isSaving: false,
        fn: this.props.agentProfile && this.props.agentProfile.firstName,
        ln: this.props.agentProfile && this.props.agentProfile.lastName,
        recent: '',
        editing: false,
        fnError: undefined,
        lnError: undefined
    }
        this.fnRef = React.createRef();
        this.lnRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
    }

    handleSubmit = (values) => {
        if (this.state.isSaving) return;
        this.setState({
            isSaving: true
        });

        const formData = formHelpers.constructFormData(values);

        this.props.verifySsnAndNameByCountry(
            Object.assign(formData, {
                agentId: this.props.agentProfile.agentId,
                countryId: this.props.agentProfile.countryId
            })
        ); 

    }
    
    setRecent = (name) => {
       // if(name)
        //{
           // alert('setRecent: '+ name);
            this.setState({
                recent: name
            });                                                                                            
        //}
    };

    setEdit = (flag) => {
        this.setState({
            editing: flag,
            fnError: undefined,
            lnError: undefined
        })
    }

    handleEditSubmit = () => {
        if (this.state.isSaving) return;
        this.setState({
            isSaving: true
        });
        const fName = this.state.fn;
        const lName = this.state.ln;
        if (fName && lName) {
            this.props.updateName(fName, lName);
            this.setEdit(false);
            this.setState({
                isSaving: false
            });
        }
    }

    renderEditForm = () => {
        const { agentProfile, classes } = this.props;
        return(
            // <AadharNameEditForm agentProfile = {agentProfile} classes = {classes}
            // ></AadharNameEditForm>
            <Translate>
                {({ translate }) => <>
                    <div className={styles['ssn-inputs-wrapper']}>
                        <TextField
                            ref={this.fnRef}
                            classes={{ root: !this.state.fnError && classes.root }}
                            type="text"
                            value={this.state.fn}
                            label="First Name*"
                            onChange={(e) => {
                                this.setState({ fn: e.target.value })
                                if (!e.target.value) this.setState({ fnError: "Required" })
                                else if (this.state.fnError) this.setState({ fnError: undefined })
                            }}
                            fullWidth
                            helperText={this.state.fnError}
                            error={this.state.fnError ? true : false}
                            size="small"
                            variant="outlined"
                            inputProps={{ maxLength: 20 }}
                        />
                    </div>
                    <div className={styles['ssn-inputs-wrapper']}>
                        <TextField
                            ref={this.lnRef}
                            classes={{ root: !this.state.lnError && classes.root }}
                            type="text"
                            value={this.state.ln}
                            label="Last Name*"
                            onChange={(e) => {
                                this.setState({ ln: e.target.value })
                                if (!e.target.value) this.setState({ lnError: "Required" })
                                else if (this.state.lnError) this.setState({ lnError: undefined })
                            }}
                            fullWidth
                            helperText={this.state.lnError}
                            error={this.state.lnError ? true : false}
                            size="small"
                            variant="outlined"
                            inputProps={{ maxLength: 25 }}
                        />
                    </div>
                    <div className={styles['submit-wrapper']}>
                        <button
                            onClick={() => this.setEdit(false)}
                            type='button'
                            className={styles['cancel-button']}
                        >
                            {translate("Cancel")}
                        </button>
                        <Button
                            size="medium"
                            onClick={this.handleEditSubmit}
                        >
                            {translate("Save")}
                        </Button>
                    </div>
                </>
                }
            </Translate>
        )
    }


    
  render() {
    const { ssn } = this.props.agentType;
    const { agentProfile } = this.props;

    return (
    <Translate>
    {
        ({ translate }) => <Fragment>
        <div className={`${styles['form-container']} ${commonStyle['widthChange']}`}>
            <p className={`${styles['form-container__header']} ${commonStyle['paragraph_1']} ${commonStyle['semiBoldWeight']} ${commonStyle['sub-headingMargin']} ${commonStyle['componentsMargin']} ${commonStyle['mediumFont']}`}>
                {translate("Enter Aadhar")}
            </p>
            <p className={`${styles['form-container__copy']} ${commonStyle['paragraph_3']} ${commonStyle['regularFont']} ${commonStyle['blackColor']} ${commonStyle['withinComponentMargin']}`}>
            {translate("AadharCopy")}
            </p>

            {this.state.editing ? 
                this.renderEditForm()
                :
                <Formik 
                initialValues={Object.assign(ssn.formInfo, {
                firstName: agentProfile.firstName,
                lastName: agentProfile.lastName
                })}
                validationSchema={AadharScheme}
                validateOnBlur = {true}
                onSubmit={this.handleSubmit}
                >
                {
                    (formikProps) => (
                        <AadharForm
                            //changeTypeBtnId={this.props.changeTypeBtnId}
                            ssn={ssn}
                            // hideSSNFields={this.props.hideSSNFields}
                            //verifySsnUnique={this.handleSsnVerification}
                            //restartText={this.props.restartText}
                            btnNextId={this.props.btnNextId}
                            handleRestartClick={this.props.handleRestartClick}
                            setRecent={this.setRecent}
                            setEdit={this.setEdit}
                            recent={this.state.recent}
                            {...formikProps}></AadharForm>
                    )
                }
                </Formik>
            }
            

        </div>
        </Fragment>
       
    }
    </Translate>

    )
  }
}

function mapStateToProps({ agentType }) {
    return { agentType };
}

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { verifySsnAndName, updateName, verifySsnAndNameByCountry }
)(AadharFormContainer));
