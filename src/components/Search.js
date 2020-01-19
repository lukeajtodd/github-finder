import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import GithubContext from '../context/github/Context';

export const Search = ({ setAlert }) => {
  const { users, searchUsers, clearUsers } = useContext(GithubContext);

  const [text, setText] = useState('');

  const onChange = e => setText(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    if (text === '') {
      setAlert('Please enter a search term', 'light');
    } else {
      searchUsers(text);
    }
  };

  const handleClear = () => {
    setText('');
    clearUsers();
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          value={text}
          onChange={onChange}
          type="text"
          name="text"
          placeholder="Search Users..."
        ></input>
        <input
          type="submit"
          value="search"
          className="btn btn-dark btn-block"
        ></input>
      </form>
      {users.length > 0 && (
        <button className="btn btn-light btn-block" onClick={handleClear}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default Search;
