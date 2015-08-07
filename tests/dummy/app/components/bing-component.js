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

  fillColor: [Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), Math.floor(Math.random() * 250)],

  strokeColor: [Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), Math.floor(Math.random() * 250)]
});
