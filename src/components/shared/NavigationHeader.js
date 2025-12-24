import React, { Component } from 'react';
import styles from './NavigationHeader.module.scss';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.svg";
import commonStyle from "../shared/CommonStyle.module.scss"

class NavigationHeader extends Component {
    render() {
        const { title, linkPath, linkName, handleClick, buttonName } = this.props;

        
        return (
            <div className={styles['nav-wrapper']}>
                <div className='container'>
                    <div className='row pl-sm-4 pr-sm-4 pr-md-0'>
                        <div className='pl-0 pr-0 col-md-12'>
                            <div className={styles['nav-header']}>
                                <img src={logo} alt="" style={{ width: "90px" }} />
                                <div className={`${styles['nav-header__link-wrapper']} ${commonStyle['blackColor']}`}>
                                    {title}
									{title ? (' | ') : (' ')}
                                    {linkName ? (
                                        <Link to={linkPath}>{linkName}</Link>
                                    ) : (
                                            <button
                                                className={styles['nav-header__button']}
                                                onClick={handleClick}
                                            >
                                                {buttonName}
                                            </button>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}

export default NavigationHeader;
