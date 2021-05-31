import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './styles.css';

export function SearchBar({ onClick, disabled }) {
  const inputRef = React.createRef();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    onClick(inputRef.current.value);
  };

  return (
    <div
      className={classnames('search-bar__container', {
        disabled: disabled,
      })}
    >
      <form className="search-bar__form" onSubmit={handleOnSubmit}>
        <input
          disabled={disabled}
          className="form__input"
          placeholder="Enter username"
          type="text"
          name="username-input"
          ref={inputRef}
        />
        <input
          disabled={disabled}
          className="form__button"
          type="submit"
          value="Search"
        />
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
