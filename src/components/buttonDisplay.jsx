import React from "react";

const ShowButton = ({ handleSubmit,	onClick, disabled, buttonName, cssClass }) => {

	return (
		<React.Fragment>
			{(!handleSubmit) ? <input type="submit" className= {cssClass}  onClick={onClick} disabled={disabled} value={buttonName} /> : 
				<input type="button" className={cssClass} onClick={onClick} disabled={disabled} value={buttonName}  />}
		</React.Fragment>
	);
};

export default ShowButton;
