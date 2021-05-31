import React from 'react';
import PropTypes from 'prop-types';
import { CollapsibleProfileItem } from './collapsible-profile-item';
import { Loader } from '../../../components/loader';

export const SearchResultsList = ({
  searchedUserLogin,
  isLoading,
  usersIds,
}) => {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="expandableList">
      {searchedUserLogin.length > 0 && (
        <div className="search-desc">{`Showing users for "${searchedUserLogin}"`}</div>
      )}
      {Array.isArray(usersIds) &&
        usersIds.map((userId) => {
          return <CollapsibleProfileItem key={userId} userId={userId} />;
        })}
    </div>
  );
};

SearchResultsList.propTypes = {
  searchedUserLogin: PropTypes.string,
  isLoading: PropTypes.bool,
  usersIds: PropTypes.arrayOf(PropTypes.string),
};
