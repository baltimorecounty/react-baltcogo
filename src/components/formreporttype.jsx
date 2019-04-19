import React from 'react'
import Form from "./common/form";
// import { Formik } from 'formik'
import Joi from "joi-browser";
import { getReportType } from '../services/fakeReportType';
import { getSubCategoryType } from '../services/fakeSubReportType';

class ReportType extends Form {
    // constructor(props) {
    //    super(props);
    state = {
        isSubCategoryHidden: false,
        textareavalue: 'this is the value for text area',
        data: {
            typeId: "",
            subtypeId: "",
            ReqDesc: ""

        },
        reporttypes: [],
        reportsubcateories: [],
        errors: {}
    };
    schema = {

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


    }

    componentDidMount() {
        this.setState({ reporttypes: getReportType() });
    }
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

        let isSubCategoryHidden = '';
        if (errorMessage) {
            isSubCategoryHidden = input.name === 'typeId' ? false : true;
            this.setState({ data, isSubCategoryHidden, errors });
        }
        else {
            isSubCategoryHidden = true;
            delete errors[input.name];
            if (input.name === 'typeId') {
                const reportsubcateories = getSubCategoryType(input.value);
                this.setState({ data, isSubCategoryHidden, reportsubcateories, errors });
            }

            else if (input.name === 'subtypeId') {
                this.setState({ data, isSubCategoryHidden, errors });
            }
        }
    };
    handleChangeTextArea = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        const data = { ...this.state.data };
        // console.log (input.name);
        data[input.name] = input.value;
        console.log(input.value);
        this.setState({ data, errors });
    };


    render() {

        let isSubCategoryHidden = this.state.isSubCategoryHidden;
        return (
            <div>
                <form>
                    {this.renderSelect("typeId", 'Request Category', this.state.reporttypes)}
                    {isSubCategoryHidden && this.renderSelect("subtypeId", 'Request Sub-Category', this.state.reportsubcateories)}
                    {this.renderTextArea("ReqDesc", "Service Request Description")}
                    {this.renderButton("Save")}
                </form>
            </div>


        );
    }
}
export default ReportType;