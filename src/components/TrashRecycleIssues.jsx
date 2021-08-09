import React from "react";
import ErrorMsg from "./ErrorMessage";
import { Select } from "@baltimorecounty/dotgov-components";
const TrashRecycleIssues = ({
  subRequestType,
  errorsTrashRecycleIssueType,
  touchedTrashRecycleIssueType,
  pageFieldName,
  handleServiceTrashRecycleIssueChange,
  rest,
  selectedTrashRecycleType,
  shouldShow,
}) => {
  const { trashRecycleIssueTypeID } = rest.formik.values;
  const handleChange = (changeEvent) => {
    const localProps = rest.formik;
    const { name, options, selectedIndex } = changeEvent.target;

    const selectedText = options[selectedIndex].text;
    selectedIndex > 0
      ? localProps.setFieldValue(name, selectedText)
      : localProps.setFieldValue(name, "");
    localProps.setFieldTouched(name, true);
    localProps.setFieldValue("subRequestTypeDescriptionID", "");
    localProps.setFieldValue("subRequestTypeAddressID", "");
    localProps.setFieldValue("subRequestTypeCityID", "");
    localProps.setFieldValue("subRequestTypeZipID", "");
    localProps.setFieldValue("sexType", "");
    localProps.setFieldValue("sexTypeID", "");
    localProps.setFieldValue("animalColorType", "");
    localProps.setFieldValue("animalColorTypeID", "");
    localProps.setFieldValue("animalBreedType", "");
    localProps.setFieldValue("animalBreedID", "");
    localProps.setFieldValue("otherAnimalTypes", "");
    localProps.setFieldValue("otherAnimalTypesID", "");
    handleServiceTrashRecycleIssueChange(changeEvent);
  };

  return (
    <React.Fragment>
      {shouldShow && subRequestType !== "" ? (
        <div
          className={
            errorsTrashRecycleIssueType && touchedTrashRecycleIssueType
              ? "cs-form-control error"
              : "cs-form-control"
          }
        >
          <Select
            id="transhRecycleIssueType"
            name="transhRecycleIssueType"
            label={pageFieldName}
            options={selectedTrashRecycleType}
            onChange={handleChange}
            value={trashRecycleIssueTypeID}
            {...rest}
          />
          <p role="alert" className="error-message">
            {
              <ErrorMsg
                errormessage={errorsTrashRecycleIssueType}
                touched={touchedTrashRecycleIssueType}
              />
            }
          </p>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default TrashRecycleIssues;
