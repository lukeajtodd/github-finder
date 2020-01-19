import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AlertContext from '../context/alert/Context';

export const Alert = () => {
  const { alert } = useContext(AlertContext);

  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <FontAwesomeIcon icon={['fas', 'info-circle']} /> {alert.message}
      </div>
    )
  );
};

export default Alert;
