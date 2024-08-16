import React from 'react';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from '../../Styles/RegistartionForm.module.css';

function Benefits() {
  return (
    <div className={styles.item}>
      <h1>Benefits of getting featured :</h1>
      <div>
        <ul>
          <li>
            <FontAwesomeIcon
              className={styles.icon} 
              icon={faCheckCircle} 
              style={{ width: '30px', height: '30px', marginRight: '8px' }} 
            />
            Increased Visibility and Reach
          </li>
          <li>
            <FontAwesomeIcon
              className={styles.icon} 
              icon={faCheckCircle} 
              style={{ width: '30px', height: '30px', marginRight: '8px' }} 
            />
            Enhanced Patient Trust and Engagement
          </li>
          <li>
            <FontAwesomeIcon
              className={styles.icon} 
              icon={faCheckCircle} 
              style={{ width: '30px', height: '30px', marginRight: '8px' }} 
            />
            Streamlined Appointment Management
          </li>
          <li>
            <FontAwesomeIcon
              className={styles.icon} 
              icon={faCheckCircle} 
              style={{ width: '30px', height: '30px', marginRight: '8px' }} 
            />
            Comprehensive Marketing Tools
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Benefits;
