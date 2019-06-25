import React from "react";

const TrashAndRecycle = ({ requestType, subRequestType, TrashRecycleIssue,
	CanOrLidLostDamaged,
	PropertyDamangeDuringCollecttion,
	RecyclingNotCollected,
	RequestToStartNewCollection,
	TrashNotCollected,
	YardWasteNotCollected,
	notes }) => {


	return (
		<React.Fragment>
			{(requestType=== TrashRecycleIssue)
                && (subRequestType === CanOrLidLostDamaged.toLowerCase() ||
                    subRequestType === PropertyDamangeDuringCollecttion.toLowerCase() ||
                    subRequestType === RecyclingNotCollected.toLowerCase() ||
                    subRequestType === RequestToStartNewCollection.toLowerCase() ||
                    subRequestType === TrashNotCollected.toLowerCase() ||
                    subRequestType === YardWasteNotCollected.toLowerCase()
                ) ? notes  : null
			}
		</React.Fragment>
	);
};

export default TrashAndRecycle;









/* (rest.formik.values['requestTypeDescription'].toLowerCase() === requestType_TrashRecycleIssue.toLowerCase())
    && (rest.formik.values['subRequestTypeDescription'].toLowerCase() === subCategory_CanOrLidLostDamaged.toLowerCase() ||
        rest.formik.values['subRequestTypeDescription'].toLowerCase() === subCategory_PropertyDamangeDuringCollecttion.toLowerCase() ||
        rest.formik.values['subRequestTypeDescription'].toLowerCase() === subCategory_RecyclingNotCollected.toLowerCase() ||
        rest.formik.values['subRequestTypeDescription'].toLowerCase() === subCategory_RequestToStartNewCollection.toLowerCase() ||
        rest.formik.values['subRequestTypeDescription'].toLowerCase() === subCategory_TrashNotCollected.toLowerCase() ||
        rest.formik.values['subRequestTypeDescription'].toLowerCase() === subCategory_YardWasteNotCollected.toLowerCase()
    ) ? notes : null */