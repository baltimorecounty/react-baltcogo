import React from 'react';
import classNames from 'classnames';

const Alert = (props) => {
	const { type = '' } = props;
	const cssClasses = classNames('alert', type ? `alert-${type}` : null);
	return <div role="alert" className={cssClasses}>{props.children}</div>;
};

export default Alert;
