import React from "react";
import Alert from "./Alert";

const Note = (props) => {
  const { className, icon } = props;
  const cssClasses = className ? className : "alert-information bc_alert";
  const iconCss = icon ? icon : "info-circle";
  return (
    <Alert className={cssClasses} icon={iconCss}>
      <p dangerouslySetInnerHTML={{ __html: props.children }}></p>
    </Alert>
  );
};
export default Note;
