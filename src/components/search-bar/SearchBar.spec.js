import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  let props;

  beforeEach(() => {
    props = {
      onClick: () => {},
    };
  });

  it("renders", () => {
    const { container } = render(
      <SearchBar {...props} />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="search-bar__container"
        >
          <form
            class="search-bar__form"
          >
            <input
              class="form__input"
              name="username-input"
              placeholder="Enter username"
              type="text"
            />
            <input
              class="form__button"
              type="submit"
              value="Search"
            />
          </form>
        </div>
      </div>
    `);
  });

  it("calls onClick with input value on form submission", () => {
    const onClickSpy = jest.fn();
    const { getByRole } = render(
      <SearchBar {...props} onClick={onClickSpy} />
    );

    fireEvent.change(getByRole("textbox"), {
      target: { value: "awesomeuser" },
    });

    fireEvent(
      getByRole("button"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(onClickSpy).toHaveBeenCalledTimes(1);
    expect(onClickSpy).toHaveBeenCalledWith("awesomeuser");
  });
});
