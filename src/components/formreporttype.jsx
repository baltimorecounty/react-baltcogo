import React, { Component } from 'react'
import Joi from "joi-browser";

class ReportType extends Component {

    Schema = {
        categories: Joi.string()
            .required()
            .label("Request Category"),
        subCategories: Joi.string()
            .required()
            .label("Request Sub-Category"),
        description: Joi.string()
            .required()
            .label("Service Request Description")

    };

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        
        const { renderSelect, values, isSubCategoryHidden, reportsubcateories, renderTextArea, validate, data } = this.props;
     
        return (

            <React.Fragment>
            <div className="container Container-bg">
            <hr />
                <h4>How Can We Help</h4>
                <hr/>
                {renderSelect("categories", 'Request Category', values, this.Schema)}
                {isSubCategoryHidden && renderSelect("subCategories", 'Request Sub-Category', reportsubcateories, this.Schema)}
                {renderTextArea("description", "Service Request Description", this.Schema)}
               <span>  Nothing submitted through this application is anonymous. All submittals are public and subject to the Maryland Public Information Act.</span>
             </div>
             <div className="text-right">
             <button 
                    disabled={validate(data, this.Schema)}
                    className="btn btn-warning botton"
                    onClick={this.continue}>
                    Next
                 </button>
            </div>
            </React.Fragment>

        );
    }
}
export default ReportType;