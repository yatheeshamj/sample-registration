import React, { useState } from "react";
import styles from './SeeMore.module.scss';
import SCREEN_CONFIG from '../../../screensConfig';
import { Translate } from "spotify-shared-web/localize";

const CURRENT_SCREEN = SCREEN_CONFIG.signDocuments;

const SeeMore = (props) => {

    const [isSeeMoreShown, setSeeMoreShown] = useState(false);
    const svgDownElement = <Translate> {({ translate }) => (<><div><text className=''>{translate(`${CURRENT_SCREEN}.closeAgreementExplanation`)}</text><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg></div></>)}</Translate>
    const svgUpElement = <Translate> {({ translate }) => (<><div><text>{translate(`${CURRENT_SCREEN}.openAgreementExplanation`)}</text><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg></div></>)}</Translate>
    const toggleBtn = () => {
        setSeeMoreShown(prevState => !prevState)
    }
    return (
        <Translate>
            {({ translate }) => (
                <>
                    {/* {isSeeMoreShown ? <div  dangerouslySetInnerHTML={{ __html: props.text}}>
        <button onClick={toggleBtn}>See More</button>
        </div>
        :
        <div dangerouslySetInnerHTML={{ __html: props.text.substr(0,75)}}>
            <button onClick={toggleBtn}>See Less</button>
        </div>
        } */}
                    {isSeeMoreShown ?
                        <div>
                            <div
                                className={styles['agreement-item__copy--text']}
                                dangerouslySetInnerHTML={{ __html: props.tex }} />
                            <button
                                className={`${styles['read-more-less-btn']} ${styles['read-less-text']}`}
                                onClick={toggleBtn}>{translate(`${CURRENT_SCREEN}.closeAgreementExplanation`)}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg></button>
                        </div>
                        :
                        <div className="d-inline" style={{ "justifyContent": "space-between" }}>
                            <div
                                className={`${styles['agreement-item__copy--text']} d-inline`}
                                dangerouslySetInnerHTML={{ __html: (props.tex.substr(0, 91)).concat("...") }}>
                            </div>
                            <button
                                className={`${styles['read-more-less-btn']} ${styles['read-more-text']}`}
                                onClick={toggleBtn}>{translate(`${CURRENT_SCREEN}.openAgreementExplanation`)}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
                        </div>
                    }
                </>
            )}
        </Translate>
    )
}

export default SeeMore;
