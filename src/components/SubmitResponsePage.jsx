import React from 'react';
import FormContainer from './FormContainer';
import { Formik, Form } from 'formik';
import { HasResponseErrors } from '../utilities/CitysourcedResponseHelpers';

const SubmitResponse = (props) => {
	const {
		Tabs,
		shouldDisableForm,
		requiresLocation
	} = props.values;
	const {
		response = {}
	} = props.history.location.state || {};
	const isFormSubmissionSuccessful = !HasResponseErrors(response);

	return (
		<FormContainer
			title=""
			tabNames={Tabs}
			currentTab="ServiceRequestForm"
			shouldDisableForm={shouldDisableForm}
			requiresLocation={requiresLocation}
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
								</div>
							) : (
								<div role="alert" className="bc-citysourced-reporter-alert alert-warning">
									<h2>Your Report Was Not Submitted</h2>
									<p>
										We're sorry, we encountered a problem processing your submission. We are working
										to resolve this issue as quickly as possible.
									</p>
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
