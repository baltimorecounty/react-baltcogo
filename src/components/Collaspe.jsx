
import React from 'react';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import Map from './map';
const Collaspe = ({ address, lat, lng, markerLat, onChange, onMarkerDragEnd }) => {
	return (
		<React.Fragment>
			<Button type="button" className="small" color="link" id="toggler" align="left" style={{ marginBottom: '1rem' }}>
                    Or mark location on map
			</Button>	
			<UncontrolledCollapse toggler="#toggler">
				<div className="google-map">
					<Card>
						<CardBody>
							<Map
								address={address} lat={lat} lng={lng} markerLat={markerLat} onMarkerDragEnd={onMarkerDragEnd} 
								//center={{lat: 18.5204, lng: 73.8567}}
								center={{ lat: lat, lng }}
								height='300px'
								zoom={15}
							/>
						</CardBody>
					</Card>
				</div>
			</UncontrolledCollapse>	
		</React.Fragment>
	)
};

export default Collaspe;

