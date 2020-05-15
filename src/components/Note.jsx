import React from "react";
import { Alert } from "@baltimorecounty/dotgov-components";

const Note = (props) => {
  const { className, icon, message, type } = props;

  return (
    <Alert className={className} icon={icon} type={type}>
      <p dangerouslySetInnerHTML={{ __html: message }}></p>
    </Alert>
  );
};
export default Note;
