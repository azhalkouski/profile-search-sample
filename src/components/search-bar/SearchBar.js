import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './styles.css';

const LOGIN_REGEXP = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;

export function SearchBar({ onClick, disabled }) {
  const inputRef = React.createRef();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;

    if (LOGIN_REGEXP.test(inputValue)) {
      onClick(inputRef.current.value);
    } else {
      // TODO: turn input into a controlled compoenent
      // validate inputValue on the fly
      // render elements with something like "Invalid username"
      console.log('Invalid input value');
    }
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
