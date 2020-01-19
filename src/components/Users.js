import React, { useContext } from 'react';

import GithubContext from '../context/github/Context';

import UserItem from './UserItem';
import Spinner from './Spinner';

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};

export function Users() {
  const { users, loading } = useContext(GithubContext);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div style={userStyle}>
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}

export default Users;
