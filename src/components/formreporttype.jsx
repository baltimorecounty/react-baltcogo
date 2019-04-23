import React, { Component } from 'react'

import Joi from "joi-browser";
// import { getReportType } from './services/fakeReportType';
// import { getSubCategoryType } from './services/fakeSubReport';

class ReportType extends Component {

    Schema = {
        _id: Joi.string(),
        typeId: Joi.string()
            .required()
            .label("Request Category"),
        subtypeId: Joi.string()
            .required()
            .label("Request Sub-Category"),
        ReqDesc: Joi.string()
            .required()
            .label("Service Request Description")

    };

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {

        //  let isSubCategoryHidden = this.props.state.isSubCategoryHidden; 
        const { nextStep, handleChange, renderSelect, values, isSubCategoryHidden, reportsubcateories, renderTextArea, validate, data } = this.props;

        return (

            <React.Fragment>

                {renderSelect("typeId", 'Request Category', values, this.Schema)}
                {isSubCategoryHidden && renderSelect("subtypeId", 'Request Sub-Category', reportsubcateories, this.Schema)}
                {renderTextArea("ReqDesc", "Service Request Description", this.Schema)}
                <button
                    disabled={validate(data, this.Schema)}
                    className="btn btn-primary"
                    onClick={this.continue}>
                    "Next"
                 </button>

            </React.Fragment>

        );
    }
}
export default ReportType;