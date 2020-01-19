import React from 'react';
import PropTypes from 'prop-types';

export function ReposItem({ repo }) {
  return (
    <div className="card">
      <h3>
        <a href={repo.html_url}>{repo.name}</a>
      </h3>
    </div>
  );
}

ReposItem.propTypes = {
  repo: PropTypes.object.isRequired
};

export default ReposItem;
