import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Alert = (props) => {
	const { type = '', children, className, ...rest } = props;
	const cssClasses = classNames(type ? `alert-${type}` : null, className);
	return (
		<div role="alert" className={cssClasses} {...rest}>
			{children}
		</div>
	);
};

Alert.propTypes = {
	/** Corresponds to bootstrap alert types. Does not require the alert- prefix. */
	type: PropTypes.string
};

export default Alert;