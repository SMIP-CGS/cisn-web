// ##################################################
// Get event ID from URL
function getURLParameter(name) {
  return (
    decodeURIComponent(
      (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(
        location.search
      ) || [null, ''])[1].replace(/\+/g, '%20')
    ) || null
  );
}

var eventid = getURLParameter('eventid');

// #####################################################
// Open the double map view
//
function open_single() {
  window.location = './viewLeaflet.html?eventid=' + eventid;
}

// #####################################################
// Write json attributes to a div

function attr_div(attr_collection, div_id) {
  var content = '';
  try {
    Object.keys(attr_collection).forEach(function(key) {
      if (attr_collection[key].hasOwnProperty('module')) {
        content +=
          '<b>' +
          key +
          ' module:</b> ' +
          attr_collection[key]['module'] +
          '<br/>';

      } else {
        content += '<b>' + key + ':</b> ' + attr_collection[key] + '<br/>';
      }
    });
    document.getElementById(div_id).innerHTML = content;
  } catch (err) {
    console.log(err)
  }
}


function attr_div1(attr_collection, div_id) {
  var content = '';
  try {
    Object.keys(attr_collection).forEach(function() {
      if (attr_collection.hasOwnProperty()) {
        content =
              '<b>'+'<h5>'+ attr_collection + '</b>'+ '</h5>'+
          '<br/>';

      } else {
        content = '<b>'+attr_collection + '</b>';
      }
    });
    document.getElementById(div_id).innerHTML = content;
  } catch (err) {
    console.log(err)
  }
}



// ##################################################
// Show fault
function faultSurface(controlName) {
  $.getJSON('./data/' + eventid + '/rupture.json', function(
    json
  ) {
    var fault = json.features;
    show_fault(fault);
  });

  function show_fault(fault) {
    if (fault[0].geometry.coordinates[0].constructor === Array) {
      var faultLayer = L.geoJSON(fault);
      controlName.addOverlay(faultLayer, 'Show fault');
    }
  }
}

// ##################################################
// Show stations
function stationList(mapName, controlName, showOnMap) {
  $.getJSON(
    './data/' + eventid + '/stationlist.json',
    function(json) {
      var stations = json.features;
      show_stations(stations, controlName);
    }
  );

  function show_stations(stations) {
    var stations_layer = L.geoJSON(stations, {
      pointToLayer: function(feature, latlng) {
        if (feature.properties.intensity < 5) {
          var result = feature.properties.mmi_from_pgm.filter(obj => {
            return obj.name === 'pga';
          });
          var stationColor = Math.round(result[0].value);
        } else if (feature.properties.intensity >= 5) {
          var result = feature.properties.mmi_from_pgm.filter(obj => {
            return obj.name === 'pgv';
          });
          var stationColor = Math.round(result[0].value);

        } else {
          var stationWidth = 1;
          var stationRadius = 3;
        }
        return new L.shapeMarker (latlng, {
          fillColor: 'black',
          color: intColors_USGS[stationColor] || 'black',
          shape: 'triangle',
          radius: stationRadius || 5,
          weight: stationWidth || 3
        });
      },
      onEachFeature: function(feature, layer) {
        layer.bindPopup(
          'Station: ' +
          feature.properties.code +
          '<br/>Network: ' +
          feature.properties.network +
          '<br/>Distance: ' +
          feature.properties.distance +
          '<br/>Intensity: ' +
          feature.properties.intensity +
          '<br/>PGA: ' +
          feature.properties.pga +
          '<br/>PGV: ' +
          feature.properties.pgv +
          '<br/>Vs30: ' +
          feature.properties.vs30
        );
      }
    });

    controlName.addOverlay(stations_layer, 'Show stations');
    if (showOnMap == true) {
      stations_layer.addTo(mapName);
    }
  }
}

