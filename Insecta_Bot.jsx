/*
    Insecta_Bot - Generates insects from photoshop files
    JS Photoshop Scripting
    */
function openFile(name) {
var fileRef = File('~/Desktop/InsectCode/' + name + '.psd');
open(fileRef);
}

function c_change(colour) {
    // define your fill color
    var color = new SolidColor();
    color.rgb["hexValue"] = colour; 
    // fill layer
    doc.selection.selectAll();
   doc.selection.fill(color)
    //doc.selection.fill(color, null, 100, true);
    //fill (filltype [, mode] [, opacity] [, preserveTransparency])
}

function saveJPEG( doc, saveFile, qty ) {  
     var saveOptions = new JPEGSaveOptions( );  
     saveOptions.embedColorProfile = true;  
     saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;  
     saveOptions.matte = MatteType.NONE;  
     saveOptions.quality = qty;   
     doc.saveAs( saveFile, saveOptions, true );  
}  


function stepHistoryBack(){
    var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( charIDToTypeID( "HstS" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Prvs" ));
    desc.putReference(charIDToTypeID( "null" ), ref);
executeAction( charIDToTypeID( "slct" ), desc, DialogModes.NO );
};


function hideAllLayers(doc) {
   var len = doc.layers.length;
   for (var i = 0; i < len; i++) {
      doc.layers[i].visible = false;
   }
}
function get_random_color(lb) {
  function c() {
    var hex = Math.floor(Math.random()*256).toString(16);
    return ("0"+String(hex)).substr(-2); // pad with zero
  }
var col;
if (lb == true){
    col = 'ff'+c()+'00'
    }else{
        col = c()+c()+c();
        }
    return col
}
function main(doc){
//Generation
var vis = ["BODY", "TOP", "RIB", "BOTTOM", "BACKGROUND", "VIGNETTE", "DROP_SHADOW",  "SHADING", "DOUBLE"]
var multiple_shading = Math.floor((Math.random() * 2));
if (multiple_shading == 1) {
    for (var i = 0; i < shading.length; i++){
        var bool = Math.floor((Math.random() * 2));
        if (bool == 1){
            vis.push(shading[i])
            }
        }
    } else {
        var shading_gen = Math.floor((Math.random() * files.length));
        vis.push(shading[shading_gen])
        }
    
 var  posterise = Math.floor((Math.random() * 2));
 if(posterise == 1){
     vis.push("POSTERISE")
     }
 var pattern = Math.floor((Math.random() * patterns.length));
vis.push(patterns[pattern])
if (patterns[pattern] == "STYLE_X" || patterns[pattern] == "STYLE_Y"){
    vis.splice(2, 1);
    }

 
 var antenna = Math.floor((Math.random() * antennas.length));
vis.push(antennas[antenna])

var background = Math.floor((Math.random() * backgrounds.length));
vis.push(backgrounds[background])

var vignette = Math.floor((Math.random() * vignettes.length));
vis.push(vignettes[vignette])
//Action
//hideAllLayers (doc);

var len_1 = doc.layers.length -1;
var len_2 = vis.length;
for (var i = 0; i < len_1; i++) {
      var check = 0;
      var c_check = 0;
      doc.layers[i].visible = false;
      for (var f = 0; f < len_2; f++) {
          if (doc.layers[i].name == vis[f]){
              var check = 1;           
              } 
          if (doc.layers[i+1].name == vis[f]) {
              c_check = 1;
              }
          }
      if (check == 1){
          doc.layers[i].visible = true;
          }
      if  (doc.layers[i].name == "Colour" && c_check == 1){
          //var r_colour = ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
          var r_colour = get_random_color (false)
          doc.activeLayer = doc.layers[i] 
          c_change (r_colour)
          }
            if  (doc.layers[i].name == "Colour_lb"){
          //var r_colour = ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
          var r_colour = get_random_color (true)
          doc.activeLayer = doc.layers[i] 
          c_change (r_colour)
          }
      if  (doc.layers[i].name == "DOUBLE"){
          var multi = Math.floor((Math.random() * 3));
          if (multi == 0){
              doc.layers[i].visible = false; 
              }
      }
  }
}






//Initialisation
var files = ['BUTT_1', 'BUTT_2', 'BUTT_3', 'DRAG_1', 'LADY_1']
var files_patterns = [["NONE", "STYLE_1", "STYLE_2", "STYLE_3", "STYLE_4", "STYLE_X", "STYLE_Y"], ["NONE", "STYLE_1", "STYLE_2", "STYLE_3", "STYLE_4", "STYLE_X", "STYLE_Y"], ["NONE"], ["NONE", "STYLE_1", "STYLE_2"], ["STYLE_1", "STYLE_2", "STYLE_3"], ["STYLE_1", "STYLE_2", "STYLE_3"]]
var shading = ["SHADOW", "SATURATION", "LUMINOSITY"]
var antennas = ["ANTENNA_1", "ANTENNA_2"]
var backgrounds = ["BACKGROUND_1", "BACKGROUND_2", "BACKGROUND_3", "BACKGROUND_4", "BACKGROUND_5"]
var vignettes = ["NONE", "VIGNETTE_1", "VIGNETTE_2", "VIGNETTE_3"]

for (var i = 1; i < 51; i++){
    var gen = Math.floor((Math.random() * files.length));
    //var gen = 4; //FOR TESTING INSECTS
    var ins = files[gen]
    openFile(files[gen])
    var doc = app.activeDocument;
    var patterns = files_patterns[gen]
    //var patterns = ["STYLE_Y"]  //FOR TESTING PATTERNS
    main(doc)
    doc.selection.deselect()
    doc.mergeVisibleLayers ()
    doc.activeLayer.applyAddNoise(6, NoiseDistribution.GAUSSIAN, true)
    saveJPEG( app.activeDocument, new File('~/Desktop/InsectCode/Drop/Insect' + i + '.jpg'), 12 );
    doc.close(SaveOptions.DONOTSAVECHANGES); 
    }
alert("Done")