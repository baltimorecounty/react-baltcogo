import { returnRequestTypes } from "./returnEnvironmentItems"
export const formIncomplete = (props) => {

	let requestType = props.values['requestType'].toLowerCase();
	let subRequestType = props.values['subRequestType'].toLowerCase();

	if (requestType !== ""
			&& subRequestType !== "") {
		if (requestType === returnRequestTypes("requestType_RoadsAndSidewalks").toLowerCase()
				&& subRequestType === returnRequestTypes("subCategory_IcyConditions").toLowerCase()) {
			return true;
		}
		else if ((requestType === returnRequestTypes("requestType_WaterandSewerIssues").toLowerCase())
				&& (subRequestType === returnRequestTypes("subCategory_SewerIssues").toLowerCase() ||
				subRequestType === returnRequestTypes("subCategory_StormWaterIssues").toLowerCase() ||
				subRequestType === returnRequestTypes("subCategory_WaterSupplyIssues").toLowerCase()
				)) {
			return true;
		}
		else if ((requestType === returnRequestTypes("requestType_TrashRecycleIssue").toLowerCase())
				&& (subRequestType === returnRequestTypes("subCategory_CanOrLidLostDamaged").toLowerCase() ||
				subRequestType === returnRequestTypes("subCategory_PropertyDamangeDuringCollecttion").toLowerCase() ||
				subRequestType === returnRequestTypes("subCategory_RecyclingNotCollected").toLowerCase() ||
				subRequestType === returnRequestTypes("subCategory_RequestToStartNewCollection").toLowerCase() ||
				subRequestType === returnRequestTypes("subCategory_TrashNotCollected").toLowerCase() ||
				subRequestType === returnRequestTypes("subCategory_YardWasteNotCollected").toLowerCase()
				)) {
			return true;
		}
		else if (requestType === returnRequestTypes("requestType_petAndAnimalIssue").toLowerCase()
				&& subRequestType !== ""
				&& props.values['petType'] === "") {
			return true;
		}
		else if (requestType === returnRequestTypes("requestType_petAndAnimalIssue").toLowerCase()
				&& subRequestType !== ""
				&& props.values['petType'] !== ""
				&& (props.values['petType'].toLowerCase() === returnRequestTypes("petTypeCat").toLowerCase()
					|| props.values['petType'].toLowerCase() === returnRequestTypes("petTypeDog").toLowerCase())
				&& props.values['animalColorType'] === "") {
			console.log('Pett ---Is it here ----');
			return true;
		}
		else if (requestType === returnRequestTypes("requestType_petAndAnimalIssue").toLowerCase()
				&& subRequestType !== ""
				&& (props.values['petType'] !== ""
					&& (props.values['petType'].toLowerCase() === returnRequestTypes("petType_Others").toLowerCase()
						&& props.values['otherAnimalTypes'] === ""))) {
			return true;
		}
		else if (requestType === 'website issue' && props.values['serviceDescription'].trim() === "") {
			return true;
		}
		else {
			console.log('--it it here---');
			return false;
		}
	}
	else {
		return true;
	}
}


export default formIncomplete