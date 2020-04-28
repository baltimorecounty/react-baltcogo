import React from "react";
import FieldError from "./FieldError";

const Note = (props) => {
  const { className, icon } = props;
  const cssClasses = className ? className : "alert-information bc_alert";
  const iconCss = icon ? icon : "info-circle";
  return (
    <FieldError className={cssClasses} icon={iconCss}>
      <p dangerouslySetInnerHTML={{ __html: props.children }}></p>
    </FieldError>
  );
};
export default Note;
