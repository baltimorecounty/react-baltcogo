import React from 'react'
// import { google } from 'react-google-maps';




const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");

/* console.log('-----test2----');
console.log(test2); */
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} = require("react-google-maps");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

const MapWithASearchBox = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8&libraries=geometry,drawing,places",

        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),

    lifecycle({
        componentWillMount() {
            const refs = {}

            this.setState({
                bounds: null,
                center: {
                    lat: 41.9, lng: -87.624
                },
                markers: [],
                onMapMounted: ref => {
                    refs.map = ref;
                },
                onBoundsChanged: () => {
                    console.log('--onBoundsChanged--');
                    this.setState({
                        bounds: refs.map.getBounds(),
                        center: refs.map.getCenter(),
                    })
                },
                onSearchBoxMounted: ref => {
                    console.log('--onSearchBoxMounted--');
                    refs.searchBox = ref;
                },
                onChange: ({ currentTarget: input }) => {

                    console.log('--onChange--');
                    console.log(input.value);
                    if (!input.value) {
                        this.setState({inputval : 0});
                        return false;
                    }
                    else {
                        this.setState({inputval : 1});
                        return true;
                    }
                },
                onPlacesChanged: () => {
                    console.log('--insdie onPlaceChanged--');
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
                    refs.map.fitBounds(bounds);
                },
            })
        },
    }),
    withScriptjs,
   withGoogleMap
)(props => <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
>

    <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}

    >
        <input
            name="googlesearch"
            type="text"
            placeholder="Customized your placeholder"
            onChange={e => props.onChange(e)}
            style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `300px`,
                height: `32px`,
                marginTop: `1px`,
                marginLeft: '150px',
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
            }}
        />
    </SearchBox>
    {props.markers.map((marker, index) =>
        <Marker key={index} position={marker.position} />
    )}
</GoogleMap>
);


export default MapWithASearchBox;

 export function CheckhandleChange (){
  //  console.log('this.state.inputval---:' + this.inputval);
 }  