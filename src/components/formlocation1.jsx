import React, { Component } from 'react'
import { render } from 'react-dom';
import Map from './map3';
import Joi from "joi-browser";

//import { google } from 'react-google-maps';
class FormLocation1 extends Component {

Schema = {
	googlesearch: Joi.string()
		.required()
		.label("Google Search"),


};

handleChange1(textval) {
        console.log('--inside handlechange1---:');
  
    	//return 1;
}

render() {
      
    	const { renderInput, data, prestep, validate, nextStep, handleChange } = this.props;
    	return (
    		<React.Fragment>
    			{renderInput("googlesearch", "googlesearch", this.Schema)}
    			{/*    <input
                    id="googlesearch"
                    name="googlesearch"
                    type="text"
                    placeholder="Customized your placeholder"
                /> */}
              
    			<Map
    				mapHandleChange={e=>handleChange(e,this.Schema,data)}
    				id="myMap"
    				data={data}
    				options={{
    					center: { lat: 41.0082, lng: 28.9784 },
    					zoom: 8
    				}}
    				onMapLoad={map => {
    					var marker = new window.google.maps.Marker({
    						position: { lat: 41.0082, lng: 28.9784 },
    						map: map,
    						title: 'Hello Istanbul!'
    					});
    				}}
    			/>
    			<div className="text-left">
    				<button
    					className="btn btn-warning button"
    					onClick={prestep}>
                        PREVIOUS
    				</button>
    			</div>
    			<div className="text-right">
    				<button
    					disabled={validate(data, this.Schema)}
    					className="btn btn-warning button"
    					onClick={nextStep}>
                        NEXT
    				</button>
    			</div>
    		</React.Fragment>
    	);
}
}

export default FormLocation1;

