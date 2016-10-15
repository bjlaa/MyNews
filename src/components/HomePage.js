import React from 'react';

import Header from './Header';
import SearchBar from '../containers/SearchBar';
import SearchList from '../containers/SearchList';

const HomePage = () => {
  return (
    <div>
      <Header />
      <SearchBar />
      <SearchList />
    </div>
  );
};

export default HomePage;
