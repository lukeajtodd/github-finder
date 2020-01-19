import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Users from './components/Users';
import Search from './components/Search';
import { Alert } from './components/Alert';

import About from './components/pages/About';
import User from './components/pages/User';

import GithubState from './context/github/State';
import AlertState from './context/alert/State';

import './App.css';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route
                  path="/"
                  exact
                  render={() => (
                    <Fragment>
                      <Search />
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
      </AlertState>
    </GithubState>
  );
};

export default App;
