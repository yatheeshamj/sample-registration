import React, { Component } from 'react';
import styles from './AgreementBody.module.scss';
import { Translate } from 'spotify-shared-web/localize';
import commonStyle from '../../shared/CommonStyle.module.scss';

class AgreementBody extends Component {
    state = {
        agreementHeight: ''
    };
    agreementRef = React.createRef();

    componentDidMount = () => {
        this.setState({ agreementHeight: this.agreementRef.current.scrollHeight });
    };

    handleScroll = (e) => {
        let scrollFromTop = this.agreementRef.current.scrollTop;
        let scrollingBoxHeight = this.agreementRef.current.clientHeight;

        if (this.props.isModal) {            
            if (this.agreementRef.current.scrollHeight <= scrollFromTop + scrollingBoxHeight) {
                this.props.handleScrolledAgreement();
            }
        }
        else {         
            const bottom = Math.ceil(e.target.scrollHeight) - Math.ceil(e.target.scrollTop) <= Math.ceil(e.target.clientHeight)+10;
            if (bottom) {
                this.props.handleScrolledAgreement();
            }
        }
    };

    render() {
        return (
            <div
                id="agreementBody"
                className={`${styles['agreement-body']} ${commonStyle['agreement_body']}`}
                ref={this.agreementRef}
                onScroll={this.handleScroll}
                dangerouslySetInnerHTML = {{
                    __html: this.props.html
                }}
            >
                
            </div>
        );
    }
}

export default AgreementBody;

