import React from 'react';
import styles from './styles.scss';

const Renderer = ({title}) => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.leftRail}>
          <div className={styles.title}>{title}</div>
          Left Rail
        </div>
        <div className={styles.rightRail}>
          <p>right rail</p>
        </div>

    </div>
  );
}

export default Renderer;