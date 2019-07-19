import React from 'react';
import Alert from './Alert';

const Note = (props) => <Alert className="alert-information bc_alert" icon="info-circle">{props.children}</Alert>;

export default Note;
