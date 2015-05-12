# Ember-cli-bing-map

## Installation

```
ember install ember-cli-bing-map
``` 

## Usage

The component should take the style properties from its parent.

```
<div style="position: relative; width: 700px; height: 700px">
  {{bing-map lat=lat lng=lng zoom=zoom mapTypeId=mapTypeId markers=markers polygonLocation=polygonObject}}
</div>

```
Add reference to the map control in the index.html.

```
<script charset="UTF-8" type="text/javascript" src="http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0"></script>
```
Add Bing API to environment.js.

```
bingAPI: 'API-KEY',
```



