/* global Microsoft */
import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  classNames: ['bing-map'],
  lat: 30.1,
  lng: -81.4,
  zoom: 10,
  mapTypeId: 'r', // r:road, a:aerial
  markers: [
    {
      lat: null, // add markers locations
      lng: null  // to add another marker, simply add a new object inside
    }          // marker array
  ],

  polygonLocation: {
    location1:{
      lat:30.1,
      lng: -81.6
    }, 
    location2:{
      lat:30.1,
      lng:-81.4
    },
    location3:{
      lat:30,
      lng: -81.4
    },
    location4:{
      lat: 30,
      lng: -81.6
    },
  },

  init() {
    this._super();
    if(!config.bingAPI) {
      throw('Missing BING API KEY');
    }
    this.api = Microsoft.Maps;
    this.map = null;
  },

  didInsertElement() {
    this.createMap();
  },

  willDestroyElement() {
    this.removeMap();
  },

  center: Ember.computed('lat', 'lng', function() {
    let latitude = this.get('lat');
    let longitude = this.get('lng');
    let location = new Microsoft.Maps.Location(latitude, longitude);
    return location;
  }),

  mapOptions: Ember.computed('center', 'zoom', 'mapTypeId', function() {
    let opts = this.getProperties('center', 'zoom', 'mapTypeId');
    opts.credentials = config.bingAPI;
    return opts;
  }),

  createMap: function() {
    let el = this.$()[0];
    let opts = this.get('mapOptions');

    let getMarker = this.get('getMarker');
    this.map = new Microsoft.Maps.Map(el, opts);

    getMarker.forEach((location) => {
      let marker = new Microsoft.Maps.Pushpin(location);
      this.map.entities.push(marker); //add marker to map
    });
    this.map.entities.push(this.get('createPolygon'));

  },

  removeMap: function() {
    this.map.dispose();
  },

  getMarker: Ember.computed(function(){
      let location=[];
      this.get('markers').forEach((marker) => {
        let lat = marker.lat;
        let lng = marker.lng;
        location.push(new Microsoft.Maps.Location(lat,lng));
      });
    return location;    
  }),

  createPolygon: Ember.computed(function(){
    let polygonLocation = this.get('polygonLocation');

    let location1 = new Microsoft.Maps.Location(polygonLocation.location1.lat, polygonLocation.location1.lng);
    let location2 = new Microsoft.Maps.Location(polygonLocation.location2.lat, polygonLocation.location2.lng);
    let location3 = new Microsoft.Maps.Location(polygonLocation.location3.lat, polygonLocation.location3.lng);
    let location4 = new Microsoft.Maps.Location(polygonLocation.location4.lat, polygonLocation.location4.lng);

    let vertices = new Array(location1, location2, location3, location4, location1);
    let polygoncolor = new Microsoft.Maps.Color(100,100,0,100);
    let polygon = new Microsoft.Maps.Polygon(vertices,{fillColor: polygoncolor, strokeColor: polygoncolor});
    return polygon;
  })

});
