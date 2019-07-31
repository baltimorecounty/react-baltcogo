
import React from 'react';
import { UncontrolledCollapse, Button} from 'reactstrap';
import Map from './map';

const Collaspe = ({ address, ZoomValue, lat, lng, onZoom, markerLat, onChange, onMarkerDragEnd }) => {
	return (
		<React.Fragment>
			<Button type="button" className="small" color="link" id="toggler" align="left" style={{ marginBottom: '1rem' }}>
				Or mark location on map
			</Button>
			<UncontrolledCollapse toggler="#toggler">
				<div className="google-map">
					<Map
						address={address} lat={lat} lng={lng} onZoom={onZoom} markerLat={markerLat} onMarkerDragEnd={onMarkerDragEnd}
						center={{ lat, lng }}
						height='300px'
						zoom={ZoomValue === '' ? 15 : ZoomValue}
						streetViewControl='false'
					/>
				</div>
			</UncontrolledCollapse>
		</React.Fragment>
	)
};

export default Collaspe;

