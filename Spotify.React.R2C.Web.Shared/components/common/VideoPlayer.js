import React from 'react';
import ReactPlayer from 'react-player';
import styles from './VideoPlayer.module.scss';

const VideoPlayer = ({ url, controls, width, height ,setCompleted = () => {},
setPlayed = () => {}, }) => {
  return (
    <div className={styles['video-player']}>
      <ReactPlayer
        className={styles['react-player']}
        url={url}
        controls={controls}
        width={width}
        height={height}
        onPlay={setPlayed}
        onEnded={setCompleted}
      />
    </div>
  );
};

export default VideoPlayer;
