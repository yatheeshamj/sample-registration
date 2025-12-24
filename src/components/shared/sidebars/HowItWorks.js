import React, { Component } from 'react';
import styles from './HowItWorks.module.scss';

import VideoPlayer from 'spotify-shared-web/components/common/VideoPlayer';

import checkIcon from '../../../assets/images/check-icon.svg';
import calendarIcon from '../../../assets/images/calendar-icon.svg';
import happyIcon from '../../../assets/images/happy-icon.svg';

class HowItWorks extends Component {
  render() {
    return (
      <div className={styles['how-it-works']}>
        <h4 className={styles['how-it-works__header']}>Learn how it works</h4>
        <div className={styles['how-it-works__video-wrapper']}>
          <VideoPlayer
            url={'https://www.youtube.com/watch?v=ScMzIvxBSi4'}
            controls
            width={'100%'}
            height={'100%'}
          />
        </div>
        <p className={styles['how-it-works__copy']}>
          Deliver call center services from home using the spotify Platform. It's
          easier than you think!
        </p>
        <ul className={styles['how-it-works__list']}>
          <li className={styles['how-it-works__list--item']}>
            <img src={checkIcon} alt='' />
            <p>View a checklist of what you need</p>
          </li>
          <li className={styles['how-it-works__list--item']}>
            <img src={calendarIcon} alt='' />
            <p>How long it takes to start working</p>
          </li>
          <li className={styles['how-it-works__list--item']}>
            <img src={happyIcon} alt='' />
            <p>When will I get my first paycheck</p>
          </li>
        </ul>
      </div>
    );
  }
}

export default HowItWorks;
