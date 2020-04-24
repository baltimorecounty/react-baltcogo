import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Button } from "@baltimorecounty/dotgov-components";

const SeButton = (props) => {
  const {
    text,
    isDisabled,
    className = "",
    onClick,
    isLoadingText = "Loading...",
    isLoading,
  } = props;
  const cssClasses = classNames(
    `${isDisabled ? "disabled" : ""}`,
    ...className.split(" "),
    { "is-loading": isLoading }
  );

  const buttonLoadingText = () => {
    return (
      <React.Fragment>
        <i className="fa fa-spinner fa-spin fa-fw" />
        <span className="sr-only">{isLoadingText}</span>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Button
        className={cssClasses}
        text={isLoading ? buttonLoadingText() : text}
        onClick={onClick}
      ></Button>
    </React.Fragment>
  );
};

SeButton.propTypes = {
  text: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
};

export default SeButton;
