import React from "react";
import PageValidation from "./PageValidation";

const Note = (props) => {
  const { className, icon } = props;
  const cssClasses = className ? className : "alert-information bc_alert";
  const iconCss = icon ? icon : "info-circle";
  return (
    <PageValidation className={cssClasses} icon={iconCss}>
      <p dangerouslySetInnerHTML={{ __html: props.children }}></p>
    </PageValidation>
  );
};
export default Note;
