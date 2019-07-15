import React from "react";

const ShowButton = ({ handleSubmit,	onClick,disabled, requestTypeAddressID }) => {

	return (
		<React.Fragment>
			{(requestTypeAddressID === '') ? <input type="submit" className="seButton pull-right" disabled={disabled}  value="File Your Report" /> : <input type="button" className="seButton pull-right" onClick={onClick} disabled={disabled} value="Next" />}
		</React.Fragment>
	);
};

export default ShowButton;
