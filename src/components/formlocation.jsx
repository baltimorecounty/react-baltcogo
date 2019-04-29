import React, { Component } from 'react'
import MapWithASearchBox from './map';
import Joi from "joi-browser";

class FormLocation extends Component {
    Schema = {
        googlesearch: Joi.string()
            .required()
            .label("Google Search"),


    };
 
    render() {
        const { nextStep, prestep,dataLocation ,validate,renderInput} = this.props;
        return (

            <React.Fragment>
            <div className="container Container-bg">
            <hr />
                <h4>Add a Location</h4>
                <hr/>
                <MapWithASearchBox renderInput={renderInput} Schema ={this.Schema}/>

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
                disabled={validate(dataLocation, this.Schema)}
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