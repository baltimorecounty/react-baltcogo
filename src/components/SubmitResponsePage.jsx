import React from 'react';
import Alert from './Alert';
import FormContainer from './FormContainer';
import { Formik, Form } from 'formik';
import { HasResponseErrors } from '../utilities/CitysourcedResponseHelpers';
import ButtonDisplay from './buttonDisplay';
import { GoHome } from '../Routing';

const successBodyContent = (
	<React.Fragment>
		<p>
			Thank you for submitting your report. You will receive an email in a few minutes with your tracking number
			and additional information.
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
			We're sorry, we encountered a problem processing your submission. We are working to resolve this issue as
			quickly as possible.
		</p>
	</React.Fragment>
);

const getAlertInfo = (title, bodyContent, type, controls) => ({
	title,
	bodyContent,
	type,
	controls
});

const SubmitResponse = (props) => {
	const {
		Tabs,
		shouldDisableForm,
		isPanelRequired
	} = props.values;
	const {
		state: response = {}
	} = props.history.location || {};
	const isFormSubmissionSuccessful = !HasResponseErrors(response);
	const resetForm = () => {
		props.resetForm();
		GoHome(props);
	};
	const returnHome = () => {
		resetForm();
	};
	const logout = () => {
		sessionStorage.clear();
		resetForm();
	};
	const HomeButton = (
		<React.Fragment>
			<ButtonDisplay key={1} onClick={returnHome} buttonName="Create New Report" cssClass="seButton" />
		</React.Fragment>
	);
	const LogoutButton = (
		<React.Fragment>
			<ButtonDisplay key={2}  onClick={logout} buttonName="Logout" cssClass="seButton pull-right" />
		</React.Fragment>
	);
	const alertInfo = isFormSubmissionSuccessful
		? getAlertInfo('Your Submission Has Been Received', successBodyContent, 'success', [ HomeButton, LogoutButton ])
		: getAlertInfo('Your Report Was Not Submitted', failureBodyContent, 'warning', [ HomeButton ]);

	return (
		<FormContainer
			title="Report Status"
			tabNames={Tabs}
			currentTab="ServiceRequestForm"
			shouldDisableForm={shouldDisableForm}
			isPanelRequired={isPanelRequired}
		>
			<Formik>
				{() => {
					const { type, title, bodyContent, controls } = alertInfo;
					return (
						<React.Fragment>
							<div className="clearfix" /> {/** Hack to ensure alert displays properly*/}
							<Form>
								<Alert
									className="bc-citysourced-reporter-alert"
									type={type}
									style={{ marginRight: '20px' }}
								>
									<h2>{title}</h2>
									{bodyContent}
									<div className="cs-form-control">{controls.map((control) => control)}</div>
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
