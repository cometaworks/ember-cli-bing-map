import Ember from 'ember';
import layout from '../templates/components/bing-component';

function latRandomizer() {
  return (Math.random() * 181) - 90;
}

function lngRandomizer() {
  return (Math.random() * 281) - 180;
}

export default Ember.Component.extend({
  layout: layout,
  lat: 0,
  lng: 0,
  zoom: 1,
  mapTypeId: 'r', // r:road, a:aerial
  markers: [
    {
      lat: latRandomizer(),
      lng: lngRandomizer(),
    },
  ],

  polygonLocation: {
    location1:{
      lat: latRandomizer(),
      lng: lngRandomizer(),
    },
    location2:{
      lat: latRandomizer(),
      lng: lngRandomizer(),
    },
    location3:{
      lat: latRandomizer(),
      lng: lngRandomizer(),
    },
    location4:{
      lat: latRandomizer(),
      lng: lngRandomizer(),
    },
  },

  fillColor: [Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), Math.floor(Math.random() * 250)],

  strokeColor: [Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), Math.floor(Math.random() * 250)],
});
