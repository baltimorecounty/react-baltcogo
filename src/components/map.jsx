import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from "react-google-maps";
import { compose, withProps, withHandlers } from "recompose";

const mapElement = <div style={{ height: "300px" }} />;
const AsyncMap = compose(
  withProps({
    googleMapURL:
      "https://maps.google.com/maps/api/js?key=AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: mapElement,
    mapElement: mapElement,
  }),

  withHandlers(() => {
    const refs = {
      map: undefined,
    };

    return {
      onMapMounted: () => (ref) => {
        refs.map = ref;
      },
      onZoomChanged: ({ onZoom }) => () => {
        let zoomValue = refs.map.getZoom();
        onZoom(zoomValue);
      },
      onDragEnd: ({ onDragChange }) => () => {
        const center = refs.map.getCenter();
        onDragChange(center);
      },
    };
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    onDragEnd={props.onDragEnd}
    center={{ lat: props.markerlat, lng: props.markerlng }}
    zoom={props.zoom}
    ref={props.onMapMounted}
    onZoomChanged={props.onZoomChanged}
    onClick={props.setMarker}
    options={{ mapTypeControl: false, streetViewControl: false }}
  >
    {props.displayMarker
      ? props.markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            animation={props.Animation}
          ></Marker>
        ))
      : null}
  </GoogleMap>
));

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{ lat: props.lat, lng: props.lng }],
      markerPosition: {
        markerlat: props.lat,
        markerlng: props.lng,
      },
      previousMarkerPosition: {
        previousmarkerlat: props.lat,
        previousmarkerlng: props.lng,
      },
      previousSearchCondition: "",
      mapEvent: {
        onMapClicked: 0,
        addressSelect: 1,
      },
    };
  }

  onDragChange = (centerval) => {
    const AddressChangeBy = this.props.AddressChangeBy;
    const addressSelect = this.state.mapEvent;
    const lat = centerval.lat();
    const lng = centerval.lng();
    if (AddressChangeBy === addressSelect) {
      this.setState({
        markerPosition: {
          markerlat: lat,
          markerlng: lng,
        },
      });
    } else {
      this.setState({
        previousMarkerPosition: {
          previousmarkerlat: lat,
          previousmarkerlng: lng,
        },
        markerPosition: {
          markerlat: lat,
          markerlng: lng,
        },
      });
    }
  };
  onClearMarkers = () => {
    this.setState({ markers: [] });
  };

  SetMarkerPosition(e, props) {
    const previousSearchCondition = this.state.previousSearchCondition;
    const AddressChangeBy = props.AddressChangeBy;
    const onClickLat = e.latLng.lat();
    const onClickLng = e.latLng.lng();

    this.onClearMarkers();

    if (previousSearchCondition !== AddressChangeBy) {
      this.setState({
        previousSearchCondition: AddressChangeBy,
        previousMarkerPosition: {
          previousmarkerlat: this.props.lat,
          previousmarkerlng: this.props.lng,
        },
        markerPosition: {
          markerlat: onClickLat,
          markerlng: onClickLng,
        },
      });
    }

    this.setState({ markers: [{ lat: onClickLat, lng: onClickLng }] });
    props.onMarkerDragEnd(e, props.setFieldValue);
  }

  render() {
    const {
      address,
      onMarkerDragEnd,
      onZoom,
      lat,
      lng,
      Animation,
      AddressChangeBy,
    } = this.props;
    const {
      previousmarkerlat,
      previousmarkerlng,
    } = this.state.previousMarkerPosition;
    const defaultMarkers = [{ lat: this.props.lat, lng: this.props.lng }];
    const { onMapClicked } = this.state.mapEvent;
    const markers = this.state.markers;
    const splitAddress = address.split(",");
    const zip = splitAddress[2];
    return (
      <div>
        <AsyncMap
          markerlat={AddressChangeBy === onMapClicked ? previousmarkerlat : lat}
          markerlng={AddressChangeBy === onMapClicked ? previousmarkerlng : lng}
          markers={AddressChangeBy === onMapClicked ? markers : defaultMarkers}
          Animation={Animation}
          setMarker={(e) => this.SetMarkerPosition(e, this.props)}
          onMarkerDragEnd={onMarkerDragEnd}
          zoom={this.props.zoom}
          onZoom={onZoom}
          displayMarker={zip}
          onDragChange={this.onDragChange}
        />
      </div>
    );
  }
}

export default Map;
