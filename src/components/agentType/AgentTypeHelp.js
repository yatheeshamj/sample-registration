import React, { Component } from 'react';
import styles from './AgentTypeHelp.module.scss';
import { Translate } from 'spotify-shared-web/localize'
import VideoPlayer from 'spotify-shared-web/components/common/VideoPlayer';
import SCREEN_CONFIG from '../../screensConfig';
import { agentHelp } from './agentData';

const CURRENT_SCREEN = SCREEN_CONFIG.uniqueIdentification;

class AgentTypeHelp extends Component {
  render() {
    return (
      <Translate>
        {({ translate }) =>
          <div className={styles['agent-help']}>
            <div className={styles['agent-help__video-wrapper']}>
              <div>

                <VideoPlayer
                  url={this.props.media.url}
                  //url="https://vimeo.com/654071234/d1a6ca43e8"
                  controls
                  width={'100%'}
                  height={'100%'}
                />
              </div>
            </div>
            <div className={styles['agent-help__content-wrapper']}>
              <h3 className={styles['agent-help__title']}>{translate(`${CURRENT_SCREEN}.help`)}</h3>
              <p className={styles['agent-help__description']}>
                {translate(`${CURRENT_SCREEN}.helpDescription`)}
                {/* <a
              href={agentHelp.linkPath}
              target={agentHelp.isNewTab ? '_blank' : null}
            >
              {agentHelp.linkName}
            </a>
            . */}
              </p>
            </div>
          </div>
        }
      </Translate>
    );
  }
}

export default AgentTypeHelp;
