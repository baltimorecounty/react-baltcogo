import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Link } from 'react-router-dom';
import { returnConfigItems } from "../utilities//returnEnvironmentItems"
import axios from "axios"
import _ from 'lodash';
import { GetResponseErrors } from "../utilities/CitysourcedResponseHelpers";
import { GetReportComments } from '../services/authService';
import FormContainer from './FormContainer';
import Note from './Note';
import Moment from 'react-moment';
import SeButton from "./SeButton";
import Map from './map';
import { Go, Routes } from "../Routing";


const ReportStatus = (props, routeProps) => {
	const { trackingNumber } = props.values;
	const response = props.history.location.state;
	const [comments, setComment] = useState([]);
	const [commentLength, setcommentLength] = useState([]);

	let alertMessage = '';
	let errorStatusCode ='';
	let reportId, reportDateCreated, reportDateUpdated, reportRequestType, latitude, longitude, address, status, isOpen;

	useEffect(() => {
		setcommentLength(3);
		buildComments();
	}, [response]);

	  
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
			const {Id, DateCreated, DateUpdated, RequestType, Latitude, Longitude, FormattedAddress, StatusTypeReadable, StatusTypeIsClosed} = response.data.Results;
			reportId = Id;
			reportDateCreated = DateCreated;
			reportDateUpdated = DateUpdated;
			reportRequestType = RequestType;
			latitude = Latitude;
			longitude = Longitude;
			address = FormattedAddress;
			status = StatusTypeReadable;
			isOpen = (StatusTypeIsClosed ? 'closed': 'open')
		}
	}

	const showMoreComments = (clickEvent) =>{
		if (clickEvent.currentTarget.innerText === 'Show more...')
		{
			setcommentLength(comments.length);
			clickEvent.currentTarget.innerText = 'Show less...';
		}
		else{
			setcommentLength(3);
			clickEvent.currentTarget.innerText = 'Show more...';
		}
		
		buildComments();
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
			tabNames = {'none'}
			currentTab="ServiceRequestForm"
			shouldDisableForm={false}
			isPanelRequired={true}
		> 
			<Formik>
				{
					(props) => {
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
											<h2>Report Status <span className={isOpen}>{status}</span></h2>
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
												<dd id="location">{address}</dd>
											</dl>
											<div id="map" className="google-map">
											</div>
											<h3>Comments</h3>
											<ul>
												{comments.slice(0, commentLength).map(item => (
													<AuthorItem
														id={item.Id}
														name={item.AuthorName}
														date={item.DateCreatedFormatted}
														text={item.Text}
											 		 />
												))}
											</ul>
											<p>
												<SeButton
													text="Show more..."
													type="button"
													onClick = {showMoreComments}
													className="button-to-link pull-left"
												/>
											</p>
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
