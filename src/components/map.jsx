import React from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
Geocode.setApiKey('AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8');





//Geocode.enableDebug();
class Map extends React.Component {


	shouldComponentUpdate(nextProps, nextState) {
		/* 	console.log('==========================================');
			console.log('this.center.lat:' + this.props.lat);
			console.log('this.props.marker.lat :' + this.props.markerLat);
			console.log('nextProps.center.lat :' + nextProps.center.lat);
			console.log('++++++++++++++++++++++++++++++++++++++++++');
	
	
	 */
		if (this.props.lat === nextProps.center.lat) {
			//console.log('first - return : false');
			return false;
		}
		else if (this.props.lat === this.props.markerLat) {
			//console.log('second - return : true');
			return true;

		}
		else if (this.props.center.lat === nextProps.center.lat) {
			//console.log('third - return : false')
			return false;
		}
		else if (this.props.lat === this.props.center.lat) {
			//console.log('third - return : false')
			return true
		}
		else {
			//console.log('NONE');
			return false;
		}
	}



	render() {
		const { address, lat, lng, markerLat, onMarkerDragEnd } = this.props;
		console.log('=========================');
		console.log('address:' + address);
		console.log('lat:' + lat);
		console.log('lng:' + lng);
		console.log('=========================');

		const AsyncMap = withScriptjs(
			withGoogleMap(
				props => (
					<GoogleMap google={this.props.google}
						defaultZoom={this.props.zoom}
						defaultCenter={{ lat, lng }}
						onClick={onMarkerDragEnd}
					>

						<Marker google={this.props.google}
							//name={'Dolores park'}
							draggable={true}
							onDragEnd={onMarkerDragEnd}

							position={{ lat, lng }}
						/>
						<Marker />

						<InfoWindow
							onClose={this.onInfoWindowClose}
							position={{ lat: (lat + 0.0018), lng: lng }}
						>
							<div>
								<span style={{ padding: 0, margin: 0 }}>{address}</span>
							</div>
						</InfoWindow>
					</GoogleMap>

				)
			)
		);
		let map;
		if (lat !== undefined) {

			map = <React.Fragment>

				<AsyncMap
					googleMapURL="https://maps.google.com/maps/api/js?key=AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8&libraries=geometry,drawing,places"
					loadingElement={
						<div style={{ height: `100%` }} />
					}
					containerElement={
						<div style={{ height: this.props.height }} />
					}
					mapElement={
						<div style={{ height: `100%` }} />
					}
				/>
			</React.Fragment>
		} else {

			map = <div style={{ height: this.props.height }} />
		}


		return (map)
	}
}
export default Map