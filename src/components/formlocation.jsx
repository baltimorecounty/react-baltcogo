import React, { Component } from 'react'
import Joi from "joi-browser";

class FormLocation extends Component {
    Schema = {
    	googlesearch: Joi.string()
    		.required()
    		.label("Google Search"),


    };

    render() {
    	const { nextStep, prestep, } = this.props;
    	return (

    		<React.Fragment>
    			<div className="container Container-bg">
    				<hr />
    				<h4>Add a Location</h4>
    				<hr />


    			</div>
    			<div className="text-right">
    				<button
    					className="btn btn-warning button"
    					onClick={prestep}>
                        PREVIOUS
    				</button>

    				<button
    					disabled="true"
    					className="btn btn-warning button"
    					onClick={nextStep}>
                        NEXT
    				</button>
    			</div>

    		</React.Fragment>

    	);
    }
}

export default FormLocation;