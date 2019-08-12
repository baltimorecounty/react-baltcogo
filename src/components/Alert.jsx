import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Note from './Note';
import { SetFieldValues } from "../utilities/FormHelpers";



export const getAlertMessage = (props) => {
	let message = '';
	const { hasPasswordReset } = props.values;
	if (hasPasswordReset) {
		message = <Note className='bc_alert alert-success'>{props.values.SignInPage.ResetPasswordAlert.replace('{email address}', props.history.location.state)}</Note>
	}
	else if (props.status) {
		const { incorrectEmail, networkError } = props.status;
		if (incorrectEmail) {
			message = <Note icon='Nothing' className='bc_alert alert-warning'>{incorrectEmail ? incorrectEmail : null}</Note>
		}
		else {
			message = <Note icon='Nothing' className='bc_alert alert-warning'>{networkError ? networkError : null}</Note>
		}
	}
	return message;
};

export const AlertAtPage = (pageIn, props) => {

	const alertPage = props.values.AlertAtPage;
	return (alertPage === '' || (alertPage !== pageIn)) ? false : true ;

};

export const resetAlerts = (props) => {
	const hasPasswordReset = props.values.hasPasswordReset;
	props.setStatus('');
	SetFieldValues(props, { AlertAtPage: '' });
	if (hasPasswordReset === true) {
		SetFieldValues(props, { hasPasswordReset: false });
	}
};

const Alert = (props) => {
	const { type = '', children, className, icon = '', ...rest } = props;
	const cssClasses = classNames(type ? `alert-${type}` : null, className);
	return (
		<div role="alert" className={cssClasses} {...rest}>
			{icon && <i className={`fa fa-icon fa-2x fa-${icon}`} />}
			{children}
		</div>
	);
};

Alert.propTypes = {
	/** Corresponds to bootstrap alert types. Does not require the alert- prefix. */
	type: PropTypes.string
};

export default Alert;
