import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, selectIds } from '../github-users/usersSlice';
import { SearchBar } from '../../components/search-bar';
import { CollapsibleProfileItem } from './CollapsibleProfileItem';
import { Loader } from '../../components/loader';

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
      <div className="expandableList">
        {currentSearchValue.length > 0 && (
          <div className="search-desc">{`Showing users for "${currentSearchValue}"`}</div>
        )}
        {isLoading && <Loader />}
        {!isLoading &&
          Array.isArray(usersIds) &&
          usersIds.map((userId) => {
            return <CollapsibleProfileItem key={userId} userId={userId} />;
          })}
      </div>
    </div>
  );
}
