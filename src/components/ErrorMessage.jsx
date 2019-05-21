import React from "react";

const ErrorMessage = ({ errormessage, touched }) => {

	return (
		<React.Fragment>
			{(touched === true && errormessage !== undefined) ? errormessage : null}
		</React.Fragment>
	);
};

export default ErrorMessage;
