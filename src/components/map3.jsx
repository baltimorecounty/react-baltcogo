import React, { Component } from 'react'
import { render } from 'react-dom';
import Joi from "joi-browser";
import $ from 'jquery';

//import { runInit } from './citysourced-viewer';

//import { google } from 'react-google-maps';
class Map extends Component {

    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this);
        //this.viewerGoogleMaps = this.viewerGoogleMaps.bind(this);
        this.preMapHandleChange = this.preMapHandleChange.bind(this);
        //this.myEventHandler = this.myEventHandler.bind(this);

    }
    preMapHandleChange() {

        console.log('---preMapHandleChange----');
    }
    viewerGoogleMaps() {

        console.log('--inside viewerGoogleMaps()--');
    }


    onScriptLoad() {
        var mapSettings = {
            center: {
                lat: 39.4001526, // data.Latitude,
                lng: -76.6074448 //data.Longitude
            },
            scrollwheel: false,
            zoom: 14,
            mapTypeId: 'roadmap',
            mapTypeControl: false,
            streetViewControl: false
        };
		/*         var marker = new window.google.maps.Marker({
            position: {
                lat: mapSettings.Latitude * 1,
                lng: mapSettings.Longitude * 1
            },
            animation: window.google.maps.Animation.DROP,
            map: map,
            draggable: true
        }); */
        // this.viewerGoogleMaps();

        console.log('-this.props.id--');
        console.log('this.props.id:value:' + this.props.id);
        console.log('-this.props.mapHandleChange--');
        //   console.log ('this.props.mapHandleChange:value:'+ this.props.mapHandleChange());
        //const map = new window.google.maps.Map(document.getElementById(this.props.id), this.props.options);
        const map = new window.google.maps.Map(document.getElementById(this.props.id), mapSettings);
        var searchBox = new window.google.maps.places.SearchBox(document.getElementById('googlesearch'));
        //var input = document.getElementById('googlesearch');
        // var autocomplete = new window.google.maps.places.Autocomplete(input,{types:["geocode"]});
        // autocomplete.bindTo('bounds', map); 
        // var infowindow = new window.google.maps.InfoWindow(); 

        $("input").focusin(function () {
            //   console.log('this.props.id:focusin:' + this.props.id);
            window.addEventListener("keypress", myEventHandler, false);
        });
        function myEventHandler(e) {

            console.log('---myEventHandler');
            var keyCode = e.keyCode;
            if (keyCode === 13) {
                console.log("You pressed enter!");

                { this.preMapHandleChange() };
            }
        }
        //	$(document).keypress(function (e) {
        //	if (e.which == 13) {
        //selectFirstResult();

        //   s.addEventListener('load', e => {
        //     this.onScriptLoad()
        // })
        //  {this.mapHandleChange('fsd')};
        //	}
        //	});


		/* 	function selectFirstResult() {
    
                // $(".pac-container").hide();
                var firstResult = $(".pac-container .pac-item:first").text();
    
                var geocoder = new window.google.maps.Geocoder();
                geocoder.geocode({ "address": firstResult }, function (results, status) {
                    if (status == window.google.maps.GeocoderStatus.OK) {
                        var lat = results[0].geometry.location.lat(),
                            lng = results[0].geometry.location.lng(),
                            placeName = results[0].address_components[0].long_name,
                            latlng = new window.google.maps.LatLng(lat, lng);
    
                        moveMarker(placeName, latlng);
                        $("input").val(firstResult);
                    }
                });
            } */
        window.google.maps.event.addDomListener(searchBox, 'places_changed', function () {
            //  window.google.maps.event.addDomListener(autocomplete, 'places_changed', function () {
            var data = document.getElementById('googlesearch').value;

            //this.props.mapHandleChange();

            var places = searchBox.getPlaces();
            var bounds = new window.google.maps.LatLngBounds();

            //places = searchBox.getPlaces();

            var marker = new window.google.maps.Marker({
                position: {
                    lat: mapSettings.Latitude * 1,
                    lng: mapSettings.Longitude * 1
                },
                animation: window.google.maps.Animation.DROP,
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

        function moveMarker(placeName, latlng) {

            //  marker.setPosition(latlng);
            // infowindow.setContent(placeName);
            // infowindow.open(map, marker);
        }

    }


    componentDidMount() {

        if (!window.google) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            // s.src = "https://maps.google.com/maps/api/js?key=AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8&libraries=geometry,drawing,places"
            s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8&libraries=geometry,drawing,places"
            //   s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8&libraries=places&callback=baltimoreCounty.pageSpecific.viewerGoogleMaps.initGoogle"

            var x = document.getElementsByTagName('script')[0];

            x.parentNode.insertBefore(s, x);

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
        console.log('--inside render-map3-');
        console.log(this.props.data);
        //this.props.mapHandleChange();
        //  const {mapHandleChange} = this.props;
        //  mapHandleChange();
        return (
            <React.Fragment>


                <div style={{ width: 500, height: 500 }} id={this.props.id} />

            </React.Fragment>
        );
    }
}

export default Map;

/* var loadScript = function(src) {
    var tag = document.createElement('script');
    tag.async = false;
    tag.src = src;
    document.getElementsByTagName('body').appendChild(tag);
  }
  loadScript('//cdnjs.com/some/library.js')
  loadScript('//cdnjs.com/some/other/library.js') */