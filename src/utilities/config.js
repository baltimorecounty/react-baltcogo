export const endPointsLocal = [
	{ key: 'apiLoginUrl', value: 'http://localhost:54727/platform.citysourced.net/login/' },
	{ key: 'apiSignInUrl', value: 'http://localhost:54727/platform.citysourced.net/SignUp/' },
	{ key: 'apiPasswordResetUrl', value: 'http://localhost:54727/platform.citysourced.net/password/' },
	{ key: 'apiReportUrl', value: 'http://localhost:54727/platform.citysourced.net/servicerequests/' },
	{ key: 'apiContactUrl', value: 'http://localhost:54727/platform.citysourced.net/contacts/' },
	{ key: 'apiVerifyAddressUrl', value: 'http://localhost:54727/platform.citysourced.net/contacts/verifyaddress' }
];
export const endPointsTest = [
	{ key: 'apiLoginUrl', value: 'https://testservices.baltimorecountymd.gov/platform.citysourced.net/login/' },
	{ key: 'apiSignInUrl', value: 'https://testservices.baltimorecountymd.gov/platform.citysourced.net/SignUp/' },
	{
		key: 'apiPasswordResetUrl',
		value: 'https://testservices.baltimorecountymd.gov/platform.citysourced.net/password/'
	},
	{
		key: 'apiReportUrl',
		value: 'https://testservices.baltimorecountymd.gov/platform.citysourced.net/servicerequests/'
	},
	{ key: 'apiContactUrl', value: 'https://testservices.baltimorecountymd.gov/platform.citysourced.net/contacts/' },
	{
		key: 'apiVerifyAddressUrl',
		value: 'https://testservices.baltimorecountymd.gov/platform.citysourced.net/contacts/verifyaddress'
	}
];
export const endPointsProd = [
	{ key: 'apiLoginUrl', value: 'https://services.baltimorecountymd.gov/platform.citysourced.net/login/' },
	{ key: 'apiSignInUrl', value: 'https://services.baltimorecountymd.gov/platform.citysourced.net/SignUp/' },
	{ key: 'apiPasswordResetUrl', value: 'https://services.baltimorecountymd.gov/platform.citysourced.net/password/' },
	{ key: 'apiReportUrl', value: 'https://services.baltimorecountymd.gov/platform.citysourced.net/servicerequests/' },
	{ key: 'apiContactUrl', value: 'https://services.baltimorecountymd.gov/platform.citysourced.net/contacts/' },
	{
		key: 'apiVerifyAddressUrl',
		value: 'https://services.baltimorecountymd.gov/platform.citysourced.net/contacts/verifyaddress'
	}
];
export const jsonFileLocationsLocal = [
	{ key: 'results', value: '/data/categories.json' },
	{ key: 'resultPetTypes', value: '/data/pet-types.json' },
	{ key: 'resultAnimalBreeds', value: '/data/animal-breeds.json' },
	{ key: 'resultAnimalColors', value: '/data/animal-colors.json' },
	{ key: 'resultAnimalTypes', value: '/data/animal-types.json' },
	{ key: 'resultFormFieldNames', value: '/data/form-field-names.json' }
];
export const jsonFileLocationsTest = [
	{ key: 'results', value: '//dev.baltimorecountymd.gov/sebin/q/o/categories.json' },
	{ key: 'resultPetTypes', value: '//dev.baltimorecountymd.gov/sebin/m/c/pet-types.json' },
	{ key: 'resultAnimalBreeds', value: '//dev.baltimorecountymd.gov/sebin/y/c/animal-breeds.json' },
	{ key: 'resultAnimalColors', value: '//dev.baltimorecountymd.gov/sebin/u/w/animal-colors.json' },
	{ key: 'resultAnimalTypes', value: '//dev.baltimorecountymd.gov/sebin/a/g/animal-types.json' },
	{ key: 'resultFormFieldNames', value: '//dev.baltimorecountymd.gov/sebin/c/w/form-field-names.json' }
];

