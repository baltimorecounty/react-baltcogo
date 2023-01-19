import React from "react";
import {
  Button,
  IconHeading,
  IconLink,
} from "@baltimorecounty/dotgov-components";

const Modal = (props) => {
  const {
    modalTitle = "Why do I need to do this?",
    modalText = "In order to report an issue online, we require a one-time account creation. This allows us to better track and follow up on issues in a timely fashion, as it ensures that we get all of the proper contact information when the issue is submitted. At this time we cannot take anonymous requests online.",
    modalHeadingText = "Why Register",
    modalClasses = "dg_button-link",
  } = props;
  return (
    <div>
      <Button
        type="button"
        className={`dg_modal__open-button ${modalClasses}`}
        data-target="my-accessible-dialog"
        text={modalTitle}
      ></Button>

      <div
        className="dg_modal hidden dark"
        id="my-accessible-dialog"
        data-dismissible="true"
        role="dialog"
        aria-labelledby="my-accessible-dialog_label"
        aria-modal="true"
      >
        <div className="text-right">
          <IconLink
            size="tiny"
            href="#my-accessible-dialog-close"
            id="my-accessible-dialog-close"
            type="circle"
            icon="far fa-times"
            description="Close this modal window."
            className="dg_modal__close-button"
          />
        </div>
        <IconHeading
          id="my-accessible-dialog_label"
          text={modalHeadingText}
          icon="fas fa-star"
        />
        <p>{modalText}</p>
      </div>
    </div>
  );
};

export default Modal;
