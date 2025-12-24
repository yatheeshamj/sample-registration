import React from 'react';
import styles from './FindCallCenter.module.scss';
import { Translate } from 'spotify-shared-web/localize'
import { COUNTRY_IDS } from '../../../constants';
import commonStyle from '../../../../src/components/shared/CommonStyle.module.scss';
import { Card } from 'react-bootstrap';
import SCREEN_CONFIG from "../../../screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.registerAsServicePartner;

const FindCallCenter = ({ handleModalOpen, agentProfile }) => (
    <Translate>
        {({ translate }) => <>
            <Card className={`${styles['find-call-center']} ${commonStyle['widthChange4']} ${commonStyle['componentsTopMargin']} customCard ${commonStyle['inCard']}`}>
                <Card.Body className='p-0'>
                    <Card.Text className={`${styles['find-call-center__copy']} ${commonStyle['blackColor']} ${commonStyle['paragraph_3']}`}>
                        {translate(`${CURRENT_SCREEN}.servicePartnerDisclaimer`)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>}
    </Translate>
)

export default FindCallCenter;
