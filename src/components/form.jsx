import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Select from "./common/select";
import TextArea from "./common/textarea";
import Input from "./common/input";
import FormReportType from './formreporttype'
import FormLocation from './formlocation'
import PostData from './services/categories';
import FormContact from './formcontact'
import AppBar from './appbar'
import Joi from "joi-browser";


function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}
class Form extends Component {

  state = {
    activeStep: 0,
    completed: {},
    step: 1,
    isSubCategoryHidden: false,
    textareavalue: 'this is the value for text area',

    dataReportType: {
      categories: "",
      subCategories: "",
      description: "",

    },
    dataContact: {
      firstname: "",
      lastname: "",
      email: "",
      phone: ""
    },
    reporttypes: this.getReportType(),
    reportsubcateories: [],
    errors: {}

  };


  totalSteps = () => getSteps().length;


  handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = getSteps();
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep,
    });
  };
  completedSteps() {
    return Object.keys(this.state.completed).length;
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps();
  }


  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  };

  handleComplete = () => {
    const { completed } = this.state;
    completed[this.state.activeStep] = true;
    this.setState({
      completed,
    });
    this.handleNext();
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {},
    });
  };





  //===========================================================================
  //Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
    this.handleNext();
  }
  //Go back to pre step
  preStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
    this.handleBack();
  }

  buttonValidate = (data, schema) => {


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

    const { error } = Joi.validate(this.state.dataReportType, this.schema, options);

    console.log('error return:' + error);

    if (!error) return null;


    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;

  };

  validateProperty = ({ name, value }, schema) => {

    const obj = { [name]: value };

    const schema1 = { [name]: schema[name] };

    // const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema1);

    return error ? error.details[0].message : null;

  };

  getReportType() {
    return PostData;
  }

  getSubCategoryType(id) {
    let t1 =  PostData.filter(m => m.id === parseInt(id)) ;
    return t1[0].types
  }


  handleChange = ({ currentTarget: input }, schema) => {

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input, schema);
    let data = {};

    errors[input.name] = errorMessage;
    let isSubCategoryHidden = '';
    if (errorMessage) {
      if (input.name === 'categories' || input.name === 'subCategories') {
        data = { ...this.state.dataReportType };
        data[input.name] = input.value;
        isSubCategoryHidden = input.name === 'categories' ? false : true;
        this.setState({ dataReportType: data, isSubCategoryHidden, errors });
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
      if (input.name === 'categories') {
        const reportsubcateories = this.getSubCategoryType(input.value);
        data = { ...this.state.dataReportType };
        data[input.name] = input.value;
        this.setState({ dataReportType: data, isSubCategoryHidden, reportsubcateories, errors });
      }
      else if (input.name === 'subCategories') {
        data = { ...this.state.dataReportType };
        data[input.name] = input.value;
        this.setState({ dataReportType: data, isSubCategoryHidden, errors });
      }
      else {
        data = { ...this.state.dataContact };
        data[input.name] = input.value;
        this.setState({ dataContact: data, errors });
      }
    }
  };
  handleChangeTextArea = ({ currentTarget: input }, schema) => {

    const errors = { ...this.state.errors };




    const errorMessage = this.validateProperty(input, schema);

    if (errorMessage) errors[input.name] = errorMessage;

    else delete errors[input.name];

    const data = { ...this.state.dataReportType };

    // console.log (input.name);

    data[input.name] = input.value;

    this.setState({ dataReportType: data, errors });

  };

  renderTextArea = (name, label, schema, type = "text") => {

    const { dataReportType: data, errors } = this.state;

    // console.log(data);

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

    const { dataReportType: data, errors } = this.state;
    return (

      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        //onChange={e=> this.handleChange(e.currentTarget,schema)}
        onChange={e => this.handleChange(e, schema)}
        // onChange={this.handleChange}
        error={errors[name]}
      />


    );
  }

  render() {

    const { step, activeStep, completed, reporttypes: values, isSubCategoryHidden, reportsubcateories, dataContact, dataReportType } = this.state;

    switch (step) {

      case 1:
        return (
          <React.Fragment>
        
            <AppBar
              activeStep={activeStep}
              completed={completed}
              handleStep={this.handleStep}
            />
            <FormReportType
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              handleNext={this.handleNext}
              renderSelect={this.renderSelect}
              values={values}
              isSubCategoryHidden={isSubCategoryHidden}
              reportsubcateories={reportsubcateories}
              renderTextArea={this.renderTextArea}
              validate={this.buttonValidate}
              data={dataReportType} />
          </React.Fragment>)


      case 2:
        return (
          <React.Fragment>
            <AppBar
              activeStep={activeStep}
              completed={completed}
              handleStep={this.handleStep}
            />
            <FormLocation
              nextStep={this.nextStep}
              prestep={this.preStep} />
          </React.Fragment>)
      case 3:
        return (
          <React.Fragment>
            <AppBar
              activeStep={activeStep}
              completed={completed}
              handleStep={this.handleStep}

            />
            <FormContact
              nextStep={this.nextStep}
              prestep={this.preStep}
              renderInput={this.renderInput}
              validate={this.buttonValidate}
              data={dataContact} />
          </React.Fragment>)
      default:
        return 'NONE'
    }

  };
}
export default Form;
