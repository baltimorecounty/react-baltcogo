import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import Categories from "./services/categories.json";
import * as Yup from "yup";
import ErrorMsg from "./errormsg";

const getSubCategories = (categories, categoryId) => {
  var cats = categories.find(category => category.id === categoryId);
  return cats ? cats.types : [];
};

const ServiceRequestForm = props => {
  const [categories] = useState(Categories);
  const [subCategories, setSubCategories] = useState([]);

  const handleServiceRequestChange = changeEvent => {
    const { value } = changeEvent.currentTarget;
    const subCategories = getSubCategories(categories, parseInt(value));
    setSubCategories(subCategories);
  };

  return (
    <React.Fragment>
      <div className="container Container-bg">
        <h4>How Can We Help?</h4>
        <Formik
          initialValues={{
            requestType: "",
            subRequestType: ""
          }}
          validationSchema={Yup.object().shape({
            requestType: Yup.string().required("Request Category is required"),
            subRequestType: Yup.string().required("Sub Category is required")
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {props => {
            const { values, isSubmitting, errors, touched } = props;

            return (
              <Form onSubmit={props.handleSubmit}>
                <label htmlFor="requestType">Request Category</label>
                <br />
                <Field
                  component="select"
                  id="requestType"
                  name="requestType"
                  onChange={e => {
                    handleServiceRequestChange(e);
                    props.setFieldValue(
                      e.currentTarget.name,
                      e.currentTarget.value
                    );
                    props.setFieldValue("subRequestType", "");
                  }}
                >
                  <option key="default" value="">
                    --Please select a category--
                  </option>
                  {Categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Field>

                <div className="input-feedback">
                  {
                    <ErrorMsg
                      errormessage={errors.requestType}
                      touched={touched.requestType}
                    />
                  }
                </div>

                {values["requestType"] !== "" ? (
                  <div>
                    <label name="subRequestType" htmlFor="subRequestType">
                      Request Sub-Category
                    </label>
                    <br />
                    <Field
                      component="select"
                      id="subRequestType"
                      name="subRequestType"
                    >
                      <option key="default" value="">
                        --Please Select a sub-category--
                      </option>
                      ;
                      {subCategories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Field>
                    <div className="input-feedback">
                      {
                        <ErrorMsg
                          errormessage={errors.subRequestType}
                          touched={touched.subRequestType}
                        />
                      }
                    </div>
                  </div>
                ) : null}
                <br />
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
                <br />
                <h6>Why do I need this </h6>
                {/* 				  TODO: This feature will be enable in future
                <a href="/test">{link(more info to follow )}</a>  */}
              </Form>
            );
          }}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default ServiceRequestForm;
