import React from 'react';
import PropTypes from 'prop-types';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

import './RepositoryPreview.css';

export const RepositoryPreview = ({
  repositoryId,
  name,
  description,
  starsCount,
}) => {
  console.log('starsCount', starsCount);
  const StartIcn = starsCount > 0 ? StarIcon : StarBorderIcon;

  return (
    <div className="previewItem">
      <div className="info">
        <div className="title">
          <p>{name}</p>
          <div className="stars">
            <span>{starsCount}</span> <StartIcn />
          </div>
        </div>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

RepositoryPreview.propTypes = {
  repositoryId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  starsCount: PropTypes.number,
};

RepositoryPreview.defaultProps = {
  starsCount: 0,
};
