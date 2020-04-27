import React from "react";
import { Field } from "formik";

const RequestSubTypeField = (props) => {
  const { component, name, formikProps, onChange, className, value } = props;
  const handleChange = (changeEvent) => {
    const { name, value } = changeEvent.target;
    const localProps = formikProps.formik;
    formikProps.formik.setFieldValue(name, value);

    localProps.setFieldValue("subRequestTypeDescriptionID", "");
    localProps.setFieldValue("subRequestTypeAddressID", "");
    localProps.setFieldValue("subRequestTypeCityID", "");
    localProps.setFieldValue("subRequestTypeZipID", "");

    localProps.setFieldValue("petType", "");
    localProps.setFieldValue("otherAnimalTypes", "");
    localProps.setFieldValue("sexType", "");
    localProps.setFieldValue("animalColorType", "");
    localProps.setFieldValue("animalBreed", "");
    onChange(changeEvent);
  };
  return (
    <Field
      component={component}
      name={name}
      onChange={handleChange}
      className={className}
      value={value}
    >
      {props.children}
    </Field>
  );
};

export default RequestSubTypeField;
