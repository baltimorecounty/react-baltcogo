import React from "react";

const WaterandSewerIssue = ({ requestTypeDescription, subRequestTypeDescription, WaterandSewerIssues, SewerIssues, StormWaterIssues, WaterSupplyIssues, notes }) => {


    return (
        <React.Fragment>
            {(requestTypeDescription === WaterandSewerIssues.toLowerCase())
                && (subRequestTypeDescription === SewerIssues.toLowerCase() ||
                    subRequestTypeDescription === StormWaterIssues.toLowerCase() ||
                    subRequestTypeDescription === WaterSupplyIssues.toLowerCase()
                ) ? notes : null}
        </React.Fragment>
    );
};

export default WaterandSewerIssue;
