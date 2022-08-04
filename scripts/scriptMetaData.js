function getURLParameter (name) {
  return (
    decodeURIComponent(
      (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(
        location.search
      ) || [null, ''])[1].replace(/\+/g, '%20')
    ) || null
  );
}

// #####################################################
// Open the double map view
//
function open_leaflet () {
  window.location = './viewLeaflet.html?eventid=' + eventid;
}

// #####################################################
// Open the static map view
//
function open_static () {
  window.location = './view.html?eventid=' + eventid;
}

//  #################################################################
//  #  Make table rows clickable
//  ##################################################################
function initTableClick () {
  $(document).ready(function () {
    $('table tbody tr').click(function () {
      document.location = $(this).data('href');
      return false;
    });
  });
}

//  #################################################################
//  #  Expand row when clicked
//  ##################################################################


//  #################################################################
//  #  Get subkeys for an Object
//  ##################################################################
/*function get_subs(subObj, depth) {
  var subMeta = '';
  var tabNum = '';
  for (var i=0; i<depth; i++) {
    tabNum = tabNum + '&emsp;';
  };
  Object.keys(subObj).forEach(function(key,index) {
    if (subObj[key] !== null) {
      if(typeof subObj[key] == 'object'){
        subMeta = subMeta + tabNum + '<b>' + key + ':</b><br/>' + get_subs(subObj[key], depth+1);
      } else {
        subMeta = subMeta + tabNum + '<b>' + key + ':</b>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;' + subObj[key] + '<br/>';
      };
    };
    });
    return subMeta;
};
//  #################################################################
//  #  Writing the table
//  ##################################################################
function list_meta(eventid) {
  $.getJSON('./data/' + eventid + '/info.json', function(
    json
  ) {
    var metaHTML = '';

    var order = [ 'processing', 'input', 'output', 'multigmpe', 'strec'];

    for (var i=0; i<order.length; i++) {
    key = order[i];
    subMeta = json[key];
    keyName = key.charAt(0).toUpperCase() + key.slice(1)

    metaHTML = metaHTML + '<h2><b> '
      + keyName + '</h2></b><div><p>';

    metaHTML = metaHTML + get_subs(subMeta, 0) + '</p></div>';
    document.getElementById('metaTable').innerHTML = metaHTML;
  };

  col_exp();

  });

}


//  #################################################################
//  #  Main
//  ##################################################################

var eventid = getURLParameter('eventid');

list_meta(eventid);
*/

