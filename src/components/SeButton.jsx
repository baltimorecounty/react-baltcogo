import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Button } from "@baltimorecounty/dotgov-components";

const SeButton = (props) => {
  const { text, isDisabled, className = "", onClick } = props;
  const cssClasses = classNames(
    `${isDisabled ? "disabled" : ""}`,
    ...className.split(" ")
  );
  /** end */
  return (
    <React.Fragment>
      <Button className={cssClasses} text={text} onClick={onClick}></Button>
    </React.Fragment>
  );
};

SeButton.propTypes = {
  text: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
};

export default SeButton;
