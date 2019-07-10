import React from "react";

const WaterandSewerIssue = ({ requestType, subRequestType, WaterandSewerIssues, SewerIssues, StormWaterIssues, WaterSupplyIssues, notes }) => {


	return (
		<React.Fragment>
			{(requestType === WaterandSewerIssues.toLowerCase())
                && (subRequestType === SewerIssues.toLowerCase() ||
                    subRequestType === StormWaterIssues.toLowerCase() ||
                    subRequestType === WaterSupplyIssues.toLowerCase()
                ) ? notes : null}
		</React.Fragment>
	);
};

export default WaterandSewerIssue;
