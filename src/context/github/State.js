import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './Context';
import githubReducer from './reducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';

const State = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  /**
   * Searches users for a particular username
   * @param {String} searchTerm Term to search by
   */
  const searchUsers = async searchTerm => {
    setLoading();

    const {
      data: { items: users }
    } = await axios.get(`https://api.github.com/search/users?q=${searchTerm}`);

    dispatch({ type: SEARCH_USERS, payload: users });
  };

  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  /**
   * Get a user by username
   * @param {String} username
   */
  const getUser = async username => {
    setLoading();

    const { data: user } = await axios.get(
      `https://api.github.com/users/${username}`
    );

    dispatch({ type: GET_USER, payload: user });
  };

  /**
   * Get repos for a user
   * @param {String} username
   */
  const getRepos = async username => {
    setLoading();

    const { data: repos } = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    );

    dispatch({ type: GET_REPOS, payload: repos });
  };

  /**
   * Sets the loading state
   */
  const setLoading = () => dispatch({ type: SET_LOADING });

  const { users, user, repos, loading } = state;

  return (
    <GithubContext.Provider
      value={{
        users,
        user,
        repos,
        loading,
        searchUsers,
        clearUsers,
        getUser,
        getRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default State;
