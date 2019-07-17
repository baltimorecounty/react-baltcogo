import React from 'react';
import _ from 'lodash';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import { compose, withProps, withState, withHandlers } from "recompose";
import Geocode from "react-geocode";
Geocode.setApiKey('AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8');





//Geocode.enableDebug();
class Map extends React.Component {


	shouldComponentUpdate(nextProps, nextState) {
		console.log('=+++++++++++++++++++++++++++++=')
		console.log('this.props.lat - nextProps:' + this.props.lat +'='+  nextProps.center.lat);
		console.log('address1:' + this.props.address);
		let searchQuery = _.split('400 WASHINGTON AVE, TOWSON, 21204', ',', 3);
		console.log('searchQuery:' + searchQuery);
		console.log('============================')
		if (this.props.lat === nextProps.center.lat) {
			//console.log('return value--first:false');
			return false;
		}
		else if (this.props.lat === this.props.markerLat) {
		//	console.log('return value--second:true');
			return true;

		}
		else if (this.props.center.lat === nextProps.center.lat) {
			//console.log('return value--third:false');
			return false;
		}
		else if (this.props.lat === this.props.center.lat) {
			//console.log('return value--fourth:true');
			return true
		}
		else {
			//console.log('return value:false')
			return false;
		}
		;
	}



	render() {
		console.log('map render');
		const { address, lat, lng, markerLat, onMarkerDragEnd, onZoom } = this.props;
		console.log('map address:' + address);
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