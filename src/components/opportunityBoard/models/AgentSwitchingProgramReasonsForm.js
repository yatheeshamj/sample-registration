import React from 'react';
import { Translate } from 'spotify-shared-web/localize'
import commonStyle from '../../../../src/components/shared/CommonStyle.module.scss'
import { Field, Form } from 'formik';
import Button from "spotify-shared-web/components/common/Button";
import Checkbox  from "spotify-shared-web/components/common/form/CheckboxInput"
import TextInput  from "spotify-shared-web/components/common/form/TextInput"
import CheckboxGroup from 'spotify-shared-web/components/common/form/CheckboxGroup';



// CheckboxGroup
//import styles from '../models/'
// import { useInputStyles } from '../../../styles'

const AgentSwitchingProgramReasonsForm = ({onHide,formProps}) =>


{
    
    return(
        <Translate>
        {
            ({ translate }) =>
            <>
            <div className={`${commonStyle['lastComponent']}`}>
                <p>{translate('switching program')}</p>
                <Form>
                <div className={`${commonStyle['formColStyle']}`}>
                    
                    <Field 
                        id='UnhappyWithTheProgram'
                        name='UnhappyWithTheProgram'
                        // type='checkbox'
                        component={Checkbox}
                        label={`Unhappy with the program currently servicing`}
                        />
                </div>
                <div className={`${commonStyle['formColStyle']}`}>
                    
                    <Field 
                        id='LookingToEarnMoreRevenue'
                        name='LookingToEarnMoreRevenue'
                        type='checkbox'
                        label={`Looking to earn more revenue`}
                        component={Checkbox}
                      />
                       
                   
                </div>
                <div className={`${commonStyle['formColStyle']}`}>
                   
                    <Field 
                        id='TechnicalIssues'
                        name='TechnicalIssues'
                        component={Checkbox}
                        label={`Technical Issues`}
                      />
                </div>
                <div className={`${commonStyle['formColStyle']}`}>
                    
                    <Field 
                        id='AdditionalProgram'
                        name='AdditionalProgram'
                        type='checkbox'
                        component={Checkbox}
                        label={`Additional Program`}
                      />
                </div>
                <div className={`${commonStyle['formColStyle']}`}>
                    
                    <Field 
                        id='ProgramEnding'
                        name='ProgramEnding'
                        type='checkbox'
                        component={Checkbox}
                        label={`Program Ending`}
                     />
                   
                </div>
                <div className={`${commonStyle['formColStyle']}`}>
                    
                    <Field 
                        id='SOWEnding'
                        name='SOWEnding'
                        type='checkbox'
                        component={Checkbox}
                        place
                        label={`SOW Ending`}
                      />
                </div>
                <br/>
                <div className={`${commonStyle['formColStyle']}`}>
                    <span>Other</span>
                    <Field
                        id='Other'
                        name='Other'
                        
                        component={TextInput}
                        />
                </div>
                <div><br/></div>
                <div>
                    <Button type="submit"  variant="primary" hide={false}  disabled={formProps.isValid === false}>
                                    Submit
                    </Button>
                    {/* <Button variant="outline-primary" hide={false} onClick={onHide}>
                                Cancel
                    </Button> */}
                </div>

                </Form>
                
            </div>
            </>
        }
        
        </Translate>
    );
} 


export default AgentSwitchingProgramReasonsForm;
