/* global Microsoft */
import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';



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
  let $component = this.append();


  Ember.run(function() {
    component.set('lat', 18.4500);
    component.set('lng', 66.1000);
    component.createMap();  
    let map = component.map;
    assert.equal(component.lat, 18.4500);
    assert.equal(component.lng, 66.1000);
  });
});

test('that a single marker is being displayed in map', function(assert) {
  let component = this.subject();
  let location = new Microsoft.Maps.Location(18.4500, -66.1000);     
  component.set('markers', [
    {
      lat: 18.4500,
      lng: -66.1000
    }
    ]);           
  let $component = this.append();
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
  let location1 = new Microsoft.Maps.Location(18.4500, -66.1000);
  let location2 = new Microsoft.Maps.Location(-18.2146, 66.0103);
  let location3 = new Microsoft.Maps.Location(0, 0);
  component.set('markers', [
    {
      lat: 18.4500,
      lng: -66.1000
    },
    {
      lat: -18.2146, 
      lng: 66.0103
    },
    {
      lat: 0,
      lng: 0
    }
    ]);

  let $component = this.append();

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
  let $component = this.append();  
  Ember.run(function() {
    component.set('lat', 18.2146); 
    component.set('lng', -66.0103);
    component.createMap();
    let map = component.get('map');
    assert.equal(component.get('mapOptions').center.latitude, component.lat);
    assert.equal(component.get('mapOptions').center.longitude, component.lng);
    assert.equal(map.getCenter().latitude.toFixed(4), component.lat);
    assert.equal(map.getCenter().longitude.toFixed(4), component.lng);
  });
});

test('that map option equal to zoom', function(assert) {
  let component = this.subject();
  component.zoom = 5;
  let $component = this.append();

  Ember.run(function() {
    let map = component.map;

    assert.equal(map.getZoom(), component.zoom);
    assert.equal(map.getZoom(), 5);
    assert.notEqual(map.getZoom(), 10);
  });
});

test('that map option equal to mapTypeId', function(assert) {
  let component = this.subject();
  component.mapTypeId = 'a';
  let $component = this.append();

  Ember.run(function() {
    let map = component.map;

    assert.equal(map.getMapTypeId(), component.mapTypeId);
    assert.equal(map.getMapTypeId(), 'a');
    assert.notEqual(map.getMapTypeId(), 'r');
  });
});

test('that map is drawing polygon', function(assert) {
  let component = this.subject();
  component.set('polygonLocation', {
    location1:{
      lat: 0,
      lng: 0
    },
    location2:{
      lat:0,
      lng:1
    },
    location3:{
      lat: -1,
      lng: 1
    },
    location4:{
      lat: -1,
      lng: 0
    }
  });

  let $component = this.append();

  Ember.run( function() {
    let polygonLocation = component.polygonLocation;
    let location1 = new Microsoft.Maps.Location(polygonLocation.location1.lat, polygonLocation.location1.lng);
    let location2 = new Microsoft.Maps.Location(polygonLocation.location2.lat, polygonLocation.location2.lng);
    let location3 = new Microsoft.Maps.Location(polygonLocation.location3.lat, polygonLocation.location3.lng);
    let location4 = new Microsoft.Maps.Location(polygonLocation.location4.lat, polygonLocation.location4.lng);
    let vertices = new Array(location1, location2, location3, location4, location1);
    let polygonFillColor = new Microsoft.Maps.Color(150,200,10,150);
    let polygonStrokeColor = new Microsoft.Maps.Color(50,100,15,50);
    let polygon = new Microsoft.Maps.Polygon(vertices,{fillColor: polygonFillColor, strokeColor: polygonStrokeColor});
    component.set('createPolygon', polygon);
    component.createMap();
    let map = component.map;

    //Locations
    for( let i=0; i>map.entities.get(1)._locations.length -1; i++ ) {
      assert.equal(map.entities.get(1)._locations[i].latitude, polygon._locations[i].latitude);
      assert.equal(map.entities.get(1)._locations[i].longitude, polygon._locations[i].longitude);
    }

    //Fill Colors
    assert.equal(map.entities.get(1)._fillColor.a, polygon._fillColor.a);
    assert.equal(map.entities.get(1)._fillColor.r, polygon._fillColor.r);
    assert.equal(map.entities.get(1)._fillColor.g, polygon._fillColor.g);
    assert.equal(map.entities.get(1)._fillColor.b, polygon._fillColor.b);

    //Stroke Color
    assert.equal(map.entities.get(1)._strokeColor.a, polygon._strokeColor.a);
    assert.equal(map.entities.get(1)._strokeColor.r, polygon._strokeColor.r);
    assert.equal(map.entities.get(1)._strokeColor.g, polygon._strokeColor.g);
    assert.equal(map.entities.get(1)._strokeColor.b, polygon._strokeColor.b);
  });
});

// test('that credentials are being successfully assigned', function(assert) {
//   let component = this.subject();
//   let $component = this.append();
//   let map = component.map;
//   debugger;
// });






