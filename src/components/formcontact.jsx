import React, { Component } from 'react'
import Joi from "joi-browser";

class FormContact extends Component {

    Schema = {
        _id: Joi.string(),
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
                {renderInput("firstname", "Firstname", this.Schema)}
                {renderInput("lastname", "Lastname", this.Schema)}
                {renderInput("email", "Email", this.Schema)}
                {renderInput("phone", "Phone", this.Schema)}
                <button
                    className="btn btn-primary"
                    onClick={prestep}>
                    "PREVIOUS"
                    </button>
                <button
                    disabled={validate(data, this.Schema)}
                    className="btn btn-primary"
                    onClick={nextStep}>
                    "NEXT"
                    </button>

            </React.Fragment>

        );
    }
}
export default FormContact;
