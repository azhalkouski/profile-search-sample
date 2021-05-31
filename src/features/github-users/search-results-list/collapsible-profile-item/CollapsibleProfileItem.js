import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepositories, selectById } from '../../usersSlice';
import { RepositoryPreview } from '../repository-preview';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Loader } from '../../../../components/loader';

import './styles.css';

export const CollapsibleProfileItem = ({ userId }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.users.reposLoading);
  const user = useSelector((state) => selectById(state, userId));

  const repositories = user.repositories || [];
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!isOpen && repositories.length === 0) {
      dispatch(fetchRepositories(user));
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
  userId: PropTypes.number.isRequired,
};
