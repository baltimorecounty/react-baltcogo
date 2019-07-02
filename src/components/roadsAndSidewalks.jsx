import React from "react";

const RoadsAndSidewalks = ({ requestType, subRequestType, RoadsAndSidewalks, IcyConditions, notes }) => {


	return (
		<React.Fragment>
			{(requestType === RoadsAndSidewalks.toLowerCase())
                && (subRequestType === IcyConditions.toLowerCase()
                ) ? notes : null}
		</React.Fragment>
	);
};

export default RoadsAndSidewalks;