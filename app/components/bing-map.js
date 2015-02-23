import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  classNames: ['bing-map'],
  lat: 0,
  lng: 0,
  zoom: 0,
  mapTypeId: 'r', // r:road, a:aerial
  markers: [
    {
      lat:null, // add markers locations
      lng:null  // to add another marker, simply create a new object inside
    },          // marker array
  ],

  polygonLocation: {
    location1:{
      lat:null,     //add lat and lng values to use to create polygon around location
      lng:null 
    }, 
    location2:{
      lat:null,
      lng:null 
    }, 
    location3:{
      lat: null,
      lng: null 
    }, 
    location4:{
      lat: null,
      lng: null 
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

  center: function() {
    let latitude = this.lat;
    let longitude = this.api.Location.normalizeLongitude(this.lng);
    return new this.api.Location(latitude, longitude);
  }.property('lat', 'lng'),

  mapOptions: function() {
    let opts = this.getProperties('center', 'zoom', 'mapTypeId');
    opts.credentials = config.bingAPI;
    return opts;
  }.property('center', 'zoom', 'mapTypeId'),

  createMap: function() {
    let el = this.$()[0];
    let opts = this.get('mapOptions');

    let getMarker = this.get('getMarker');
    this.map = new Microsoft.Maps.Map(el, opts);

    getMarker.forEach((location) => {
      let marker = new Microsoft.Maps.Pushpin(location);
      this.map.entities.push(marker); //add marker to map
      this.map.entities.push(this.get('createPolygon'));
    });

  }.on('didInsertElement'),

  removeMap: function() {
    this.map.dispose();
  }.on('willDestroyElement'),

  getMarker: function(){
    let markers = this.get('markers');
    let location = [];

    this.get('markers').forEach((marker) => {
      let lat = marker.lat;
      let lng = marker.lng;
      location.push(new Microsoft.Maps.Location(lat, lng));
    })
    return location;    
  }.property(),

    createPolygon: function(){
      let polygonLocation = this.get('polygonLocation');

      let location1 = new Microsoft.Maps.Location(polygonLocation.location1.lat, polygonLocation.location1.lng);
      let location2 = new Microsoft.Maps.Location(polygonLocation.location2.lat, polygonLocation.location2.lng);
      let location3 = new Microsoft.Maps.Location(polygonLocation.location3.lat, polygonLocation.location3.lng);
      let location4 = new Microsoft.Maps.Location(polygonLocation.location4.lat, polygonLocation.location4.lng);

      let vertices = new Array(location1, location2, location3, location4, location1);
      let polygoncolor = new Microsoft.Maps.Color(100,100,0,100);
      let polygon = new Microsoft.Maps.Polygon(vertices,{fillColor: polygoncolor, strokeColor: polygoncolor});
      return polygon;
    }.property()

});
