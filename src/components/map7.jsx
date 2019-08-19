import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from "react-google-maps";
import { compose, withProps, lifecycle } from "recompose";
import _ from 'lodash';



const MapWithASearchBox = compose(
	withProps({
		googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8&libraries=geometry,drawing,places",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `400px` }} />,
		mapElement: <div style={{ height: `100%` }} />,
	}),
	lifecycle({
		componentWillMount() {
			console.log('componentWillMount');
			const refs = {}
			//	console.log('lat-lng:' + this.props.lat + '-++++++++++--' + this.props.lng);
			this.setState({
				bounds: null,
				center: {
					//lat: 39.40037792, lng: -76.60651907
					lat: this.props.markerlat !== this.props.lat ? this.props.markerlat : this.props.lat,
					lng: this.props.markerlng !== this.props.lng ? this.props.markerlng : this.props.lng
				},

				markers: [],
				onMapMounted: ref => {
					refs.map = ref;
				},
				onMarkerMounted: ref => {
					console.log('onMarkerMounted');
					refs.marker = ref;
				},
				onPositionChanged: () => {
					console.log('did position changed');
					const position = refs.marker.getPosition();
					console.log(position.toString());
					let whatvalue = refs.map.getBounds().contains(position);
					console.log('whatvalue:' + whatvalue);
				},
				onBoundsChanged: () => {
					let bounds = refs.map.getBounds();
					//refs.map.getBounds().contains(marker.getPosition());
					// console.log('===================================');
					// //console.log('bounval:' + bounds);
					// console.log('North-East:' + bounds.getNorthEast());
					// console.log('South-West:' + bounds.getSouthWest());
					// console.log('===================================');
					// this.setState({
					// 	bounds: refs.map.getBounds(),
					// 	center: refs.map.getCenter(),
					// })
					// const position = refs.marker.getPosition();
					// console.log(position.toString());
					// let whatvalue = refs.map.getBounds().contains(position);
					// console.log('whatvalue:' + whatvalue);
				},

				onZoomChanged: ({ onZoom }) => () => {
					let zoomValue = refs.map.getZoom();
					onZoom(zoomValue);
				},
				onPlacesChanged: () => {
					console.log('onPlacesChanged');
					const places = refs.searchBox.getPlaces();
					const bounds = new window.google.maps.LatLngBounds();

					places.forEach(place => {
						if (place.geometry.viewport) {
							bounds.union(place.geometry.viewport)
						} else {
							bounds.extend(place.geometry.location)
						}
					});
					const nextMarkers = places.map(place => ({
						position: place.geometry.location,
					}));
					const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

					this.setState({
						center: nextCenter,
						markers: nextMarkers,
					});
					// refs.map.fitBounds(bounds);
				},
			})
		},
	}),
	withScriptjs,
	withGoogleMap
)(props =>
	<GoogleMap
		ref={props.onMapMounted}
		defaultZoom={15}
		//defaultCenter={{ lat: props.DefaultLatitude, lng: props.DefaultLongitude }}
		center={props.center}
		onClick={props.setMarker}
		onZoomChanged={props.onZoomChanged}
		onBoundsChanged={props.onBoundsChanged}
		options={{ mapTypeControl: false, streetViewControl: false }}
	>

		{/* {props.markers.map((marker, index) => */}
		<Marker
			//key={index} 
			ref={props.onMarkerMounted}
			position={{ lat: props.markerlat, lng: props.markerlng }}
			draggable={true}
			onDragEnd={props.onMarkerDragEnd}
			animation={props.Animation}
			onPositionChanged={props.onPositionChanged}
		/>
		)}
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
			markers: [],
			lat: this.props.lat,
			lng: this.props.lng,
			bounds: '',
			center: '',
			DefaultLatitude: this.props.DefaultLatitude,
			DefaultLongitude: this.props.DefaultLongitude,
		}
	}
	SetMarkerPosition(e, props) {
		console.log('SetMarkerPosition');
		this.setState({
			markerPosition: {
				markerlat: e.latLng.lat(),
				markerlng: e.latLng.lng()
			}
		});
		props.onMarkerDragEnd(e, props.setFieldValue);
	}


	render() {
		const { address, onMarkerDragEnd, onZoom, lat, lng, DefaultLatitude, DefaultLongitude, Animation } = this.props;
		const { markerlat, markerlng } = this.state.markerPosition;

		//console.log('markerlat, markerlng :' + markerlat + '---' + markerlng);
		//console.log('lat, lng :' + lat + '---' + lng);
		//	console.log('markers:');
		//	console.log(this.state.markers);
		//console.log('address:' + address.split(',',4));

		//console.log('address:' + _.takeRight(address.split(','),4));
		//const { google } = window.map;


		return (
			<div>
				<MapWithASearchBox
					markerlat={markerlat !== lat ? lat : markerlat}
					markerlng={markerlng !== lng ? lng : markerlng}
					lat={lat}
					lng={lng}
					DefaultLatitude={DefaultLatitude}
					DefaultLongitude={DefaultLongitude}
					Animation={Animation}
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
