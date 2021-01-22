// var fas = require("fs");
// var text = fas.readFileSync("./eventlist.txt", "utf-8");
// var list = text.split("\n")
//
// console.log(list)

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

document.getElementById('imgint').src =
  './data/' + eventid + '/intensity.jpg';
document.getElementById('pgaint').src =
  './data/' + eventid + '/pga.jpg';
document.getElementById('pgvint').src =
  './data/' + eventid + '/pgv.jpg';
document.getElementById('imgsa03').src =
  './data/' + eventid + '/psa0p3.jpg';
document.getElementById('imgsa1').src =
  './data/' + eventid + '/psa1p0.jpg';
document.getElementById('imgsa3').src =
  './data/' + eventid + '/psa3p0.jpg';

document.getElementById('imgsa4').src =
  './data/' + eventid + '/pga_regr.png';
document.getElementById('imgsa5').src =
  './data/' + eventid + '/pgv_regr.png';

// <script>function loadstationpage(){ window.location= './data/' + eventid + '/station.html';}</script>
//function loadstationpage(){ document.getElementById('station-html').src=window.location.pathname= './data/station.html';}
     

function loadstationpage(){ 
    window.location = './station.html?eventid=' + eventid; 
}
  

function loadAnalysispage(){ 
    window.location = './viewAnalysis.html?eventid=' + eventid;
}
    
  function open_meta() {
  window.location = './MetaData.html?eventid=' + eventid;
}  
    
//'<object type="type/html" data="./data/' + eventid + '/station.html" ></object>'

// './data/' + eventid + '/station.html';
// document.getElementById('imgpga').src =
//  './data/' + eventid + '/pga_regr.png';
//document.getElementById('imgpgv').src =
 // './data/' + eventid + '/pgv_regr.png';
// #####################################################
// Open the download page for event
//
function open_download () {
  window.location = './downloadPage.html?eventid=' + eventid;
}


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
              '<b>'+ attr_collection + '</b>'+
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



  });

  
}







event_info();





















