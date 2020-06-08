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
    ...rest
  } = props;
  const cssClasses = classNames(
    `d-sm-block mb-3 ${isDisabled ? "disabled" : ""}`,
    className,
    { "is-loading": isLoading }
  );

  const buttonLoadingText = () => {
    return (
      <React.Fragment>
        <i className="fa fa-spinner fa-spin fa-fw" />
        <span className={isLoading ? "" : "sr-only"}>{isLoadingText}</span>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Button
        className={cssClasses}
        text={isLoading ? buttonLoadingText() : text}
        onClick={!isDisabled ? onClick : ""}
        {...rest}
      ></Button>
    </React.Fragment>
  );
};

SeButton.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
  isInline: PropTypes.bool,
  isLoading: PropTypes.bool,
  isLoadingText: PropTypes.string,
};

export default SeButton;
