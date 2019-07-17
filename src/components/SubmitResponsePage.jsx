import React from 'react';
import FormContainer from './FormContainer';
import { Formik, Form } from 'formik';
import { HasResponseErrors } from '../utilities/CitysourcedResponseHelpers';
import ButtonDisplay from "./buttonDisplay";

const SubmitResponse = (props) => {
	const {
		Tabs,
		shouldDisableForm,
		isPanelRequired
	} = props.values;
	const {
		response = {}
	} = props.history.location.state || {};
	const isFormSubmissionSuccessful = !HasResponseErrors(response);

	const resetForm = () => {
		props.resetForm();
		props.history.push('/ServiceRequestForm');
	}

	const returnHome = () =>{
		resetForm();
	}

	const logout = () => {
		sessionStorage.clear();
		resetForm();
	}

	return (
		<FormContainer
			title=""
			tabNames={Tabs}
			currentTab="ServiceRequestForm"
			shouldDisableForm={shouldDisableForm}
			isPanelRequired={isPanelRequired}
		>
			<Formik>
				{() => {
					return (
						<Form>
							{isFormSubmissionSuccessful ? (
								<div role="alert" className="bc-citysourced-reporter-alert alert-success">
									<h2>Your Submission Has Been Received</h2>
									<p>
										Thank you for submitting your report. You will receive an email in a few minutes
										with your tracking number and additional information.
									</p>
									<p>
										You can track your status online at any time by entering your tracking number at
										<a href="/followup" title="Track your issue status online.">
											www.baltimorecountymd.gov/followup
										</a>.
									</p>
									<div className="cs-form-control">
										<ButtonDisplay
											onClick={returnHome}
											buttonName ="Create New Report" 
											cssClass = "seButton"/>
										<ButtonDisplay
											onClick={logout}
											buttonName ="Logout" 
											cssClass = "seButton pull-right" />
									</div>
								</div>
							) : (
								<div role="alert" className="bc-citysourced-reporter-alert alert-warning">
									<h2>Your Report Was Not Submitted</h2>
									<p>
										We're sorry, we encountered a problem processing your submission. We are working
										to resolve this issue as quickly as possible.
									</p>
									<div className="cs-form-control">
										<ButtonDisplay
											onClick={returnHome}
											buttonName ="Return Home" 
											cssClass = "seButton pull-right" />
									</div>
								</div>
							)}

						</Form>
					);
				}}
			</Formik>
		</FormContainer>
	);
};

export default SubmitResponse;
