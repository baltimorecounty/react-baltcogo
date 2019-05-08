import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Select from "./common/select";
import TextArea from "./common/textarea";
import Input from "./common/input";
import FormReportType from './formreporttype'
import FormLocation from './formlocation'
import PostData from './services/categories';
import FormContact from './formcontact'
import Joi from "joi-browser";
import AppBar from './appbar';




class Form extends Component {

  state = {
  	step: 1,
  	activeStep: 0,
  	totalSteps: 3,
  	isSubCategoryHidden: false,

  	dataReportType: {
  		categories: "",
  		subCategories: ""

  	},
  	reporttypes: this.getReportType(),
  	reportsubcateories: [],
  	errors: {}


  };

  handleStep = step => () => {
  	this.setState({
  		activeStep: step,
  	});
  };
  //Proceed to next step
  nextStep = () => {
  	const step = this.state.step + 1;
  	this.setState({ step });
  	this.handleNext();
  }
  handleNext = () => {
  	if (!this.isLastStep()) {
  		const activeStep = this.state.activeStep + 1;
  		this.setState({ activeStep });
  	}
  };
  //Go back to pre step
  preStep = () => {
  	const step = this.state.step - 1;
  	this.setState({ step });
  	this.handleBack();
  }

  handleBack = () => {
  	this.setState(state => ({
  		activeStep: state.activeStep - 1,
  	}));
  };

  isLastStep() {
  	return this.state.activeStep === this.state.totalSteps - 1;
  }

  buttonValidate = (data, schema) => {
  	const options = { abortEarly: false };
  	const { error } = Joi.validate(data, schema, options);

  	if (!error) return null;
  	const errors = {};
  	for (let item of error.details) errors[item.path[0]] = item.message;
  	return errors;

  };

  validate = () => {

  	const options = { abortEarly: false };
  	const { error } = Joi.validate(this.state.dataReportType, this.schema, options);
  	if (!error) return null;
  	const errors = {};
  	for (let item of error.details) errors[item.path[0]] = item.message;
  	return errors;

  };

  validateProperty = ({ name, value }, schema) => {
  	const obj = { [name]: value };
  	const schema1 = { [name]: schema[name] };
  	const { error } = Joi.validate(obj, schema1);
  	return error ? error.details[0].message : null;

  };

  getReportType() {
  	return PostData;
  }

  getSubCategoryType(id) {
  	let t1 = PostData.filter(m => m.id === parseInt(id));
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
  		else if (input.name === 'googlesearch') {

  			data = { ...this.state.dataLocation };
  			data[input.name] = input.value;
  			this.setState({ dataLocation: data, errors });

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
  		else if (input.name === 'googlesearch') {
  			data = { ...this.state.dataLocation };
  			data[input.name] = input.value;
  			this.setState({ dataLocation: data, errors });
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

  	data[input.name] = input.value;
  	this.setState({ dataReportType: data, errors });

  };

  renderTextArea = (name, label, schema, type = "text") => {
  	const { dataReportType: data, errors } = this.state;

  	return (

  		<TextArea
  			type={type}
  			name={name}
  			value={data[name]}
  			label={label}
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


  renderInput = (name, label, schema, type = "text", style = "none") => {
  	const { dataContact: data, errors } = this.state;
  	return (
  		<Input
  			type={type}
  			name={name}
  			value={data[name]}
  			label={label}
  			onChange={e => this.handleChange(e, schema, data)}
  			// onKeyDown={e => this.keyPress(e, data)}
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
  			onChange={e => this.handleChange(e, schema)}
  			error={errors[name]}
  		/>
  	);
  }

  render() {

  	const { step, activeStep, reporttypes: values, isSubCategoryHidden, reportsubcateories, dataReportType } = this.state;

  	switch (step) {

  	case 1:
  		return (
  			<React.Fragment>
  				<AppBar
  					activeStep={activeStep}
  				/>
  				<FormReportType
  					nextStep={this.nextStep}
  					handleChange={this.handleChange}
  					handleNext={this.handleNext}
  					renderSelect={this.renderSelect}
  					values={values}
  					isSubCategoryHidden={isSubCategoryHidden}
  					reportsubcateories={reportsubcateories}
  					validate={this.buttonValidate}
  					data={dataReportType}
  				/>
  			</React.Fragment>)
  	case 2:
  		return (
  			<React.Fragment>
  				<AppBar
  					activeStep={activeStep}
  				/>
  				<FormLocation
  					nextStep={this.nextStep}
  					prestep={this.preStep}
  					validate={this.buttonValidate}

  				/>
  			</React.Fragment>)
  	case 3:
  		return (
  			<React.Fragment>
  				<AppBar
  					activeStep={activeStep}
  				/>
  				<h2>Contact goes here </h2>
  			</React.Fragment>)
  	default:
  		return 'NONE'
  	}

  };
}
export default Form;