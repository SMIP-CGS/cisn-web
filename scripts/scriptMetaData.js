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
//  #  Find categories of available products for event
//  ##################################################################
function attr_div(attr_collection) {
  var content = '';
  try {
    Object.keys(attr_collection).forEach(function(key) {
      if (attr_collection[key].hasOwnProperty('module')) {
        content +=
          '<b>' +
          key 
          ' module:</b> ' +
          attr_collection[key]['module'] +
          '<br/>';

      } else {
        content += '<b>' + key + ':</b> ' + attr_collection[key] + '<br/>';
      }
    });
    return content;
  } catch (err) {
    console.log(err)
  }
}

function col_exp() {
  var col = document.getElementsByClassName("collapsible");
  for (i = 0; i < col.length; i++) {
    col[i].addEventListener("click", function() {
      this.classList.toggle("activeCol");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  };
};

//  #################################################################
//  #  Get subkeys for an Object
//  ##################################################################
function get_subs(subObj, depth) {
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
        subMeta = subMeta + tabNum + '<b>' + key + ':</b>&emsp;' + subObj[key] + '<br/>';
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
    console.log(json);
    Object.keys(json).forEach(function(key,index) {
    subMeta = json[key];
    keyName = key.charAt(0).toUpperCase() + key.slice(1)

    metaHTML = metaHTML + '<button type="button" class="collapsible"> '
      + keyName + '</button><div class="content"><p>';

    // Object.keys(subMeta).forEach(function(key2,index) {
    //   // metaHTML = metaHTML + '<br/><b>' + key2 + '</b><br/>' + JSON.stringify(subMeta[key2], null, 4);
    //   console.log(get_subs(subMeta[key2], metaHTML));
    // });

    metaHTML = metaHTML + get_subs(subMeta, 0) + '</p></div>';
    document.getElementById('metaTable').innerHTML = metaHTML;

  });

  col_exp();

  });

}


//  #################################################################
//  #  Main
//  ##################################################################

var eventid = getURLParameter('eventid');

list_meta(eventid);