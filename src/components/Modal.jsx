import React from "react";
import {
  Button,
  IconHeading,
  IconLink,
} from "@baltimorecounty/dotgov-components";

const Modal = (props) => {
  return (
    <div>
      <Button
        type="button"
        className={`dg_button-link dg_modal__open-button ${props.className}`}
        data-target="my-accessible-dialog"
        text="Why do I need to do this?"
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
          text="Why Register"
          icon="fas fa-star"
        />
        <p>
          In order to report an issue online, we require a one-time account
          creation. This allows us to better track and follow up on issues in a
          timely fashion, as it ensures that we get all of the proper contact
          information when the issue is submitted. At this time we cannot take
          anonymous requests online.
        </p>
      </div>
    </div>
  );
};

export default Modal;
