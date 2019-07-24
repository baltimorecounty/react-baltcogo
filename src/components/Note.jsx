import React from 'react';
import Alert from './Alert';

const Note = (props) => (
	<Alert
		className="alert-information bc_alert"
		icon="info-circle"
	><div dangerouslySetInnerHTML={{__html: props.children}}></div></Alert>
);

export default Note;
