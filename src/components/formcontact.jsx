import React, { Component } from 'react'
import Joi from "joi-browser";

class FormContact extends Component {

    Schema = {
        firstname: Joi.string()
            .required()
            .label("First Name"),
        lastname: Joi.string()
            .required()
            .label("Last Name"),
        email: Joi.string()
            .required()
            .email()
            .label("Email"),
        phone: Joi.string()
            .regex(/^\d{3}-\d{3}-\d{4}$/)
            .required()
            .label("Phone")
    };

    render() {

        const { renderInput, nextStep, prestep, validate, data } = this.props;
        return (
            <React.Fragment>
            <div className="container Container-bg">
            <hr />
                <h4>Add a Location</h4>
                <hr/>
                {renderInput("firstname", "First Name", this.Schema)}
                {renderInput("lastname", "Last Name", this.Schema)}
                {renderInput("email", "Email", this.Schema)}
                {renderInput("phone", "Phone", this.Schema)}

            </div>
            <div className="text-left">
                <button
                    className="btn btn-warning button"
                    onClick={prestep}>
                    PREVIOUS
                    </button>
            </div>
            <div className="text-right">
                <button
                    disabled={validate(data, this.Schema)}
                    className="btn btn-warning button"
                    onClick={nextStep}>
                    NEXT
                    </button>
            </div>
            </React.Fragment>

        );
    }
}
export default FormContact;
