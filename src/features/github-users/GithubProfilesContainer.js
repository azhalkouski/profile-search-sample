import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, selectIds } from './usersSlice';
import { SearchBar } from '../../components/search-bar';
import { SearchResultsList } from './search-results-list';

import './GithubProfilesContainer.css';

export function GithubProfilesContainer() {
  const dispatch = useDispatch();
  const [currentSearchValue, setCurrentSearchValue] = useState('');

  const usersIds = useSelector(selectIds);
  const isLoading = useSelector((state) => state.users.usersLoading);

  const handleSearch = (username) => {
    setCurrentSearchValue(username);
    dispatch(fetchUsers(username));
  };

  return (
    <div className="githubProfilesContainer">
      <SearchBar onClick={handleSearch} disabled={isLoading} />
      <SearchResultsList
        searchedUserLogin={currentSearchValue}
        isLoading={isLoading}
        usersIds={usersIds}
      />
    </div>
  );
}
