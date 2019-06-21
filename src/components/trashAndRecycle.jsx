import React from "react";

const TrashAndRecycle = ({ requestTypeDescription, subRequestTypeDescription, TrashRecycleIssue,
	CanOrLidLostDamaged,
	PropertyDamangeDuringCollecttion,
	RecyclingNotCollected,
	RequestToStartNewCollection,
	TrashNotCollected,
	YardWasteNotCollected,
	notes }) => {


	return (
		<React.Fragment>
			{(requestTypeDescription=== TrashRecycleIssue)
                && (subRequestTypeDescription === CanOrLidLostDamaged.toLowerCase() ||
                    subRequestTypeDescription === PropertyDamangeDuringCollecttion.toLowerCase() ||
                    subRequestTypeDescription === RecyclingNotCollected.toLowerCase() ||
                    subRequestTypeDescription === RequestToStartNewCollection.toLowerCase() ||
                    subRequestTypeDescription === TrashNotCollected.toLowerCase() ||
                    subRequestTypeDescription === YardWasteNotCollected.toLowerCase()
                ) ? notes : null
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