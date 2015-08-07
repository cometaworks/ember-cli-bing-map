/* global Microsoft */
import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

function latRandomizer(){
  return (Math.random() * 181) - 90;
}

function lngRandomizer() {
  return (Math.random() * 281) -180;
}

moduleForComponent('bing-map', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function(assert) {

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('that map coordinates are equal to the ones assigned', function(assert) {
  let component = this.subject();
  this.render();


  Ember.run(function() {
    let lat = latRandomizer();
    let lng = lngRandomizer();
    component.set('lat', lat);
    component.set('lng', lng);
    component.createMap();  
    assert.equal(component.lat, lat);
    assert.equal(component.lng, lng);
  });
});

test('that a single marker is being displayed in map', function(assert) {
  let component = this.subject();
  let lat = latRandomizer();
  let lng = lngRandomizer();
  let location = new Microsoft.Maps.Location(lat, lng);     
  component.set('markers', [
    {
      lat: lat,
      lng: lng
    }
    ]);           
  this.render();
  Ember.run(function() {   
    let map = component.map;
    assert.equal(component.get('getMarker')[0].latitude, location.latitude);
    assert.equal(component.get('getMarker')[0].longitude, location.longitude);

    assert.equal(map.entities.get(0)._location.latitude, component.markers[0].lat);
    assert.equal(map.entities.get(0)._location.longitude, component.markers[0].lng);
  });
});

test('that multiple markers are displayed in map', function(assert) {
  let component = this.subject();
  let lats = [];
  let lngs = [];
  for(let i=0; i < 3; i++){
    lats.push(latRandomizer());
    lngs.push(lngRandomizer());
  }
  let location1 = new Microsoft.Maps.Location(lats[0], lngs[0]);
  let location2 = new Microsoft.Maps.Location(lats[1], lngs[1]);
  let location3 = new Microsoft.Maps.Location(lats[2], lngs[2]);
  component.set('markers', [
    {
      lat: lats[0],
      lng: lngs[0]
    },
    {
      lat: lats[1], 
      lng: lngs[1]
    },
    {
      lat: lats[2],
      lng: lngs[2]
    }
    ]);

  this.render();

  Ember.run(function() {
    let map = component.map;

    assert.equal(component.get('getMarker')[0].latitude, location1.latitude);
    assert.equal(component.get('getMarker')[0].longitude, location1.longitude);
    assert.equal(component.get('getMarker')[1].latitude, location2.latitude);
    assert.equal(component.get('getMarker')[1].longitude, location2.longitude);
    assert.equal(component.get('getMarker')[2].latitude, location3.latitude);
    assert.equal(component.get('getMarker')[2].longitude, location3.longitude);

    for(let i = 0; i < component.markers.length; i++) {
      assert.equal(map.entities.get(i)._location.latitude, component.markers[i].lat);
      assert.equal(map.entities.get(i)._location.longitude, component.markers[i].lng);
    }
  });
});

test("that the map's center", function(assert) {
  let component = this.subject();
  this.render();  
  Ember.run(function() {
    component.set('lat', latRandomizer()); 
    component.set('lng', lngRandomizer());
    component.createMap();
    let map = component.get('map');
    assert.equal(component.get('mapOptions').center.latitude, component.lat);
    assert.equal(component.get('mapOptions').center.longitude, component.lng);
    assert.equal(map.getCenter().latitude.toFixed(4), component.lat.toFixed(4));
    assert.equal(map.getCenter().longitude.toFixed(4), component.lng.toFixed(4));
  });
});

test('that map option equal to zoom', function(assert) {
  let component = this.subject();
  component.zoom = 5;
  this.render();

  Ember.run(function() {
    let map = component.map;

    assert.equal(map.getZoom(), component.zoom);
    assert.equal(map.getZoom(), 5);
    assert.notEqual(map.getZoom(), 10);
  });
});

test('that map option equal to mapTypeId', function(assert) {
  let component = this.subject();
  let mapTypeIdArr = ['a', 'r'];
  let mapTypeId = mapTypeIdArr[Math.floor(Math.random() * mapTypeIdArr.length)];
  component.mapTypeId = mapTypeId;
  this.render();

  Ember.run(function() {
    let map = component.map;

    assert.equal(map.getMapTypeId(), component.mapTypeId);
    assert.equal(map.getMapTypeId(), mapTypeId);
  });
});

test('that map is drawing polygon and changing color', function(assert) {
  let component = this.subject();
  component.set('polygonLocation', {
    location1:{
      lat:latRandomizer(),
      lng: lngRandomizer()
    },
    location2:{
      lat:latRandomizer(),
      lng:lngRandomizer()
    },
    location3:{
      lat:latRandomizer(),
      lng: lngRandomizer()
    },
    location4:{
      lat:latRandomizer(),
      lng: lngRandomizer()
    }
  });

  component.set('fillColor', [Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), Math.floor(Math.random() * 250)]);

  component.set('strokeColor', [Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), Math.floor(Math.random() * 250)]);

  this.render();

  Ember.run( function() {
    let polygonLocation = component.polygonLocation;
    let location1 = new Microsoft.Maps.Location(polygonLocation.location1.lat, polygonLocation.location1.lng);
    let location2 = new Microsoft.Maps.Location(polygonLocation.location2.lat, polygonLocation.location2.lng);
    let location3 = new Microsoft.Maps.Location(polygonLocation.location3.lat, polygonLocation.location3.lng);
    let location4 = new Microsoft.Maps.Location(polygonLocation.location4.lat, polygonLocation.location4.lng);
    let vertices = new Array(location1, location2, location3, location4, location1);
    let polygonFillColor = component.fillColor;
    let polygonStrokeColor = component.strokeColor;
    let polygon = new Microsoft.Maps.Polygon(vertices,{fillColor: polygonFillColor, strokeColor: polygonStrokeColor});
    component.set('createPolygon', polygon);
    component.createMap();
    let map = component.map;

    //Locations
    for( let i=0; i>map.entities.get(0)._locations.length -1; i++ ) {
      assert.equal(map.entities.get(0)._locations[i].latitude, polygon._locations[i].latitude);
      assert.equal(map.entities.get(0)._locations[i].longitude, polygon._locations[i].longitude);
    }

    //Fill Colors
    assert.equal(map.entities.get(0)._fillColor.a, polygon._fillColor.a);
    assert.equal(map.entities.get(0)._fillColor.r, polygon._fillColor.r);
    assert.equal(map.entities.get(0)._fillColor.g, polygon._fillColor.g);
    assert.equal(map.entities.get(0)._fillColor.b, polygon._fillColor.b);

    //Stroke Color
    assert.equal(map.entities.get(0)._strokeColor.a, polygon._strokeColor.a);
    assert.equal(map.entities.get(0)._strokeColor.r, polygon._strokeColor.r);
    assert.equal(map.entities.get(0)._strokeColor.g, polygon._strokeColor.g);
    assert.equal(map.entities.get(0)._strokeColor.b, polygon._strokeColor.b);
  });
});