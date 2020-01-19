import React, { Fragment } from 'react';

import Users from '../Users';
import Search from '../Search';

export const Home = () => {
  return (
    <Fragment>
      <Search />
      <Users />
    </Fragment>
  );
};

export default Home;
