import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Users from "./components/Users";
import Search from "./components/Search";
import { Alert } from "./components/Alert";

import { About } from "./components/pages/About";
import User from "./components/pages/User";
import "./App.css";

class App extends Component {
  state = {
    user: {},
    users: [],
    repos: [],
    loading: false,
    alert: null
  };

  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const {
  //     REACT_APP_GITHUB_CLIENT_ID,
  //     REACT_APP_GITHUB_CLIENT_SECRET
  //   } = process.env;
  //   let url = `https://api.github.com/users`;

  //   if (
  //     REACT_APP_GITHUB_CLIENT_ID.length &&
  //     REACT_APP_GITHUB_CLIENT_SECRET.length
  //   ) {
  //     url += `?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
  //   }

  //   try {
  //     const { data: users } = await axios.get(url);
  //     this.setState({ users });
  //   } finally {
  //     this.setState({ loading: false });
  //   }
  // }

  searchUsers = async searchTerm => {
    this.resetAlert();
    this.setState({ loading: true });
    try {
      const {
        data: { items: users }
      } = await axios.get(
        `https://api.github.com/search/users?q=${searchTerm}`
      );

      this.setState({ users });
    } finally {
      this.setState({ loading: false });
    }
  };

  getUser = async username => {
    this.setState({ loading: true });

    try {
      const { data: user } = await axios.get(
        `https://api.github.com/users/${username}`
      );

      this.setState({ user });
    } finally {
      this.setState({ loading: false });
    }
  };

  getRepos = async username => {
    this.setState({ loading: true });

    try {
      const { data: repos } = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
      );

      this.setState({ repos });
    } finally {
      this.setState({ loading: false });
    }
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  resetAlert = () => this.setState({ alert: null });

  setAlert = (message, type) => {
    this.setState({
      alert: {
        message,
        type
      }
    });

    setTimeout(() => {
      this.resetAlert();
    }, 5000);
  };

  render() {
    const { users, loading, alert, user, repos } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                path="/"
                exact
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route path="/about" exact component={About} />
              <Route
                path="/user/:username"
                exact
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getRepos={this.getRepos}
                    user={user}
                    loading={loading}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
