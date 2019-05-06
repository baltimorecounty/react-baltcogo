import React, { Component } from 'react';

class SignIn extends Component {
    state = {}
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
    		.label("Email Address"),
    	phone: Joi.string()
    		.regex(/^\d{3}-\d{3}-\d{4}$/)
    		.required()
    		.label("Phone"),
    	password: Joi.string()
    		//.required()
    		.label("Password")
    };
    render() {
    	return (<div>
    		<h1>Sign In </h1>
    		<form onSubmit={this.handleSubmit}>
    			{this.renderInput("email", "Email", this.Schema)}
    			{this.renderInput("password", "Password", "password")}
    			<h6>Forget your password </h6>
    			{/*  TODO: This feature will be enable in future
                <a href="/test">{- link (will need to utilize the api)}</a> */}
    			{this.renderButton("Sign In and Continue")}
    		</form>
    	</div>);
    }
}

export default SignIn;