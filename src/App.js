import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Users from './components/Users';
import Search from './components/Search';
import { Alert } from './components/Alert';

import About from './components/pages/About';
import User from './components/pages/User';

import GithubState from './context/github/State';

import './App.css';

const App = () => {
  const [alert, setAlertState] = useState(null);

  const resetAlert = () => setAlertState(null);

  const setAlert = (message, type) => {
    setAlertState({
      message,
      type
    });

    setTimeout(() => {
      resetAlert();
    }, 5000);
  };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                path="/"
                exact
                render={() => (
                  <Fragment>
                    <Search setAlert={setAlert} />
                    <Users />
                  </Fragment>
                )}
              />
              <Route path="/about" exact component={About} />
              <Route path="/user/:username" exact component={User} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
