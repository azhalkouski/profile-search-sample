import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepositories } from '../github-users/usersSlice';
import { RepositoryPreview } from './RepositoryPreview';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Loader } from '../../components/loader';

import './CollapsibleProfileItem.css';

export const CollapsibleProfileItem = ({ user }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.users.reposLoading);
  const repositories = useSelector((state) => {
    const foundUser = state.users.entities.find((el) => el.id === user.id);

    return foundUser.repositories;
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      dispatch(fetchRepositories(user.login));
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="profile-container">
      <div className="clickable-profile-item" onClick={handleClick}>
        <span>{user.login}</span>
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>
      {isOpen && (
        <div className="repositoriesList">
          {isLoading && <Loader />}
          {Array.isArray(repositories) &&
            repositories.map(({ id, name, description, stargazers_count }) => {
              return (
                <RepositoryPreview
                  key={id}
                  repositoryId={id}
                  name={name}
                  description={description}
                  starsCount={stargazers_count}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

CollapsibleProfileItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    login: PropTypes.string.isRequired,
  }),
};
