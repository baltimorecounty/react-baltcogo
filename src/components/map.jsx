import React from 'react';
import _ from 'lodash';
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
		if (searchQuery[2] !== undefined) {

			if (this.props.lat === nextProps.center.lat) {
				if (flag === 0 && incremnetCount === 0) {
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


	render() {

		const { address, lat, lng, onMarkerDragEnd, onZoom } = this.props;
		const mapElement = <div style={{ height: this.props.height }} />;
		const AsyncMap = compose(
			withProps({
				googleMapURL: "https://maps.google.com/maps/api/js?key=AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8&libraries=geometry,drawing,places",
				loadingElement: <div style={{ height: `100%` }} />,
				containerElement: mapElement,
				mapElement: mapElement,
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

				</Marker>
			</GoogleMap>
		);
		return <AsyncMap />
	}

}

export default Map