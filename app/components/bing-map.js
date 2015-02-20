import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  classNames: ['bing-map'],
  lat: 38.88333,
  lng: -95.0167,
  zoom: 4,
  markers: null, // this should be an array
  mapTypeId: 'r', // r:road, a:aerial

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
    console.log(el);
    let opts = this.get('mapOptions');
    this.map = new Microsoft.Maps.Map(el, opts);
  }.on('didInsertElement'),

  removeMap: function() {
    this.map.dispose();
  }.on('willDestroyElement')

});
