import React, { useReducer } from 'react';
import AlertContext from './Context';
import alertReducer from './reducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const State = props => {
  const initialState = {
    alert: null
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (message, type) => {
    dispatch({
      type: SET_ALERT,
      payload: {
        message,
        type
      }
    });

    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT });
    }, 5000);
  };

  const { alert } = state;

  return (
    <AlertContext.Provider
      value={{
        alert,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default State;
