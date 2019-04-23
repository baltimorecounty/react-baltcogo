import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Select from "./common/select";
import TextArea from "./common/textarea";
import Input from "./common/input";
import FormReportType from './formreporttype'
import { getReportType } from './services/fakeReportType';
import { getSubCategoryType } from './services/fakeSubReportType';
import FormContact from './formcontact'

import Joi from "joi-browser";
import { reportType } from './services/fakeReportType';

class Form extends Component {

  state = {
    step: 1,
    isSubCategoryHidden: false,
    textareavalue: 'this is the value for text area',
    data: {
      typeId: "",
      subtypeId: "",
      ReqDesc: "",

    },
    dataContact: {
      firstname: "",
      lastname: "",
      email: "",
      phone: ""
    },
    reporttypes: getReportType(),
    reportsubcateories: [],
    errors: {}

  };


  //Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  }
  //Go back to pre step
  preStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });

  }

  buttonValidate = (data, schema) => {
    console.log('--inside -- buttonValidate----');
    console.log('-- data :');
    console.log(data);
    // console.log ('--schema--:data value:' + `this.state.${data}`);
    console.log(schema);

    const options = { abortEarly: false };
    //const sdata = `this.state.${data}`;
    const { error } = Joi.validate(data, schema, options);
    // const { error } = Joi.validate(this.state.data, schema, options);

    console.log('error return:' + error);

    if (!error) return null;


    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;

  };

  validate = () => {

    const options = { abortEarly: false };

    const { error } = Joi.validate(this.state.data, this.schema, options);

    console.log('error return:' + error);

    if (!error) return null;


    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;

  };

  validateProperty = ({ name, value }, schema) => {

    const obj = { [name]: value };
    console.log('---name---');
    console.log(name);
    const schema1 = { [name]: schema[name] };
    console.log('---schema1---');
    console.log(schema1);
    // const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema1);

    return error ? error.details[0].message : null;

  };


  handleChange = ({ currentTarget: input }, schema, data1) => {
    // handleChange = ({ currentTarget: input }) => {
    console.log('++++handleChange++++++');
    console.log(input);
    console.log('+++ out--handleChange++++');

    const errors = { ...this.state.errors };

    const errorMessage = this.validateProperty(input, schema);
    let data = {};
    // data = { ...data };
    errors[input.name] = errorMessage;

    //data[input.name] = input.value;


    let isSubCategoryHidden = '';

    if (errorMessage) {
      if (input.name === 'typeId' || input.name === 'subtypeId') {
        data = { ...this.state.data };
        data[input.name] = input.value;
        isSubCategoryHidden = input.name === 'typeId' ? false : true;

        this.setState({ data, isSubCategoryHidden, errors });

      }
      else {
        data = { ...this.state.dataContact };
        data[input.name] = input.value;
        this.setState({ dataContact: data, errors });

      }


    }

    else {

      isSubCategoryHidden = true;

      delete errors[input.name];

      if (input.name === 'typeId') {
        console.log('++++++ typdId')
        const reportsubcateories = getSubCategoryType(input.value);
        console.log(reportsubcateories);
        console.log('------end typeId');
        data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, isSubCategoryHidden, reportsubcateories, errors });

      }


      else if (input.name === 'subtypeId') {
        data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, isSubCategoryHidden, errors });

      }
      else {
        console.log('--input.name:' + input.name);
        data = { ...this.state.dataContact };
        console.log('--input.value:' + input.value);
        data[input.name] = input.value;
        this.setState({ dataContact: data, errors });
        console.log(data);
        console.log('--input.name:---end');
      }

    }

  };
  handleChangeTextArea = ({ currentTarget: input }, schema) => {
    console.log('inside change textarea ')
    const errors = { ...this.state.errors };
    console.log(errors);
    console.log("------input----------");
    console.log(input);
    console.log('--schema');
    console.log(schema);
    console.log("--end --input");

    const errorMessage = this.validateProperty(input, schema);
    console.log(errorMessage);
    console.log("++++");
    if (errorMessage) errors[input.name] = errorMessage;

    else delete errors[input.name];

    const data = { ...this.state.data };

    // console.log (input.name);

    data[input.name] = input.value;
    console.log('----START ---input.value');
    console.log(input.value);
    console.log('----END ---input.value');
    this.setState({ data, errors });

  };

  renderTextArea = (name, label, schema, type = "text") => {
    console.log('--render text area---');
    console.log(schema);
    console.log('---end  render text area--');
    const { data, errors } = this.state;

    console.log(data);

    return (

      <TextArea

        type={type}

        name={name}

        value={data[name]}

        label={label}

        //onChange={this.handleChangeTextArea}
        onChange={e => this.handleChangeTextArea(e, schema)}
        error={errors[name]}

      />

    );

  }

  renderButton(label, SendTo) {

    return (

      <Link to={SendTo}>

        <button disabled={this.validate()} className="btn btn-primary">

          {label}

        </button>

      </Link>

    );

  }



  renderInput = (name, label, schema, type = "text") => {

    const { dataContact: data, errors } = this.state;

    return (

      <Input

        type={type}

        name={name}

        value={data[name]}

        label={label}

        // onChange={this.handleChange}
        onChange={e => this.handleChange(e, schema, data)}
        error={errors[name]}

      />

    );

  }



  renderSelect = (name, label, options, schema) => {
    console.log('---schema---');
    console.log(schema);
    console.log('--end schema--');
    console.log('---options---');
    console.log(options);
    console.log('--end options--');
    const { data, errors } = this.state;
    return (

      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        //onChange={e=> this.handleChange(e.currentTarget,schema)}
        onChange={e => this.handleChange(e, schema, data)}
        // onChange={this.handleChange}
        error={errors[name]}
      />


    );
  }

  render() {

    const { step } = this.state;
    const values = this.state.reporttypes;
    const isSubCategoryHidden = this.state.isSubCategoryHidden;
    const reportsubcateories = this.state.reportsubcateories;

    switch (step) {
      case 1:
        return <FormReportType
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          renderSelect={this.renderSelect}
          values={values}
          isSubCategoryHidden={isSubCategoryHidden}
          reportsubcateories={reportsubcateories}
          renderTextArea={this.renderTextArea}
          validate={this.buttonValidate}
          data={this.state.data} />
      case 2:
        return <FormContact
          nextStep={this.nextStep}
          prestep={this.preStep}
          renderInput={this.renderInput}
          validate={this.buttonValidate}
          data={this.state.dataContact} />
      case 3:
        return <h1> step3</h1>
      default:
        return 'NONE'
    }

  };
}
export default Form;
