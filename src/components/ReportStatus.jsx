import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Link } from 'react-router-dom';
import { returnConfigItems } from "../utilities//returnEnvironmentItems"
import axios from "axios"
import _ from 'lodash';
import SeButton from "./SeButton";
import { GetResponseErrors } from "../utilities/CitysourcedResponseHelpers";
import { GetReportComments } from '../services/authService';
import FormContainer from './FormContainer';
import Note from './Note';
import Moment from 'react-moment';
import Map from './map';
import { GoBack, Go, Routes } from "../Routing";


const ReportStatus = (props, routeProps) => {
	const { trackingNumber, Latitude, Longitude } = props.values;
	const response = props.history.location.state;
	const [comments, setComment] = useState([]);

	let alertMessage = '';
	let errorStatusCode ='';
	let reportId, reportDateCreated, reportDateUpdated, reportRequestType, latitude, longitude, address;

	const buildComments = async() =>{
		try{
			if(trackingNumber){
				const commentResponse = await GetReportComments(trackingNumber)

				if(commentResponse.ErrorsCount > 0){
					const errorsReturned = GetResponseErrors(commentResponse);
					throw new Error(errorsReturned);
				}
				else{
					setComment(commentResponse.data.Results);
				}
			}
		}
		catch(ex){

		}
	}

	const reverseGeocode = async (latitude, longitude) => {
		const mapReverseEndPoint =returnConfigItems('mapEndPoint',"mapReverseGISEndPoint");
		const result = await axios(
			`${mapReverseEndPoint}${longitude}%2C${latitude}&f=pjson`,
		);

		return result;

	};
	
	const displayReportStatus = () => {
		if(!response)
		{
			Go(props, Routes.GetReport)
		}
		else if (response.data.ErrorsCount > 0) {
			const errorsReturned = GetResponseErrors(response);
			errorStatusCode = response.data.Errors[0].StatusCode;
			alertMessage = <Note>{errorsReturned}</Note>		
		}
		else{
			const {Id, DateCreated, DateUpdated, RequestType, Latitude, Longitude} = response.data.Results;
			reportId = Id;
			reportDateCreated = DateCreated;
			reportDateUpdated = DateUpdated;
			reportRequestType = RequestType;
			latitude = Latitude;
			longitude = Longitude
			address = reverseGeocode(latitude, longitude);

			buildComments();
		}
	}

	const AuthorItem = props => (
		<li key={props.id}>
		  <p>{props.text}</p>
		  <div className="attribution">
				<span className="author-name">{props.name}</span>
				<span className="author-date">{props.date}</span>
		  </div>
		</li>
	  );

	displayReportStatus();
	
	return (
		<FormContainer title={''}
			tabNames = {''}
			currentTab="ServiceRequestForm"
			shouldDisableForm={false}
			isPanelRequired={true}
		> 
			<Formik
				// onSubmit={async (values, actions, setSubmitting) => {
				// 	await userGetReport(values, actions, props);
				// 	actions.setSubmitting(false);
				// }}
			>
				{
					(props) => {
						const { isSubmitting } = props;
						return(
							<Form >
								{(errorStatusCode === 404) ? 
									<div role="alert" className="bc-citysourced-viewer-alert alert-warning" aria-hidden="true">
										<h2>Report Not Found</h2>
										<p>Sorry, we couldn’t find anything matching the record number <strong id="reportId">{trackingNumber}</strong>. Please check your number and
											<Link to="GetReport"> enter it again</Link>.</p>
										<p>If you’re looking up a report you just submitted, please wait a few minutes and try again. It can take up to five minutes
                    				for new reports to show up in our system.</p>
									</div> :
									((alertMessage)? alertMessage: null)}
								{(reportRequestType)?
									<div className="bc-citysourced-reporter">
										<div className="callout_gray" id="citysourced-viewer">
											<h2>Report Status <span className="{{IsOpen}}">In Progress</span></h2>
											<dl id="meta">
												<dt>Request ID</dt>
												<dd>{reportId}</dd>
												<dt>Issue Type</dt>
												<dd>{reportRequestType}</dd>
												<dt>Date Created</dt>
												<dd><Moment format="MM/DD/YYYY">{reportDateCreated}</Moment></dd>
												<dt>Last Updated</dt>
												<dd><Moment format="MM/DD/YYYY">{reportDateUpdated}</Moment></dd>					
												<dt>Location</dt>
												<dd id="location"></dd>
											</dl>
											<div id="map" className="google-map">
											</div>
											<h3>Comments</h3>
											<ul>
												{comments.map((item, id) => (
													<AuthorItem
														id={id}
														name={item.AuthorName}
														date={item.DateCreatedFormatted}
														text={item.Text}
											 		 />
												))}
											</ul>
										</div>
									</div>: null}
							</Form>
						)
					}
				}
			</Formik>
		</FormContainer >
	);
}
	

export default ReportStatus;
