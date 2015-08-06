/* global Microsoft */
import Ember from 'ember';
import layout from '../templates/components/bing-component';

export default Ember.Component.extend({
  layout: layout,
  lat: 18.355570,
  lng: -66.004951,
  zoom: 10,
  mapTypeId: 'r', // r:road, a:aerial
  markers: [
    {
      lat: 18.355570,
      lng: -66.004951  
    }          
  ],

  polygonLocation: {
    location1:{
      lat: 18.5,
      lng: -66.3
    }, 
    location2:{
      lat:18.5,
      lng:-65.9
    },
    location3:{
      lat: 18.15,
      lng: -65.9
    },
    location4:{
      lat: 18.15,
      lng: -66.3
    }
  },

  fillColor: function(){
    return new Microsoft.Maps.Color(100,100,0,100);
  },

  strokeColor: function(){
    return new Microsoft.Maps.Color(100,100,0,100);
  }
});
