import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepositories } from '../github-repositories/repositoriesSlice';

import './RepositoriesList.css';

export const RepositoriesList = ({ user }) => {
  const dispatch = useDispatch();
  const repositories = useSelector((state) => state.repositories.entities);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      dispatch(fetchRepositories(user.login));
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="repositoriesList" onClick={handleClick}>
      {user.login} {`isOpen: ${isOpen}`}
      {isOpen &&
        Array.isArray(repositories) &&
        repositories.map(({ id, name, description }) => {
          return (
            <div className="previewItem" key={id}>
              <h2>{name}</h2>
              <p>{description}</p>
            </div>
          );
        })}
    </div>
  );
};

RepositoriesList.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    login: PropTypes.string.isRequired,
  }),
};
