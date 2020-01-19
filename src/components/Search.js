import React, { useState, useContext } from 'react';

import GithubContext from '../context/github/Context';
import AlertContext from '../context/alert/Context';

export const Search = () => {
  const { users, searchUsers, clearUsers } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

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

export default Search;
