import React, { Component } from 'react';
import DocumentItem from './DocumentItem';
import styles from './DocumentList.module.scss';
import { Translate } from 'spotify-shared-web/localize'

class DocumentList extends Component {
    render() {
        const { agreements, agentId } = this.props;
        return (
            <Translate>
                {({ translate }) => <>
                    <div className='styleagreement'>
                        {
                            agreements.length
                                ? agreements.map((agreement) => {
                                    return (
                                        <DocumentItem
                                            key={agreement.transactionid}
                                            agreement={agreement}
                                            agentId={agentId}
                                            showAgreementContent={this.props.showAgreementContent}
                                        />
                                    );
                                })
                                : (
                                    <div className={styles['pending-sign']}>
                                        <h5 className={styles['pending-sign__header']}>
                                            {this.props.isRegisterBusiness || this.props.isSoleProprietor ? translate("No Agreements are available.") : translate("The Business Owner of the selected business hasn't signed the required agreements.")}
                                        </h5>
                                    </div>
                                )
                        }
                        {/* {
                            agreements && agreements.muleSoftDocSignURL==""?
                                <DocumentItem
                                    key={agreements.packageId}
                                    agreement={agreements}
                                    agentId={agentId}
                                    getAgreementTemplateContent={
                                        this.props.getAgreementTemplateContent
                                    }
                                    showAgreementContent={this.props.showAgreementContent}
                                    checkSignStatus={this.props.checkSignStatus}
                                />


                                : (
                                    <div className={styles['pending-sign']}>
                                        <h5 className={styles['pending-sign__header']}>
                                            {this.props.isRegisterBusiness || this.props.isSoleProprietor ? translate("No Agreements are available.") : translate("The Business Owner of the selected business hasn't signed the required agreements.")}
                                        </h5>
                                    </div>
                                )
                        } */}
                    </div>
                </>}
            </Translate>);
    }
}

export default DocumentList;
