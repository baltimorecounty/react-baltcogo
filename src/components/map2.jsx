import React, { Component } from 'react'
import { render } from 'react-dom';
//import Joi from "joi-browser";

//import { google } from 'react-google-maps';
class Map extends Component {

    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this)
    }

    onScriptLoad() {
        console.log('--inside onScriptLoad()--');
        console.log('--this.props.id-:' + this.props.id);
        const map = new window.google.maps.Map(document.getElementById(this.props.id), this.props.options);

        var searchBox = new window.google.maps.places.SearchBox( document.getElementById('googlesearch'));
          window.google.maps.event.addDomListener(searchBox, 'places_changed', function () {
            var data = document.getElementById('googlesearch').value;
            console.log( data);
            console.log('--before mapHandleChange---');
           //{this.props.mapHandleChange(document.getElementById('googlesearch').value);}
            console.log('--After mapHandleChange---');
        var places = searchBox.getPlaces();
         var bounds = new window.google.maps.LatLngBounds();

         places = searchBox.getPlaces();

                var marker = new window.google.maps.Marker({
                   position: {
                       lat: 27.72,
                       lng: 85.36
                   },
                   map: map,
                   draggable: true
               }); 
        var i, place;
        for (i = 0; place = places[i]; i++) {
           bounds.extend(place.geometry.location);
        marker.setPosition(place.geometry.location);
         }
          map.fitBounds(bounds);
        map.setZoom(15);
          })
         
        // console.log('--inside onScriptLoad()1--');
        // this.props.onMapLoad(map)
        // console.log('--out onScriptLoad()--');
    }


    componentDidMount() {
        console.log('--componentDidMount--');
        if (!window.google) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = "https://maps.google.com/maps/api/js?key=AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8&libraries=geometry,drawing,places"
            console.log('--working--');
            var x = document.getElementsByTagName('script')[0];
            console.log('--working2--');
            x.parentNode.insertBefore(s, x);
            console.log('--working3--');
            /*   var mi = document.createElement("input");
              mi.setAttribute('id', 'googlesearch1');
              mi.setAttribute('type', 'text');
              mi.setAttribute('value', 'default'); */


            s.addEventListener('load', e => {
                this.onScriptLoad()
            })
        } else {
            this.onScriptLoad()
        }
    }



    render() {
        console.log('--inside render-map2-');
        return (
            <React.Fragment>
               

                <div style={{ width: 500, height: 500 }} id={this.props.id} />
            </React.Fragment>
        );
    }
}

export default Map;

export function test1(){
    console.log ('--inise test1---');
    console.log(document.getElementById('googlesearch').value);
var data = document.getElementById('googlesearch').value;
return data;
}