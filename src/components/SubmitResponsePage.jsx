import React from 'react';
import Alert from './Alert';
import FormContainer from './FormContainer';
import { Formik, Form } from 'formik';
import { HasResponseErrors } from '../utilities/CitysourcedResponseHelpers';

const successBodyContent = (
	<React.Fragment>
		<p>
			Thank you for submitting your report. You will receive an email in a few minutes with your tracking
			number and additional information.
		</p>
		<p>
			You can track your status online at any time by entering your tracking number at{' '}
			<a href="/followup" title="Track your issue status online.">
				www.baltimorecountymd.gov/followup
			</a>.
		</p>
	</React.Fragment>
);

const failureBodyContent = (
	<React.Fragment>
		<p>
			We're sorry, we encountered a problem processing your submission. We are working to resolve this issue
			as quickly as possible.
		</p>
	</React.Fragment>
);

const getAlertInfo = (title, bodyContent, type) => ({
	title,
	bodyContent,
	type
});

const SubmitResponse = (props) => {
	const { Tabs, shouldDisableForm, requiresLocation } = props.values;
	const { response = {} } = props.history.location.state || {};
	const isFormSubmissionSuccessful = !HasResponseErrors(response);
	const alertInfo = isFormSubmissionSuccessful ?
		getAlertInfo('Your Submission Has Been Received', successBodyContent, 'success') :
		getAlertInfo('Your Report Was Not Submitted', failureBodyContent, 'warning');

	return (
		<FormContainer
			title="Report Status"
			tabNames={Tabs}
			currentTab="ServiceRequestForm"
			shouldDisableForm={shouldDisableForm}
			requiresLocation={requiresLocation}
		>
			<Formik>
				{() => {
					return (
						<React.Fragment>
							<div className="clearfix" /> {/** Hack to ensure alert displays properly*/}
							<Form>
								<Alert
									className="bc-citysourced-reporter-alert"
									type={alertInfo.type}
									style={{ marginRight: '20px' }}
								>
									<h2>{alertInfo.title}</h2>
									{alertInfo.bodyContent}
								</Alert>
							</Form>
						</React.Fragment>
					);
				}}
			</Formik>
		</FormContainer>
	);
};

export default SubmitResponse;
