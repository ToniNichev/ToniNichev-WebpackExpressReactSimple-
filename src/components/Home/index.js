import React from 'react';
import styles from './styles.scss';

const Renderer = ({title}) => {
  const names = "TEST";// __API_DATA__.map( (data) => { return data.first_name }).join(',');
  return (
    <div className={styles.wrapper}>
        <div className={styles.leftRail}>
          <div className={styles.title}>{title}</div>
            {names}
        </div>
        <div className={styles.rightRail}>
          <p>right rail</p>
        </div>

    </div>
  );
}

export default Renderer;