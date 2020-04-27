import React from "react";
import { Field } from "formik";

const GenericTypeField = (props) => {
  const { component, name, formikProps, onChange, className } = props;

  const handleChange = (changeEvent) => {
    const localProps = formikProps.formik;
    const { name, value } = changeEvent.target;
    localProps.setFieldValue(name, value);

    onChange(changeEvent);
  };

  return (
    <Field
      component={component}
      name={name}
      onChange={handleChange}
      className={className}
    >
      {props.children}
    </Field>
  );
};
export default GenericTypeField;
