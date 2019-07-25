import React from 'react';
import Alert from './Alert';

const Note = (props) => (
	<Alert
		className="alert-information bc_alert"
		icon="info-circle"
	><p dangerouslySetInnerHTML={{__html: props.children}}></p></Alert>
);

export default Note;