// ##################################################
// Show epicenter and write info in sidebar
function event_info() {
  $.getJSON('./data/' + eventid + '/info.json', function(
    json
  ) {
    var info_input = json.input.event_information;
      var info_input1=json.input.event_information.location;
       var info_input2=json.input.event_information.origin_time;  
    epi_lat = info_input.latitude;
    epi_lon = info_input.longitude;
      

    magnitude = info_input.magnitude;
    depth = info_input.depth;

    attr_div(info_input, 'input_content');
        attr_div1(info_input1, 'input_content1');
       attr_div1(magnitude, 'input_content2');
       attr_div1(info_input2, 'input_content3');
        attr_div1(epi_lat, 'input_content4');
       attr_div1(epi_lon, 'input_content5');
      attr_div1(depth, 'input_content6')
      
    attr_div(json.output.uncertainty, 'motions_content');
    attr_div(json.processing.ground_motion_modules, 'processing_content');



    show_epi(epi_lat, epi_lon, magnitude, depth);
  });

  function show_epi(latitude, longitude, magnitude) {
    map1.setView(new L.LatLng(latitude, longitude), 8);
    map2.setView(new L.LatLng(latitude, longitude), 8);

    // synchronise maps to zoom in and out together
    map1.sync(map2);
    map2.sync(map1);

    var pulsingIcon = L.icon.pulse({
      iconSize: [10, 10],
      color: 'red',
      heartbeat: 3
    });

    L.marker([latitude, longitude], {
        icon: pulsingIcon
      })
      .addTo(map1)
      .bindPopup('Latitude:' + latitude + ' <br/>Longitude: ' + longitude + '<br/>Magnitude:' + magnitude);

    L.marker([latitude, longitude], {
        icon: pulsingIcon
      })
      .addTo(map2)
      .bindPopup('Latitude:' + latitude + ' <br/>Longitude: ' + longitude + '<br/>Magnitude:' + magnitude);
  }
}

// ##################################################
// Function to show contours of PGA, PGV and PSAs on the map

function show_contours(fileName, layerName, controlName, asPrimaryLayer) {
  $.getJSON(
    './data/' + eventid + '/' + fileName,
    function(json) {
      var contours = json.features;
      plot_contours(contours);
    }
  );

  function plot_contours(contours) {
    var unit = ' %g';
    if (layerName == 'PGV') {
      unit = ' cm/s'
    };
    var contours_layer = L.layerGroup([L.geoJSON(contours, {
      onEachFeature: function (feature, layer) {
        var popupContent = layerName + ': ' + feature.properties.value.toString() + unit;
        layer.bindPopup(popupContent);
      },
      style: function (feature) {
        return {
          color: feature.properties.color,
          weight: feature.properties.weight
        };
      }
    })]);

    var marker_layer = L.geoJSON(contours, {
      onEachFeature: function(feature, layer) {
        for (i = 0; i < feature.geometry.coordinates.length; i++) {
          for (j = 0; j < feature.geometry.coordinates[i].length; j++) {
            if (j % 50 == 0) {
              var marker = L.circleMarker(
                [
                  feature.geometry.coordinates[i][j][1],
                  feature.geometry.coordinates[i][j][0]
                ], {
                  fillColor: '#f03',
                  fillOpacity: 0,
                  radius: 0.1
                }
              ).bindTooltip(feature.properties.value.toString() + unit, {
                permanent: true,
                direction: 'center',
                className: 'my-labels'
              });
              contours_layer.addLayer(marker);
            }
          }
        }
      }
    });

    if (asPrimaryLayer == true) {
      contours_layer.addTo(map2);
    };
    controlName.addBaseLayer(contours_layer, layerName);
  }
}



// #########################################################
// Function call to show Intensity contours on the map

function show_intensity(controlName, asPrimaryLayer) {
  $.getJSON(
    './data/' + eventid + '/cont_mmi.json',
    function(json) {
      var intensity = json.features;
      plot_int(intensity);
    }
  );

  function plot_int(intensities) {
    var intensity_layer = L.geoJSON(intensities, {
      onEachFeature: function(feature, layer) {
        var popupContent = "Intensity: " + feature.properties.value;
        layer.bindPopup(popupContent)
      },
      style: function(feature) {
        return {
          color: feature.properties.color,
          weight: 8 / feature.properties.weight, // weights are lower for integer values of intensity in the shakemap output, so here it's reversed to have the weights in integer values higher
          dashArray: lineStyle[feature.properties.value % 1]
        }
      }
    });

    if (asPrimaryLayer == true) {
      intensity_layer.addTo(map1)
    }
    controlName.addBaseLayer(intensity_layer, 'Intensity-contour');
  }
}

