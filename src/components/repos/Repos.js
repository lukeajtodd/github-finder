import React, { useContext } from 'react';

import GithubContext from '../../context/github/Context';

import ReposItem from './ReposItem';

export function Repos() {
  const { repos } = useContext(GithubContext);
  return repos.map(repo => <ReposItem repo={repo} key={repo.id} />);
}

export default Repos;
