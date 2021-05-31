import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../github-users/usersSlice';
import { SearchBar } from '../../components/search-bar';

import './GithubProfilesContainer.css';

export function GithubProfilesContainer() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.entities);

  const handleSearch = (username) => {
    dispatch(fetchUsers(username));
  };

  return (
    <div className="githubProfilesContainer">
      <SearchBar onClick={handleSearch} />
      <div className="expandableList">
        {Array.isArray(users) &&
          users.map((user) => {
            return <div key={user.id}>{user.login}</div>;
          })}
      </div>
    </div>
  );
}
