import React from "react";

const ShowButton = ({ handleSubmit,	onClick, disabled, buttonName }) => {

	return (
		<React.Fragment>
			{(!handleSubmit) ? <input type="submit" className="seButton pull-right" onClick={onClick} disabled={disabled} value={buttonName} /> : 
				<input type="button" className="seButton pull-right" onClick={onClick} disabled={disabled} value={buttonName}  />}
		</React.Fragment>
	);
};

export default ShowButton;
