import React from 'react'
import Form from "./common/form";
// import { Formik } from 'formik'
import Joi from "joi-browser";


class FormContact extends Form {
    // constructor(props) {
    //    super(props);
    state = {
        data: {
            firstname: "",
            lastname: "",
            email: "",
            phone: ""
        },

        errors: {}
    };
    schema = {
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
            .required()
            .label("Phone")
    };


    validate = () => {
        console.log("inside validate");
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);
        //console.log('error return:' + error);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };


    handleChange = ({ currentTarget: input }) => {

        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        const data = { ...this.state.data };
        errors[input.name] = errorMessage;
        data[input.name] = input.value;
        this.setState({ data, errors });

    };



    render() {
        return (
            <div>
                <form>
                    {this.renderInput("firstname", "Firstname")}
                     {this.renderInput("lastname", "Lastname")}
                    {this.renderInput("email", "Email")}
                    {this.renderInput("phone", "Phone")}
                    {this.renderButton("FILE YOUR REPORT ")} 
                </form>
            </div>


        );
    }
}
export default FormContact;