export const jsonFileLocationsProd = [
	{ key: 'results', value: '//dev.baltimorecountymd.gov/sebin/q/m/categories.json' },
	{ key: 'resultPetTypes', value: '//dev.baltimorecountymd.gov/sebin/m/a/pet-types.json' },
	{ key: 'resultAnimalBreeds', value: '//dev.baltimorecountymd.gov/sebin/y/a/animal-breeds.json' },
	{ key: 'resultAnimalColors', value: '//dev.baltimorecountymd.gov/sebin/u/u/animal-colors.json' },
	{ key: 'resultAnimalTypes', value: '//dev.baltimorecountymd.gov/sebin/a/e/animal-types.json' },
	{ key: 'resultFormFieldNames', value: '' }
];
export const formTypesTest = [
	{ key: 'requestType_petAndAnimalIssue', value: 'Pets and Animals' },
	{ key: 'petAndAnimalIssueID_OtherAnimalComplaint', value: 'Other animal complaint' },
	{ key: 'requestType_WebSiteIssue', value: 'Website Issue' },
	{ key: 'subCategory_OtherWebsiteProblem', value: 'Other website problem' },
	{ key: 'requestType_TrashRecycleIssue', value: 'Trash and Recycling Issue' },
	{ key: 'requestType_WaterandSewerIssues', value: 'Water and Sewer Issues' },
	{ key: 'requestType_RoadsAndSidewalks', value: 'Roads and Sidewalks' },
	{ key: 'subCategory_CanOrLidLostDamaged', value: 'Can or lid lost or damaged' },
	{ key: 'subCategory_PropertyDamangeDuringCollection', value: 'Property damage during collection' },
	{ key: 'subCategory_RecyclingNotCollected', value: 'Recycling not collected' },
	{ key: 'subCategory_RequestToStartNewCollection', value: 'Request to start new collection' },
	{ key: 'subCategory_TrashNotCollected', value: 'Trash not collected' },
	{ key: 'subCategory_YardWasteNotCollected', value: 'Yard waste not collected' },
	{ key: 'subCategory_IcyConditions', value: 'Icy conditions' },
	{ key: 'subCategory_SewerIssues', value: 'Sewer issues' },
	{ key: 'subCategory_StormWaterIssues', value: 'Stormwater issues' },
	{ key: 'subCategory_WaterSupplyIssues', value: 'Water supply issues' },
	{ key: 'petTypeCat', value: 'Cat' },
	{ key: 'petTypeDog', value: 'Dog' },
	{ key: 'petType_Others', value: 'Other' }
];
export const formTypesProd = [
	{ key: 'requestType_petAndAnimalIssue', value: 'Pets and Animals Issue' },
	{ key: 'petAndAnimalIssueID_OtherAnimalComplaint', value: 'Other animal complaint' },
	{ key: 'requestType_WebSiteIssue', value: 'Website Issue' },
	{ key: 'subCategory_OtherWebsiteProblem', value: 'Other website problem' },
	{ key: 'requestType_TrashRecycleIssue', value: 'Trash and Recycling Issue' },
	{ key: 'requestType_WaterandSewerIssues', value: 'Water and Sewer Issues' },
	{ key: 'requestType_RoadsAndSidewalks', value: 'Roads and Sidewalks Issue' },
	{ key: 'subCategory_CanOrLidLostDamaged', value: 'Can or lid lost or damaged' },
	{ key: 'subCategory_PropertyDamangeDuringCollection', value: 'Property damage during collection' },
	{ key: 'subCategory_RecyclingNotCollected', value: 'Recycling not collected' },
	{ key: 'subCategory_RequestToStartNewCollection', value: 'Request to start new collection' },
	{ key: 'subCategory_TrashNotCollected', value: 'Trash not collected' },
	{ key: 'subCategory_YardWasteNotCollected', value: 'Yard waste not collected' },
	{ key: 'subCategory_IcyConditions', value: 'Icy conditions' },
	{ key: 'subCategory_SewerIssues', value: 'Sewer issues' },
	{ key: 'subCategory_StormWaterIssues', value: 'Stormwater issues' },
	{ key: 'subCategory_WaterSupplyIssues', value: 'Water supply issues' },
	{ key: 'petTypeCat', value: 'Cat' },
	{ key: 'petTypeDog', value: 'Dog' },
	{ key: 'petType_Others', value: 'Other' }
];

export const mapEndPointDevelopment = [
	{ key: 'mapGISEndPoint', value: 'http://localhost:54727/api/gis/addressLookup/' },
	{
		key: 'mapReverseGISEndPoint',
		value:
			'https://bcgis.baltimorecountymd.gov/arcgis/rest/services/Geocoders/CompositeGeocode_CS/GeocodeServer/reverseGeocode?location='
	}
];

export const mapEndPointTest = [
	{ key: 'mapGISEndPoint', value: 'https://testservices.baltimorecountymd.gov/api/gis/addressLookup/' },
	{
		key: 'mapReverseGISEndPoint',
		value:
			'https://bcgis.baltimorecountymd.gov/arcgis/rest/services/Geocoders/CompositeGeocode_CS/GeocodeServer/reverseGeocode?location='
	}
];
export const mapEndPointProd = [
	{ key: 'mapGISEndPoint', value: 'https://services.baltimorecountymd.gov/api/gis/addressLookup/' },
	{
		key: 'mapReverseGISEndPoint',
		value:
			'https://bcgis.baltimorecountymd.gov/arcgis/rest/services/Geocoders/CompositeGeocode_CS/GeocodeServer/reverseGeocode?location='
	}
];

export default endPointsLocal;
