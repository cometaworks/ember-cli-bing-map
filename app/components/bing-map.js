import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  classNames: ['bing-map'],
  lat: 38.88333,
  lng: -95.0167,
  zoom: 4,
  mapTypeId: 'r', // r:road, a:aerial
  markers: [
    {
      lat:null, // add markers locations
      lng:null  // to add another marker, simply create a new object inside
    },          // marker array
  ],

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
    return {
      center: this.get('center'),
      zoom: this.zoom,
      mapTypeId: this.mapTypeId,
      credentials: config.bingAPI
    };
  }.property('center', 'zoom', 'mapTypeId'),

  createMap: function() {
    let el = this.$()[0];
    let opts = this.get('mapOptions');

    let getMarker = this.get('getMarker');
    this.map = new Microsoft.Maps.Map(el, opts);
<<<<<<< HEAD
    let thisMap = this.map;

    getMarker.forEach(function(location){
      let marker = new Microsoft.Maps.Pushpin(location);
      thisMap.entities.push(marker)//add marker to map
    })


=======
    this.map.entities.push(this.getMarker()); //add marker to map
>>>>>>> b2326d1cd8335eccae1c972fd7cdb8789fa0cb88
  }.on('didInsertElement'),

  removeMap: function() {
    this.map.dispose();
  }.on('willDestroyElement'),


  getMarker: function(){
<<<<<<< HEAD
    let markers = this.get('markers');
    let location = [];

    this.get('markers').forEach(function(marker){
      let lat = marker.lat;
      let lng = marker.lng;
      location.push(new Microsoft.Maps.Location(lat, lng));
    })
    return location;    
  }.property()
=======
    let lat = 38;
    let lng = -95;
    let markerLocation = new Microsoft.Maps.Location(lat, lng);
    let marker = new Microsoft.Maps.Pushpin(markerLocation);
    return marker;    
  }  
>>>>>>> b2326d1cd8335eccae1c972fd7cdb8789fa0cb88

});
