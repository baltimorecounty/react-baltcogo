import React, { Component } from 'react'
import MapWithASearchBox from './map';
import Joi from "joi-browser";
import {CheckhandleChange} from "./map"
//import { google } from 'react-google-maps';
class FormLocation extends Component {
    Schema = {
        googlesearch: Joi.string()
            .required()
            .label("Google Search"),


    };

    render() {
        const { nextStep, prestep, dataLocation, validate, renderInput,onSearchBoxMounted,bounds } = this.props;
        console.log ('-----this.onChange--:' + this.props.bounds);
        return (

            <React.Fragment>
                <div className="container Container-bg">
                    <hr />
                    <h4>Add a Location</h4>
                    <hr />
                    <input
                    ref={onSearchBoxMounted}
        bounds={bounds}
            name="googlesearch1"
            type="text"
            placeholder="Customized your placeholder"
            style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `300px`,
                height: `32px`,
                marginTop: `1px`,
                marginLeft: '150px',
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
            }}
            />
                    {renderInput("googlesearch", "googlesearch", this.Schema)} 
                    <MapWithASearchBox renderInput={renderInput} Schema={this.Schema} />

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
                       disabled={CheckhandleChange('dataReportType')}
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