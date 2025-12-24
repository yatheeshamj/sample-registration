import React, { Component } from 'react';
import styles from './DocumentItem.module.scss';
import { Translate } from 'spotify-shared-web/localize'
import Button from 'spotify-shared-web/components/common/Button';
import commonStyle from '../../shared/CommonStyle.module.scss';
import SeeMore from '../agreements/SeeMore'
import SCREEN_CONFIG from '../../../screensConfig';

const CURRENT_SCREEN = SCREEN_CONFIG.signDocuments;


import { CongaAgreementStatus } from '../../../constants';
class DocumentItem extends Component {
    handleViewAndSignAgreementClick = (
        url,
        agentId
    ) => {
        this.props.showAgreementContent(url);
        // this.props.getAgreementTemplateContent(
        //     templateId,
        //     agreementSecondSignatureId,
        //     agentId
        // );
    };
    toggleBtn = () => {

    }
   
    render() {
        const { agreement, agentId } = this.props;
        const svgDownElement = <div><text className=''>see less</text><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg></div>
        const svgUpElement = <div><text>see more</text><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg></div>

        return (<Translate>
            {({ translate }) => <>
                
                <div className={`${styles['agreement-item']} ${commonStyle['lastComponent']} ${commonStyle['paragraph_4']} ${commonStyle['blackColor']} ${commonStyle['lightFont']}`}>
                    <div className={`${styles['agreement-item__copy']} ${commonStyle['titleMargin']} ${commonStyle['regularFont']}`}>
                        <h5 className={`${commonStyle['mb18']} ${styles['agreement-item__copy--title']}`}>
                            {agreement.packageName}
                        </h5>
                        <div className={`${commonStyle['mb18']} ${styles['agreement-item__button-wrapper']}`}>
                            {(agreement.transactionStatus==CongaAgreementStatus.SignaturePending || agreement.transactionStatus==CongaAgreementStatus.New ||agreement.transactionStatus==CongaAgreementStatus.SignatureError|| agreement.transactionStatus==CongaAgreementStatus.MergeError ) ? (
                                <Button
                                    onClick={() =>
                                        this.handleViewAndSignAgreementClick(
                                            agreement.signUrl,
                                            agentId
                                        )
                                        
                                    }
                                    size="vsButton"
                                    className={`mb-lg-1 ${['viewsign']} ${styles['vsButton']}`}
                                    disabled={agreement.transactionStatus==CongaAgreementStatus.New || (!agreement.isAvailable)}
                                >
                                    {translate(`${CURRENT_SCREEN}.viewAndSignButton`)}
                                </Button>
                            ) : (
                                <Button
                                    variant='secondary'
                                    // style={{ width: 130, opacity: 1, color: 'white' }}
                                    size="vsButton"
                                    disabled={true}
                                    className={`${styles['vsButton']}`}
                                >
                                    {translate(`${CURRENT_SCREEN}.signedButton`)}
                                </Button>
                            )}
                        </div>

                    </div>

                    {/* {agreement.helpText && 
                    <div className={styles['agreement-item__copy--text']}
                    dangerouslySetInnerHTML={{ __html: agreement.helpText }} />} */}

                    {agreement.helptext && <SeeMore className={styles['agreement-item__copy--text']}
                     tex={agreement.helptext}></SeeMore>}
                    

                </div>

            </>}
        </Translate>);
    }
}

export default DocumentItem;
