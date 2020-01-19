import React, { useEffect, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GithubContext from '../../context/github/Context';

import Spinner from '../Spinner';
import Repos from '../repos/Repos';

export const User = ({ match }) => {
  const { user, getUser, repos, getRepos, loading } = useContext(GithubContext);

  useEffect(() => {
    const {
      params: { username }
    } = match;

    getUser(username);
    getRepos(username);

    // eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
    company
  } = user;

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back to Search
      </Link>
      Hireable:{' '}
      {hireable ? (
        <FontAwesomeIcon className="text-success" icon={['fas', 'check']} />
      ) : (
        <FontAwesomeIcon
          className="text-danger"
          icon={['fas', 'times-circle']}
        />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            className="round-img"
            alt=""
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Visit Github Profile
          </a>
          <ul>
            {login && (
              <li>
                <strong>Username:</strong> {login}
              </li>
            )}
            {company && (
              <li>
                <strong>Company:</strong> {company}
              </li>
            )}
            {blog && (
              <li>
                <strong>Website:</strong> <a href={blog}>{blog}</a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-white">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

export default User;
