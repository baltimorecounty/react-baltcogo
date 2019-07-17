import React from 'react';
import _ from 'lodash';
import { VerifyAddress } from './authService';
//import { ErrorCheck } from "./CustomErrorHandling";
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import { compose, withProps, withState, withHandlers } from "recompose";
import Geocode from "react-geocode";
Geocode.setApiKey('AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8');





//Geocode.enableDebug();
class Map extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			flag: 0, incremnetCount: 0
		}
	}

	shouldComponentUpdate(nextProps) {
		const searchQuery = _.takeRight(this.props.address.split(','), 4);
		const { flag, incremnetCount } = this.state;
		let fullAddress = '';
		//console.log('searchQuery- lenght:' + searchQuery.length);
		if (searchQuery[2] !== undefined) {

			//console.log('fullAddress:' + fullAddress);

			if (this.props.lat === nextProps.center.lat) {
				if (flag === 0 && incremnetCount === 0) {
					if (searchQuery.length > 3) {
						fullAddress = searchQuery[0] + ', ' + searchQuery[1] + ', ' + searchQuery[2] + ', ' + searchQuery[3];
					}
					else {
						fullAddress = searchQuery[0] + ', ' + searchQuery[1] + ',MD, ' + searchQuery[2];
					}

					this.validateAddress(fullAddress);
					this.setState({ flag: 0, incremnetCount: 1 });
					return true;
				}
				else {
					return false;
				}
			}
			else if (this.props.lat === this.props.markerLat) {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			if (flag === 0 && incremnetCount === 1) {
				this.setState({ incremnetCount: 0 });
			}
			return false;
		}
	}
	async validateAddress(fullAddress) {

		const addressResponse = await VerifyAddress(fullAddress);
		var VerificationId = "";
		console.log('addressResponse');
		//console.log(addressResponse);
		if (addressResponse.data.HasErrors === true) {
			//const errorsReturned = ErrorCheck(addressResponse);
			//	console.log(errorsReturned);
			//props.Field.ErrorMsg = errorsReturned;
			//throw new Error(errorsReturned);

		}
		else {
			VerificationId = addressResponse.data.Results.VerificationID;
			//	props.setFieldValue('VerificationId', VerificationId);
			//	props.setFieldValue('fullAddress', fullAddress);
			console.log('VerificationId:' + VerificationId);

		}

	}


	render() {

		const { address, lat, lng, markerLat, onMarkerDragEnd, onZoom } = this.props;
		const AsyncMap = compose(
			withProps({
				googleMapURL: "https://maps.google.com/maps/api/js?key=AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8&libraries=geometry,drawing,places",
				loadingElement: <div style={{ height: `100%` }} />,
				containerElement: <div style={{ height: this.props.height }} />,
				mapElement: <div style={{ height: `100%` }} />,
			}),
			withState('zoom', 'onZoomChange', this.props.zoom),
			withHandlers(() => {
				const refs = {
					map: undefined,
				}

				return {
					onMapMounted: () => ref => {
						refs.map = ref
					},
					onZoomChanged: ({ onZoomChange }) => () => {
						let zoomValue = refs.map.getZoom();
						onZoomChange(zoomValue);
						onZoom(zoomValue);
					}
				}
			}),
			withScriptjs,
			withGoogleMap
		)(props =>
			<GoogleMap
				defaultCenter={{ lat, lng }}
				zoom={this.props.zoom}
				ref={props.onMapMounted}
				onZoomChanged={props.onZoomChanged}
				onClick={onMarkerDragEnd}
				options={{ mapTypeControl: false, streetViewControl: false }}
			>
				<Marker
					position={{ lat, lng }}
					onClick={props.onToggleOpen}
					draggable={true}
					onDragEnd={onMarkerDragEnd}


				>
					{address !== '' ?
						<InfoWindow
							onClose={this.onInfoWindowClose}
							position={{ lat: (lat + 0.0018), lng: lng }}
						>
							<div>
								<span style={{ padding: 0, margin: 0 }}>{address}</span>
							</div>
						</InfoWindow> : ''}
				</Marker>
			</GoogleMap>
		);
		return <AsyncMap />
	}

}

export default Map