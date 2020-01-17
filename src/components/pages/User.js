import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Spinner from "../Spinner";
import Repos from "../repos/Repos";

export class User extends Component {
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    getRepos: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    repos: PropTypes.array.isRequired
  };

  componentDidMount() {
    const {
      match: {
        params: { username }
      },
      getUser,
      getRepos
    } = this.props;

    getUser(username);
    getRepos(username);
  }

  render() {
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
    } = this.props.user;

    const { loading, repos } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <Fragment>
        <Link to="/" className="btn btn-light">
          Back to Search
        </Link>
        Hireable:{" "}
        {hireable ? (
          <FontAwesomeIcon className="text-success" icon={["fas", "check"]} />
        ) : (
          <FontAwesomeIcon
            className="text-danger"
            icon={["fas", "times-circle"]}
          />
        )}
        <div className="card grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              className="round-img"
              alt=""
              style={{ width: "150px" }}
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
  }
}

export default User;
