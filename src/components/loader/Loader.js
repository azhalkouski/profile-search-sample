import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './style.css';

export function Loader() {
  return (
    <div className="loader-container">
      <CircularProgress />
    </div>
  );
}
