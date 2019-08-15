import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from "react-google-maps";
import { compose, withProps, withHandlers } from "recompose";

const mapElement = <div style={{ height: '300px' }} />;
const AsyncMap = compose(
	withProps({
		googleMapURL: "https://maps.google.com/maps/api/js?key=AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8&libraries=geometry,drawing,places",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: mapElement,
		mapElement: mapElement,
	}),

	withHandlers(() => {
		const refs = {
			map: undefined,
		}

		return {
			onMapMounted: () => ref => {
				refs.map = ref
			},

			onMapClick: (setMarker) => (e) => {
				setMarker(e.latLng.lat(), e.latLng.lng());
			},
			onZoomChanged: ({ onZoom }) => () => {
				let zoomValue = refs.map.getZoom();
				onZoom(zoomValue);
			}
		}
	}),
	withScriptjs,
	withGoogleMap,
)(props =>
	<GoogleMap
		center={{ lat: props.lat, lng: props.lng }}
		zoom={props.zoom}
		ref={props.onMapMounted}
		onZoomChanged={props.onZoomChanged}
		onClick={props.setMarker}
		options={{ mapTypeControl: false, streetViewControl: false }}
	>
		{(props.displayMarker) ? <Marker
			position={{ lat: props.markerlat, lng: props.markerlng }}
			draggable={true}
			onDragEnd={props.onMarkerDragEnd}
		>
		</Marker> : null}
	</GoogleMap>
);

class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			markerPosition: {
				markerlat: '',
				markerlng: ''
			},
		}
	}
	SetMarkerPosition(e, props) {
		this.setState({
			markerPosition: {
				markerlat: e.latLng.lat(),
				markerlng: e.latLng.lng()
			}

		});

		props.onMarkerDragEnd(e, props.setFieldValue);
	}


	render() {
		const { address, onMarkerDragEnd, onZoom, lat, lng } = this.props;
		const { markerlat, markerlng } = this.state.markerPosition;

		return (
			<div>
				<AsyncMap
					markerlat={markerlat !== lat ? lat : markerlat}
					markerlng={markerlng !== lng ? lng : markerlng}
					lat={lat}
					lng={lng}
					setMarker={e => (this.SetMarkerPosition(e, this.props))}
					onMarkerDragEnd={onMarkerDragEnd}
					zoom={this.props.zoom}
					onZoom={onZoom}
					displayMarker={address}

				/>
			</div >
		)
	}
}

export default Map;