// #######################################################
// Loading raster intensity file
function intensityOverlay(controlName) {
  var imgIntHelper = new Image();

  var height = 0;
  var width = 0;

  var imagePath = './data/' + eventid + '/intensity_overlay.png'
  var fileIntensity = './data/' + eventid + '/intensity_overlay.pngw'

  $.getJSON('./data/' + eventid + '/overlay.json',
    function(json) {
      imgIntHelper.onload = function() {
        height = imgIntHelper.height;
        width = imgIntHelper.width;

        var lower_right_x = json['dx'] * width + json['upper_left_x'];
        var lower_right_y = json['dy'] * height + json['upper_left_y'];

        var imageBounds = [[json['upper_left_y'], json['upper_left_x']],
                            [lower_right_y, lower_right_x]];

        overlayLayer = L.imageOverlay(imagePath, imageBounds,
          {opacity: 0.4}
        );

        controlName.addOverlay(overlayLayer, 'Intensity-overlay');
      }
      imgIntHelper.src = imagePath;
    }
  );
}
// #######################################################
// Add legend to lower left corner of the map

function legend_box() {
  L.Control.Watermark = L.Control.extend({
    onAdd: function(map) {
      var img = L.DomUtil.create('img');

      img.src = './data/' + eventid + '/mmi_legend.png';
      // img.style.width = '70%';
      var widthSize = 0.25 * $(window).width();
      img.style.width =  widthSize.toString() + 'px';
      return img;
  },

    onRemove: function(map) {
      // Nothing to do here
    }
  });

  L.control.watermark = function(opts) {
    return new L.Control.Watermark(opts);
  }

  L.control.watermark({ position: 'bottomleft' }).addTo(map1);
}


// #######################################################
// Drawing the map
// #####################################################

var map1 = L.map('map1', {
  zoomControl: false
});
var map2 = L.map('map2', {
  zoomControl: false
});

var map1Index = {
  Map: map1
};

var map2Index = {
  Map: map2
};

var control = L.control.layers();
control.addTo(map1);

var control2 = L.control.layers();
control2.addTo(map2);

var Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
}).addTo(map1);

var Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
}).addTo(map2);

L.control.scale({
  position: 'bottomright'
}).addTo(map1);

L.control.scale({
  position: 'bottomright'
}).addTo(map2);

L.control
  .zoom({
    position: 'bottomright'
  })
  .addTo(map2);





function map4() {
var fault_layer = L.esri.tiledMapLayer({
  url: 'https://earthquake.usgs.gov/arcgis/rest/services/haz/hazfaults2014/MapServer/',
   //url: "https://earthquake.usgs.gov/arcgis/rest/services/haz/Qfaults/MapServer/",

  maxZoom: 15
})//.addTo(mymap);
         
control.addOverlay(fault_layer,'US Fault');


}


function map5() {
//var fault_layer1 = L.esri.featureLayer({
 // url: 'https://earthquake.usgs.gov/arcgis/rest/services/haz/hazfaults2014/MapServer/21',
   //url: 'https://earthquake.usgs.gov/arcgis/rest/services/haz/Qfaults/MapServer/0',
//  maxZoom: 15
//}).addTo(mymap);
    
  
   var fault_layer1 = L.esri.featureLayer({
  	url: 'https://earthquake.usgs.gov/arcgis/rest/services/haz/Qfaults/MapServer/21'})//.addTo(mymap);
   //fault_layer1.collapsed = true;

    
 //fault_layer1.Visible=false;
    //fault_layer1.set("checked", false)
   // fault_layer1.setVisibility(false);
    

    
    
control.addOverlay(fault_layer1, 'Q fault');
    
    
    
    
    

}






























event_info();
show_intensity(control, true);
intensityOverlay(control);
show_contours('cont_pga.json', 'PGA', control, false);
show_contours('cont_pgv.json', 'PGV', control, false);
show_contours('cont_psa0p3.json', 'PSA 0.3 s', control, false);
show_contours('cont_psa1p0.json', 'PSA 1.0 s', control, false);
show_contours('cont_psa3p0.json', 'PSA 3.0 s', control, false);
stationList(map1, control, true);
faultSurface(control);
legend_box();
map4();
map5();


show_intensity(control2, false);
intensityOverlay(control2);
show_contours('cont_pga.json', 'PGA', control2, true);
show_contours('cont_pgv.json', 'PGV', control2, false);
show_contours('cont_psa0p3.json', 'PSA 0.3 s', control2, false);
show_contours('cont_psa1p0.json', 'PSA 1.0 s', control2, false);
show_contours('cont_psa3p0.json', 'PSA 3.0 s', control2, false);
stationList(map2, control2, false);
faultSurface(control2);
map4();
map5();

var sidebar = L.control.sidebar('sidebar').addTo(map1);
