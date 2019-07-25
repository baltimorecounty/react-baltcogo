import React from 'react';
import Alert from './Alert';

const Note = (props) => {
	const { className } = props;
	const cssClasses = className ?  className : "alert-information bc_alert";
	return (
		<Alert
			className = {cssClasses}
			icon="info-circle"
		><p dangerouslySetInnerHTML={{__html: props.children}}></p></Alert>
	);
}
export default Note;
