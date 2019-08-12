import React from "react";
import { Formik, Form } from "formik";
import { Link } from 'react-router-dom';
import SeButton from "./SeButton";
import { GetReportByID } from '../services/authService';
import { GetResponseErrors } from "../utilities/CitysourcedResponseHelpers";
import {  SetFieldValues} from "../utilities/FormHelpers";
import Note from './Note';
import Map from './map';
import { GoBack, Go, Routes } from "../Routing";

const ReportStatus = (props, routeProps) => {
	const { trackingNumber } = props.values;
	let alertMessage = '';
	let errorStatusCode ='';

	const userGetReport = async () => {
		
		const response = await GetReportByID(trackingNumber);

		displayReportStatus(response);

	}
	const displayReportStatus = async(response) => {
		
		if (response.data.ErrorsCount > 0) {
			const errorsReturned = await GetResponseErrors(response);
			errorStatusCode = response.data.Errors[0].StatusCode;
			alertMessage = <Note>{errorsReturned}</Note>
		}
	}

	userGetReport();

	return (
		<Formik>
			{
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
					{/* <Map
								lat={lat} 
								lng={lng} 
								onZoom={onZoom}  
								onMarkerDragEnd={onMarkerDragEnd}
								center={{ lat, lng }}
								height='300px'
								zoom={ZoomValue === '' ? 15 : ZoomValue}
								streetViewControl='false'
							/> */}
				</Form>
			}
		</Formik>

	);
}
	

export default ReportStatus;
