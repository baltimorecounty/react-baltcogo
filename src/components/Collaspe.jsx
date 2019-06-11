
import React from 'react';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import Map from './map';
const Collaspe = ({ address, lat, lng, markerLat, onChange, onMarkerDragEnd }) => {
	return (
		<React.Fragment>

			<div>
				<Button type="button" color="link" id="toggler" style={{ marginBottom: '1rem' }}>
                    Or mark location on map
				</Button>
				<UncontrolledCollapse toggler="#toggler">
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
				</UncontrolledCollapse>
			</div>
		</React.Fragment>
	)
};

export default Collaspe;

