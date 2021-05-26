import React from 'react';
import { SearchBar } from '../../components/search-bar';
import './GithubProfilesContainer.css'

export function GithubProfilesContainer() {

  const handleSearch = (username) => {
    console.log('search profiles by username', username);
    
    // TODO: searchProfilesByUsername(username);
  }
  return (
    <div className="githubProfilesContainer">
      <SearchBar onClick={handleSearch} />
      <div className="expandableList">
      {['item1', 'item2', 'item3'].map(item => {
        return (<div key={item} >{item}</div>);
      })}
      </div>

    </div>
  );
}