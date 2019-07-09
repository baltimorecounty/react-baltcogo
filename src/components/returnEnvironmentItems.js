import * as configItems from './config'
import _ from 'lodash';

export const checkEnvironment = () => {
	const environment = window.location.href;
	var urlParts = environment.replace('http://','').replace('https://','').split(/[/?#]/);
	return urlParts[0];
}

export const returnAPIEndPoint = (endPointName) => {
	var domain =  checkEnvironment();
	var endPoint = "";
	
	if (domain === "dev.baltimorecountymd.gov"){
		endPoint = _.filter(configItems.endPointsTest, { key: endPointName })
		return endPoint[0].value;

	}else if(domain === "baltimorecountymd.gov"){
		endPoint = _.filter(configItems.endPointsProd, { key: endPointName })
		return endPoint[0].value;
	}
	else{
		endPoint = _.filter(configItems.endPointsLocal, { key: endPointName })
		return endPoint[0].value;
	}
}

export const returnJsonFileLocations = (fileName) => {
	var domain =  checkEnvironment();
	var fileLocation = "";

	if (domain === "dev.baltimorecountymd.gov"){
		fileLocation = _.filter(configItems.jsonFileLocationsTest, { key: fileName })
		return fileLocation[0].value;

	}else if(domain === "baltimorecountymd.gov"){
		fileLocation = _.filter(configItems.jsonFileLocationsProd, { key: fileName })
		return fileLocation[0].value;
	}
	else{
		fileLocation = _.filter(configItems.jsonFileLocationsTest, { key: fileName })
		return fileLocation[0].value;
	}
}

export const returnRequestTypes = (requestTypeName) => {
	var domain =  checkEnvironment();
	var requestType = "";

	if (domain === "dev.baltimorecountymd.gov"){
		requestType = _.filter(configItems.formTypesTest, { key: requestTypeName })
		return requestType[0].value;

	}else if(domain === "baltimorecountymd.gov"){
		requestType = _.filter(configItems.formTypesProd, { key: requestTypeName })
		return requestType[0].value;
	}
	else{
		requestType = _.filter(configItems.formTypesTest, { key: requestTypeName })
		return requestType[0].value;
	}
}

export const returnMapEndPoint = () => {
	var domain =  checkEnvironment();

	if (domain === "dev.baltimorecountymd.gov"){
		return configItems.mapEndPointTest.value;

	}else if(domain === "baltimorecountymd.gov"){
		return configItems.mapEndPointProd.value;
	}
	else{
		return configItems.mapEndPointTest.value;
	}
}

export default checkEnvironment