//  #################################################################
//  #  Writing the table
//  ##################################################################
function list_meta(eventid) {
  $.getJSON('./data/' + eventid + '/info.json', function(
    json
  ) {
  
  return_data();
  
    
    function return_data(metadata) {
  // ############################# Ground Motion/Intensity Information #######################################################################  
  var htmlCode = '<h3 style="text-align:left" ><b>Processing</b></h3>' + '<hr>'+'<br/>'
      htmlCode = htmlCode + '<table style="text-align:left"><tr><td><h6><b>Ground Motion/Intensity Information</b></h6></td></tr></table><hr>'                                                                                                                                                                                                                  +   '<table style="text-align:left">   <tr> <td style="padding-right:170px;"><b>Type</b></td>      <td style=" padding-right:170px;"><b>Module</b></td>                   <td ><b>Reference</b></td> </tr>'
        + '<tr><td>GMPE</td>          <td>'+ json.processing.ground_motion_modules.gmpe.module +'</td></tr>'
        + '<tr><td>IPE</td>           <td>'+ json.processing.ground_motion_modules.ipe.module +'</td></tr>'
        + '<tr><td>GMICE</td>         <td>'+ json.processing.ground_motion_modules.gmice.module +'</td></tr>'
        + '<tr><td>CCF</td>           <td>'+ json.processing.ground_motion_modules.ccf.module  +'</td></tr>'
        + '<tr><td>Basin</td>         <td>'+ json.processing.ground_motion_modules.basin_correction.module  +'</td></tr>'
        + '<tr><td>Directivity</td>   <td>'+ json.processing.ground_motion_modules.directivity.module  +'</td></tr></table><br/>'
   
        // ############################# Miscellaneous #######################################################################  
        
       + '<table style="text-align:left"><tr><td><h6><b>Miscellaneous</b></h6></td></tr></table>'+'<hr>'
        + '<table style="text-align:left;"><tr><td style="padding-right:170px;">Max magnitude to compute bias</td>        <td>'+ json.processing.miscellaneous.bias_max_mag +'</td></tr>'
        + '<tr><td>Maximum distance to include station in bias</td>         <td>'+ json.processing.miscellaneous.bias_max_range +'</td></tr>'
        + '<tr><td>Median distance used</td>       <td>'+ json.processing.miscellaneous.median_dist +'</td></tr>'
        + '<tr><td>Max magnitude to flag outliers</td>         <td>'+ json.processing.miscellaneous.outlier_deviation_level  +'</td></tr></table><br/>'
   
// ############################# Shakemap version #######################################################################  
        
        + '<table style="text-align:left"><tr><td><h6><b>ShakeMap Versions</b></h6></td></tr></table>'+'<hr>'
        + '<table style="text-align:left;"><tr><td style="padding-right:200px;">Code</td>              <td>'+ json.processing.shakemap_versions.shakemap_revision_id +'</td></tr>'
        + '<tr><td>Github </td>           <td>'+ json.processing.shakemap_versions.shakemap_revision +'</td></tr>'
        + '<tr><td>Map version</td>       <td>'+ json.processing.shakemap_versions.map_version +'</td></tr>'
        + '<tr><td>Date</td>              <td>'+ json.processing.shakemap_versions.process_time  +'</td></tr></table><br/>'
        
   
// ############################# Site Response #######################################################################          
       
        
         + '<table style="text-align:left"><tr><td><h6><b>Site Response</b></h6></td></tr></table>'+'<hr>'
        + '<table style="text-align:left;"><tr><td  style="padding-right:90px;">Reference rock Vs30</td>              <td>'+ json.processing.site_response.vs30default +'</td></tr>'
        + '<tr><td>Site correction applied </td>           <td>'+ json.processing.site_response.site_correction +'</td></tr></table><br/>'
       
         // ############################################# Output ################################################################################################ 
        
         + '<table style="text-align:left"><tr><td><h3><b>Output</b></h3></td></tr></table>'+'<hr>'
        +'<table style="text-align:left"><tr><td><h6><b>Ground Motion/Intensity Information</b></h6></td></tr></table><hr>' 
        +'<table style="text-align:left">    <tr>      <td style="padding-right:70px;"><b>Type</b></td>                                                                             <td style=" padding-right:70px;"><b>Max Value in Grid</b></td>                                                                                                           <td style=" padding-right:70px;"><b>Max Value on Land</b></td>                                                                                                           <td ><b>Bias</b></td>              </tr>'
  + '<tr><td>SA(0.3)</td>     <td>'+ json.output.ground_motions["SA(0.3)"].max_grid +json.output.ground_motions["SA(0.3)"].units +'</td><td>'+ json.output.ground_motions["SA(0.3)"].max + json.output.ground_motions["SA(0.3)"].units +'</td><td>'+ json.output.ground_motions["SA(0.3)"].bias +'</td></tr>'                                                              /*######################### PGA ##################*/
  + '<tr><td>PGA</td>           <td>'+ json.output.ground_motions.PGA.max_grid + json.output.ground_motions.PGA.units +'</td><td style=" padding-right:90px;">'+ json.output.ground_motions.PGA.max+ json.output.ground_motions.PGA.units +'</td><td>'+ json.output.ground_motions.PGA.bias +'</td></tr>'                                                           /*####################### SA(3.0) ##################*/
  + '<tr><td>SA(3.0)</td>    <td>'+ json.output.ground_motions["SA(3.0)"].max_grid + json.output.ground_motions["SA(3.0)"].units +'</td><td>'+ json.output.ground_motions["SA(3.0)"].max+ json.output.ground_motions["SA(3.0)"].units +'</td><td>'+ json.output.ground_motions["SA(3.0)"].bias+'</td></tr>'                                                              /*######################### MMI ##################*/
  + '<tr><td>MMI</td>          <td>'+ json.output.ground_motions.MMI.max_grid + json.output.ground_motions.MMI.units +'</td><td style=" padding-right:90px;">'+ json.output.ground_motions.MMI.max+ json.output.ground_motions.MMI.units +'</td><td>'+ json.output.ground_motions.MMI.bias + '</td></tr>'                                                       /*######################### SA(1.0)##################*/
  + '<tr><td>SA(1.0)</td>    <td>'+ json.output.ground_motions["SA(1.0)"].max_grid + json.output.ground_motions["SA(1.0)"].units +'</td><td>'+ json.output.ground_motions["SA(1.0)"].max+ json.output.ground_motions["SA(1.0)"].units +'</td><td>'+ json.output.ground_motions["SA(1.0)"].bias+'</td></tr>'                                                             /*######################### PGV##################*/
  + '<tr><td>PGV</td>           <td>'+ json.output.ground_motions.PGV.max_grid + json.output.ground_motions.PGV.units +'</td><td style=" padding-right:90px;">'+ json.output.ground_motions.PGV.max+ json.output.ground_motions.PGV.units +'</td><td>'+ json.output.ground_motions.PGV.bias +'</td></tr></table><br/>'
       
        
        // ############################################# Map Information ################################################################################################          
        +'<table style="text-align:left"><tr><td><h6><b>Map Information</b></h6></td></tr></table><hr>' 
        +'<table style="text-align:left">    <tr>      <td style="padding-right:150px;"><b>Type</b></td>                                                                             <td style=" padding-right:150px;"><b>Latitude</b></td> <td style=" padding-right:150px;"><b>Longitude</b></td></tr>'
        
         + '<tr><td>Number of points</td>   <td>'+ json.output.map_information.grid_points.latitude+ json.output.map_information.grid_points.units+'</td><td>'+ json.output.map_information.grid_points.longitude + json.output.map_information.grid_points.units+'</td></tr>' 
        
        /*######################### Grid spacing ##################*/
        
         + '<tr><td>Grid spacing</td>   <td>'+ json.output.map_information.grid_spacing.latitude+ json.output.map_information.grid_spacing.units+'</td><td>'+ json.output.map_information.grid_spacing.longitude+ json.output.map_information.grid_spacing.units+'</td></tr>'
        
        /*######################### Span##################*/
        
         + '<tr><td>Span</td>   <td>'+ json.output.map_information.grid_span.latitude+json.output.map_information.grid_span.units+'</td><td>'+ json.output.map_information.grid_span.longitude+ json.output.map_information.grid_span.units+'</td></tr>'
        
        
         /*#########################Min##################*/
        
         + '<tr><td>Min</td>   <td>'+ json.output.map_information.min.latitude+json.output.map_information.min.units+'</td><td>'+ json.output.map_information.min.longitude+ json.output.map_information.min.units+'</td></tr>'
        
          /*#########################Min##################*/
        
         + '<tr><td>Max</td>   <td>'+ json.output.map_information.max.latitude+json.output.map_information.min.units+'</td><td>'+ json.output.map_information.max.longitude+ json.output.map_information.max.units+'</td></tr></table><br/>'
        
        
        
        // ############################################# Uncertainty ################################################################################################  
        
        +'<table style="text-align:left"><tr><td><h6><b>Uncertainty</b></h6></td></tr></table><hr>' 
               
         + '<table  style="text-align:left"><tr><td style="padding-right:150px;">Mean of map uncertainty</td>   <td>'+ json.output.uncertainty.mean_uncertainty_ratio+'</td></tr>' 
                
       +'<tr><td style="padding-right:150px;">Empirical ShakeMap grade </td>   <td>'+ json.output.uncertainty.grade+ '</td></tr>' 
        
       +'<tr><td style="padding-right:150px;">Flagged Seismic Station</td>   <td>'+ json.output.uncertainty.total_flagged_mi+ '</td></tr>' 
        
       +'<tr><td style="padding-right:150px;">Flagged DYFI stations</td>   <td>'+ json.output.uncertainty.total_flagged_pgm+ '</td></tr></table><br/>' 
        
        
         // ############################################# Input ################################################################################################     
        
          +'<table style="text-align:left"><tr><td><h3><b>Input</b></h3></td></tr></table><hr>' 
        
         + '<table  style="text-align:left"><tr><td style="padding-right:130px;">Description</td>   <td>'+ json.input.event_information.location+'</td></tr>' 
                
       +'<tr><td style="padding-right:110px;">ID</td>   <td>'+ json.input.event_information.event_id+ '</td></tr>' 
        
       +'<tr><td style="padding-right:110px;">Magnitude</td>   <td>'+ json.input.event_information.magnitude+ '</td></tr>' 
        
       +'<tr><td style="padding-right:110px;">Depth</td>   <td>'+ json.input.event_information.depth+ '</td></tr>'
        
        
       +'<tr><td style="padding-right:110px;">GPS location</td>   <td>'+ json.input.event_information.latitude+ '</td></tr>'
        
        +'<tr><td style="padding-right:110px;">Origin time</td>   <td>'+ json.input.event_information.origin_time+ '</td></tr>'
        
         +'<tr><td style="padding-right:110px;">Mechanism source</td>   <td>'+ json.input.event_information.src_mech+ '</td></tr>'
        
         +'<tr><td style="padding-right:110px;">Fault reference</td>   <td>'+ json.input.event_information.fault_ref+ '</td></tr>'
        
         +'<tr><td style="padding-right:110px;">Fault reference</td>   <td>'+ json.input.event_information.seismic_stations+ '</td></tr>'
        
             +'<tr><td style="padding-right:110px;">Number of DYFI stations stations</td>   <td>'+ json.input.event_information.intensity_observations+ '</td></tr></table><br/>'
        
        
          // ############################################# Ground Motion Models ################################################################################################    
        
            // ############################################# Ground Motion Models -PGA #####################################################################################   
        
            +'<table style="text-align:left;"><tr><td><h3><b>Ground Motion Models</b></h3></td></tr></table><hr>' 
        
         +'<table style="text-align:left;"><tr><td><h6><b>PGA</b></h6></td></tr></table><hr>' 
       
        
         + '<table  style="text-align:left"><tr><td style="padding-right:130px;"><b>'+json.multigmpe.PGA.name+'</b></td></tr></table>'
        
        + '<table  style="text-align:left"><tr><td style="padding-right:130px;"><b>Name</b></td>   <td><b>Weight</b></td></tr>'
        
         +'<tr><td style="padding-right:110px;">'+json.multigmpe.PGA.gmpes[0].name+'</td>   <td>'+json.multigmpe.PGA.weights+ '</td></tr></table><br/>'
        
          + '<table style="text-align:left"><tr><td style="padding-right:130px;font-weight:450;">Name</td>   <td style="font-weight:450;">Weight</td></tr>' 
        
         +'<tr><td style="padding-right:110px;">'+json.multigmpe.PGA.gmpes[0].gmpes['0']+'</td>   <td>'+json.multigmpe.PGA.gmpes[0].weights['0']+ '</td></tr>'
        
          +'<tr><td style="padding-right:110px;">'+json.multigmpe.PGA.gmpes[0].gmpes['1']+'</td>   <td>'+json.multigmpe.PGA.gmpes[0].weights['1']+ '</td></tr>'
          +'<tr><td style="padding-right:110px;">'+json.multigmpe.PGA.gmpes[0].gmpes['2']+'</td>   <td>'+json.multigmpe.PGA.gmpes[0].weights['2']+ '</td></tr>'
          +'<tr><td style="padding-right:110px;">'+json.multigmpe.PGA.gmpes[0].gmpes['3']+'</td>   <td>'+json.multigmpe.PGA.gmpes[0].weights['3']+ '</td></tr></table><br/><br/>'
        
        
        
                 // ############################################# Ground Motion Models -PGV #####################################################################################   
        
               
         +'<table style="text-align:left;"><tr><td><h6><b>PGV</b></h6></td></tr></table><hr>' 
       
        
         + '<table  style="text-align:left"><tr><td style="padding-right:130px;"><b>'+json.multigmpe.PGV.name+'</b></td></tr></table>'
        
        + '<table  style="text-align:left"><tr><td style="padding-right:130px;"><b>Name</b></td>   <td><b>Weight</b></td></tr>'
        
         +'<tr><td style="padding-right:110px;">'+json.multigmpe.PGV.gmpes[0].name+'</td>   <td>'+json.multigmpe.PGV.weights+ '</td></tr></table><br/>'
        
          + '<table style="text-align:left"><tr><td style="padding-right:130px;font-weight:450;">Name</td>   <td style="font-weight:450;">Weight</td></tr>' 
        
         +'<tr><td style="padding-right:110px;">'+json.multigmpe.PGV.gmpes[0].gmpes['0']+'</td>   <td>'+json.multigmpe.PGV.gmpes[0].weights['0']+ '</td></tr>'
        
          +'<tr><td style="padding-right:110px;">'+json.multigmpe.PGV.gmpes[0].gmpes['1']+'</td>   <td>'+json.multigmpe.PGV.gmpes[0].weights['1']+ '</td></tr>'
          +'<tr><td style="padding-right:110px;">'+json.multigmpe.PGV.gmpes[0].gmpes['2']+'</td>   <td>'+json.multigmpe.PGV.gmpes[0].weights['2']+ '</td></tr>'
          +'<tr><td style="padding-right:110px;">'+json.multigmpe.PGV.gmpes[0].gmpes['3']+'</td>   <td>'+json.multigmpe.PGV.gmpes[0].weights['3']+ '</td></tr></table><br/><br/>'
        
        
        
        
        
        
        
        
         // ############################################# Ground Motion Models -PSA(0.3) #####################################################################################   
        
        
              
         +'<table style="text-align:left;"><tr><td><h6><b>PSA(0.3)</b></h6></td></tr></table><hr>' 
       
        
         + '<table  style="text-align:left"><tr><td style="padding-right:130px;"><b>'+json.multigmpe['SA(0.3)'].name+'</b></td></tr></table>'
        
        + '<table  style="text-align:left"><tr><td style="padding-right:130px;"><b>Name</b></td>   <td><b>Weight</b></td></tr>'
        
         +'<tr><td style="padding-right:110px;">'+json.multigmpe['SA(0.3)'].gmpes[0].name+'</td>   <td>'+json.multigmpe['SA(0.3)'].weights+ '</td></tr></table><br/>'
        
          + '<table style="text-align:left"><tr><td style="padding-right:130px;font-weight:450;">Name</td>   <td style="font-weight:450;">Weight</td></tr>' 
        
         +'<tr><td style="padding-right:110px;">'+json.multigmpe['SA(0.3)'].gmpes[0].gmpes['0']+'</td>   <td>'+json.multigmpe['SA(0.3)'].gmpes[0].weights['0']+ '</td></tr>'
        
                 +'<tr><td style="padding-right:110px;">'+json.multigmpe['SA(0.3)'].gmpes[0].gmpes['1']+'</td>   <td>'+json.multigmpe['SA(0.3)'].gmpes[0].weights['1']+ '</td></tr>'
                 +'<tr><td style="padding-right:110px;">'+json.multigmpe['SA(0.3)'].gmpes[0].gmpes['2']+'</td>   <td>'+json.multigmpe['SA(0.3)'].gmpes[0].weights['2']+ '</td></tr>'
                 +'<tr><td style="padding-right:110px;">'+json.multigmpe['SA(0.3)'].gmpes[0].gmpes['3']+'</td>   <td>'+json.multigmpe['SA(0.3)'].gmpes[0].weights['3']+ '</td></tr></table><br/><br/>'
           
       
     
        
        
      // ############################################# Ground Motion Models -PSA(1.0)#####################################################################################   
            
     
         +'<table style="text-align:left;"><tr><td><h6><b>PSA(1.0)</b></h6></td></tr></table><hr>' 
       
        
         + '<table  style="text-align:left"><tr><td style="padding-right:130px;"><b>'+json.multigmpe['SA(1.0)'].name+'</b></td></tr></table>'
        
        + '<table  style="text-align:left"><tr><td style="padding-right:130px;"><b>Name</b></td>   <td><b>Weight</b></td></tr>'
        
         +'<tr><td style="padding-right:110px;">'+json.multigmpe['SA(1.0)'].gmpes[0].name+'</td>   <td>'+json.multigmpe['SA(1.0)'].weights+ '</td></tr></table><br/>'
        
          + '<table style="text-align:left"><tr><td style="padding-right:130px;font-weight:450;">Name</td>   <td style="font-weight:450;">Weight</td></tr>' 
        
         +'<tr><td style="padding-right:110px;">'+json.multigmpe['SA(1.0)'].gmpes[0].gmpes['0']+'</td>   <td>'+json.multigmpe['SA(1.0)'].gmpes[0].weights['0']+ '</td></tr>'
        
                 +'<tr><td style="padding-right:110px;">'+json.multigmpe['SA(1.0)'].gmpes[0].gmpes['1']+'</td>   <td>'+json.multigmpe['SA(1.0)'].gmpes[0].weights['1']+ '</td></tr>'
                 +'<tr><td style="padding-right:110px;">'+json.multigmpe['SA(1.0)'].gmpes[0].gmpes['2']+'</td>   <td>'+json.multigmpe['SA(1.0)'].gmpes[0].weights['2']+ '</td></tr>'
                 +'<tr><td style="padding-right:110px;">'+json.multigmpe['SA(1.0)'].gmpes[0].gmpes['3']+'</td>   <td>'+json.multigmpe['SA(1.0)'].gmpes[0].weights['3']+ '</td></tr></table><br/><br/>'
       
             
      // ############################################# Ground Motion Models -PSA(3.0)#####################################################################################   
            
     
         +'<table style="text-align:left;"><tr><td><h6><b>PSA(3.0)</b></h6></td></tr></table><hr>' 
       
        
         + '<table  style="text-align:left"><tr><td style="padding-right:130px;"><b>'+json.multigmpe['SA(3.0)'].name+'</b></td></tr></table>'
        
        + '<table  style="text-align:left"><tr><td style="padding-right:130px;"><b>Name</b></td>   <td><b>Weight</b></td></tr>'
        
         +'<tr><td style="padding-right:110px;">'+json.multigmpe['SA(3.0)'].gmpes[0].name+'</td>   <td>'+json.multigmpe['SA(3.0)'].weights+ '</td></tr></table><br/>'
        
          + '<table style="text-align:left"><tr><td style="padding-right:130px;font-weight:450;">Name</td>   <td style="font-weight:450;">Weight</td></tr>' 
        
         +'<tr><td style="padding-right:110px;">'+json.multigmpe['SA(3.0)'].gmpes[0].gmpes['0']+'</td>   <td>'+json.multigmpe['SA(3.0)'].gmpes[0].weights['0']+ '</td></tr>'
        
                 +'<tr><td style="padding-right:110px;">'+json.multigmpe['SA(3.0)'].gmpes[0].gmpes['1']+'</td>   <td>'+json.multigmpe['SA(3.0)'].gmpes[0].weights['1']+ '</td></tr>'
                 +'<tr><td style="padding-right:110px;">'+json.multigmpe['SA(3.0)'].gmpes[0].gmpes['2']+'</td>   <td>'+json.multigmpe['SA(3.0)'].gmpes[0].weights['2']+ '</td></tr>'
                 +'<tr><td style="padding-right:110px;">'+json.multigmpe['SA(3.0)'].gmpes[0].gmpes['3']+'</td>   <td>'+json.multigmpe['SA(3.0)'].gmpes[0].weights['3']+ '</td></tr></table><br/><br/>'
        
                
document.getElementById('metaTable').innerHTML = htmlCode;

    };
    });   
};



var eventid = getURLParameter('eventid');

list_meta(eventid);


  




























