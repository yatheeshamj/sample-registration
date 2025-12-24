import React from 'react';
import { Form } from 'formik';
import styles from './RegisterIndividualForm.module.scss';
import { Translate } from 'spotify-shared-web/localize'
import Button from 'spotify-shared-web/components/common/Button';
import SCREEN_CONFIG from "../../../screensConfig";


const CURRENT_SCREEN = SCREEN_CONFIG.registerAsSoleProprietor;

const RegisterIndividualForm = ({ registerIndividual, handleRestartClick, overrideIsLoading }) => {
    return (<Translate>
        {({ translate }) => <>
            <div>
                <Form>
                    {registerIndividual.error ? (
                        <div className={styles['server-error']}>
                            {registerIndividual.error}
                        </div>
                    ) : null}
                    <div>
                        <p>{translate(`${CURRENT_SCREEN}.registerSoleProprietorConfirm`)}</p>
                    </div>
                    <div className={styles['align-right']}>
                        <Button id="btnRegisterIndividualSSNChangeType" size="medium" color="orange" type='submit' isSubmitting={overrideIsLoading || registerIndividual.isSubmitting}>
                            {translate(`${CURRENT_SCREEN}.nextButton`)}
                        </Button>
                    </div>
                    <br />
                </Form>
            </div>
        </>}
    </Translate>);
};

export default RegisterIndividualForm;
