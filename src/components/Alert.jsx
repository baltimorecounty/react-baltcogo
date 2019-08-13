import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Note from './Note';
import { SetFieldValues } from "../utilities/FormHelpers";



// export const getAlertMessage = (props) => {

// 	const { hasPasswordReset } = props.values;
// 	if (hasPasswordReset) {
// 		return <Note className='bc_alert alert-success'>{props.values.SignInPage.ResetPasswordAlert.replace('{email address}', props.history.location.state)}</Note>
// 	}
// 	else if (props.status) {
// 		const { incorrectEmail, networkError } = props.status;
// 		const message = incorrectEmail || networkError || null;
// 		return <Note icon='Nothing' className='bc_alert alert-warning'>{message}</Note>
// 	}
// };

// export const AlertAtPage = (pageIn, props) => {

// 	const alertPage = props.values.AlertAtPage;
// 	return !(alertPage === '' || (alertPage !== pageIn));

// };

// export const resetAlerts = (props) => {
// 	const hasPasswordReset = props.values.hasPasswordReset;
// 	props.setStatus('');
// 	SetFieldValues(props, { AlertAtPage: '' });
// 	if (hasPasswordReset) {
// 		SetFieldValues(props, { hasPasswordReset: false });
// 	}
// };

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
