import React from 'react';
import PropTypes from "prop-types";
import './styles.css';

export function SearchBar({onClick}) {
  const inputRef = React.createRef();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    onClick(inputRef.current.value);
  }

  return (
    <div className="search-bar__container">
      <form className="search-bar__form" onSubmit={handleOnSubmit}>
        <input
          className="form__input"
          placeholder="Enter username"
          type="text"
          name="username-input"
          ref={inputRef}
        />
        <input className="form__button" type="submit" value="Search" />
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  onClick: PropTypes.func.isRequired,
}
