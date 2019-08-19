import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from "react-google-maps";
import { compose, withProps, withHandlers } from "recompose";
import _ from 'lodash';
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
			marker: undefined,
		}

		return {
			onMapMounted: () => ref => {
				refs.map = ref;
				//refs.marker = ref;
				//ref.map.setOptions();
				let boundval = refs.map.getBounds();
				console.log('------------------------');
				console.log('bounval:' + boundval);
				console.log('------------------------');
			},
			onZoomChanged: ({ onZoom }) => () => {
				let zoomValue = refs.map.getZoom();
				// let boundval = refs.map.getBounds();
				// let centerval = refs.map.getCenter();
				// console.log('bounval:' + refs.map.getBounds());
				// console.log('centerval:' + centerval);
				// console.log('onBoundChanged:' + refs.map.onBoundsChanged);
				onZoom(zoomValue);
			},
			onBoundsChanged: () => () => {
				//let zoomValue = refs.map.getZoom();
				// let boundval = refs.map.getBounds();
				//let centerval = refs.map.getCenter();
				// console.log('onBoundChanged:' + boundval);
				// console.log('centerval:' + refs.map.getCenter());
				// console.log('Marker:');
				// console.log(refs.map);
				//console.log('centerval:' + centerval);
				//	console.log('onBoundChanged:' + refs.map.onBoundsChanged);
				//	onZoom(zoomValue);
			},
		}
	}),
	withScriptjs,
	withGoogleMap,
)(props =>
	<GoogleMap
		center={{ lat: props.markerlat, lng: props.markerlng }}
		zoom={props.zoom}
		ref={props.onMapMounted}
		onZoomChanged={props.onZoomChanged}
		onClick={props.setMarker}
		onBoundsChanged={props.onBoundsChanged}

		options={{ mapTypeControl: false, streetViewControl: false, gestureHandling: 'none' }}
	>
		{(props.displayMarker) ? <Marker
			position={{ lat: props.lat, lng: props.lng }}
			//draggable={true}
			//onDragEnd={props.onMarkerDragEnd}
			animation={Animation}
		>
		</Marker> : null} *
		{/* {props.markers.map((marker, index) =>
			<Marker key={index} position={{ lat: props.markerlat, lng: props.markerlng }}
			
			/>)} */}
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
			previousMarkerPosition: {
				previousmarkerlat: '',
				previousmarkerlng: ''
			},
			previousSearchCondition: '',
		}
	}
	SetMarkerPosition(e, props) {
		const previousSearchCondition = this.state.previousSearchCondition;
		const AddressChange = props.AddressChange;

		if (previousSearchCondition || (previousSearchCondition !== AddressChange)) {
			this.setState({
				previousSearchCondition: AddressChange,
				previousMarkerPosition: {
					previousmarkerlat: props.lat,
					previousmarkerlng: props.lng
				},
				markerPosition: {
					markerlat: e.latLng.lat(),
					markerlng: e.latLng.lng()
				}
			});
		}

		props.onMarkerDragEnd(e, props.setFieldValue);
	}

	render() {
		const { address, onMarkerDragEnd, onZoom, lat, lng,  Animation,AddressChange } = this.props;
		const { markerlat, markerlng } = this.state.markerPosition;
		const {previousmarkerlat,previousmarkerlng}= this.state.previousMarkerPosition;
		//console.log('address:' + address.split(',',4));

		//console.log('address:' + _.takeRight(address.split(','),4));
		//const { google } = window.map;
		//console.log('markerlat, markerlng :' + markerlat + '---' + markerlng);
		console.log('lat, lng :' + lat + '---' + lng);
		console.log('Animation:' + Animation);
		console.log('AddressChange:' + AddressChange);
		return (
			<div>
				<AsyncMap
			
					markerlat={AddressChange === 0 ? (markerlat === '' ? lat : previousmarkerlat)
						: markerlat !== lat ? lat : markerlat}
					markerlng={AddressChange === 0 ? (markerlng === '' ? lng : previousmarkerlng)
						: markerlng !== lng ? lng : markerlng}
					lat={lat}
					lng={lng}
					Animation={Animation}
					setMarker={e => (this.SetMarkerPosition(e, this.props))}
					onMarkerDragEnd={onMarkerDragEnd}
					zoom={this.props.zoom}
					onZoom={onZoom}
					displayMarker={address}
				//	markers={this.state.markers}
				/>
			</div >
		)
	}
}

export default Map;