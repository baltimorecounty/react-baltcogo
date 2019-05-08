import React from "react";

const TextArea = ({ name, label, error, ...rest }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<textarea {...rest} name={name} id={name} placeholder="Maximum 2,000 characters." className="form-control" />
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

export default TextArea;
