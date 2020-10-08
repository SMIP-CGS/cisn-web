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
  window.location = './metaDataPage.html?eventid=' + eventid;
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
