import React from "react";
import { Formik, Form } from "formik";
import { Link } from 'react-router-dom';
import SeButton from "./SeButton";
import { GetResponseErrors } from "../utilities/CitysourcedResponseHelpers";
import { GetReportComments } from '../services/authService';
import FormContainer from './FormContainer';
import Note from './Note';
import Moment from 'react-moment';
import Map from './map';
import { GoBack, Go, Routes } from "../Routing";


const ReportStatus = (props, routeProps) => {
	let alertMessage = '';
	let errorStatusCode ='';
	const { trackingNumber } = props.values;
	const response = props.history.location.state;
	let reportId, reportDateCreated, reportDateUpdated, reportRequestType;
	
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
			const {Id, DateCreated, DateUpdated, RequestType} = response.data.Results;
			reportId = Id;
			reportDateCreated = DateCreated;
			reportDateUpdated = DateUpdated;
			reportRequestType = RequestType;
		}
	}

	displayReportStatus();

	const buildComments = async() =>{
		try{
			const commentResponse = await GetReportComments(trackingNumber)
			
			if(commentResponse.ErrorsCount > 0){
				const errorsReturned = GetResponseErrors(commentResponse);
				throw new Error(errorsReturned);
			}
			else{
				const comments = commentResponse.results.map( (item) => '<li><p>{{Text}}</p><div class="attribution"><span class="author-name">' + item.AuthorName + '</span>, <span class="author-date">' + item.DateCreatedFormatted + '</span></div></li>');
				return comments
			}
		}
		catch(ex){

		}
		
	}

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
									<div class="bc-citysourced-reporter">
										<div class="callout_gray" id="citysourced-viewer">
											<h2>Report Status <span class="{{IsOpen}}">In Progress</span></h2>
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
												<dd id="address"></dd>
											</dl>
											<div id="map" class="google-map"></div>
											<h3>Comments</h3>
											<ul id="comments">
												{buildComments}
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
