import React, { useState, Fragment, useEffect } from "react";
import { Formik, Field } from "formik";
import PostData from './services/categories';


const initialState = {
    name: "",
    email: "",
    password: "",
    reporttypes: this.getReportType(),
};
getReportType() {
    return PostData;
};

function MyComponent(props) {
    //const {values} = props;  const {values1} = this.props;
    console.log('test1:' + props.values.reporttypes);
    return (
        <Fragment>
            <Formik
                initialValues={initialState}
                onSubmit={(values, actions) => {
                    console.log(values);
                }}
            >
                {props => (

                    <form onSubmit={props.handleSubmit} >
                        {/* 	<Field component="select" name="color">
                            options = {props.values}
                            optionsKey="id"
                            optionsValue="name"
 

						</Field> */}

                        <Field
                            type="email"
                            placeholder="Enter email"
                            onChange={props.handleChange}
                            name="email"
                            value={props.values.email}

                        />
                        <Field
                            type="password"
                            onChange={props.handleChange}
                            name="password"
                            value={props.values.password}
                            placeholder="Password"

                        />
                        <Field
                            name="name"
                            onChange={props.handleChange}
                            value={props.values.name}
                            type="text"
                            placeholder="Name"

                        />
                        <button
                            type="submit"
                            disabled={!props.dirty && !props.isSubmitting}

                        >
                            Submit
						</button>
                    </form>
                )}
            </Formik>
        </Fragment>
    );
}

export default MyComponent;