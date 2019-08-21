import React from 'react';
import Note from '../components/Note';
import { SetFieldValues } from "../utilities/FormHelpers";
export const getAlertMessage = (props) => {

	const { hasPasswordReset } = props.values;
	if (hasPasswordReset) {
		return <Note className='bc_alert alert-success'>{props.values.SignInPage.ResetPasswordAlert.replace('{email address}', props.history.location.state)}</Note>
	}

	const { incorrectEmail, networkError } = props.status || {};
	const message = incorrectEmail || networkError || null;
	return <Note icon='Nothing' className='bc_alert alert-warning'>{message}</Note>

};


export const resetAlerts = (props) => {
	const hasPasswordReset = props.values.hasPasswordReset;
	props.setStatus('');
	SetFieldValues(props, { AlertAtPage: '' });
	if (hasPasswordReset) {
		SetFieldValues(props, { hasPasswordReset: false });
	}
};


export const AlertAtPage = (pageIn, props) => {
	const alertPage = props.values.AlertAtPage;
	return !(alertPage === '' || (alertPage !== pageIn));
};
