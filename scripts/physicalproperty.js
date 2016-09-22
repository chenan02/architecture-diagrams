/*== physicalproperty.js ======================================================
Version    : 1.0
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML
Created & Integrited  : Dean Wang and MIN
*/

/*----------------------------------------------------------------------
Initializes input fields
----------------------------------------------------------------------*/
function setInputFields()
{
  var input = document.getElementsByName("Orientation")[0];
  input.value = dOrientation.toFixed(2);
  input = document.getElementsByName("Construction")[0];
  input.value=dConstruction.toFixed(0);
  input = document.getElementsByName("WallUValue")[0];
  input.value=dWallUValue.toFixed(2);
  input = document.getElementsByName("RoofUValue")[0];
  input.value=dRoofUValue.toFixed(2);
  input = document.getElementsByName("FloorUValue")[0];
  input.value=dFloorUValue.toFixed(2);
  input = document.getElementsByName("GlazingUValue")[0];
  input.value=dGlazingUValue.toFixed(2);
  input = document.getElementsByName("GlazingSHGC")[0];
  input.value=dGlazingSHGC.toFixed(2);
  input = document.getElementsByName("North")[0];
  input.value=dNorth.toFixed(0);
  input = document.getElementsByName("South")[0];
  input.value=dSouth.toFixed(0);
  input = document.getElementsByName("East")[0];
  input.value=dEast.toFixed(0);
  input = document.getElementsByName("West")[0];
  input.value=dWest.toFixed(0);
  input = document.getElementsByName("VentilationInfiltration")[0];
  input.value=dVentilationInfiltration.toFixed(2);
  input = document.getElementsByName("NaturalVentilation")[0];
  input.value=dNaturalVentilation.toFixed(0);
  input = document.getElementsByName("NightVentilation")[0];
  input.value=dNightVentilation.toFixed(0);
  input = document.getElementsByName("HeatRecovery")[0];
  input.value=dHeatRecovery.toFixed(0);
}; /* setInputFields */

/*----------------------------------------------------------------------
Initializes physicalproperty.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  setProjectFields();
  setInputFields();
  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
}; /* onLoad */

/*----------------------------------------------------------------------
validate returns true, if the field values are acceptable. 
 ---------------------------------------------------------------------*/
function validate()
{
  var bValid = false;
  
  var input = numericInput("Orientation",MESSAGES.orientation_bound);
  var result = Number(input.value);
  if (result >= (-180) && result <= 180)
  {
	  if(input != null){
		  input = nonnegativeNumber("WallUValue",MESSAGES.walluvalue_numeric,MESSAGES.walluvalue_non_negative);
		  if(input != null){
			  input = nonnegativeNumber("RoofUValue",MESSAGES.roofuvalue_numeric,MESSAGES.roofuvalue_non_negative);
			  if(input != null){
				  input = nonnegativeNumber("FloorUValue",MESSAGES.flooruvalue_numeric,MESSAGES.flooruvalue_non_negative);
				  if(input != null){
					  input = nonnegativeNumber("GlazingUValue",MESSAGES.glazinguvalue_numeric,MESSAGES.glazinguvalue_non_negative);
					  if(input != null){
						  input = numericInput("GlazingSHGC",MESSAGES.glazingshgc_bound);
						  result = Number(input.value);
						  if(result > 0 && result < 1){
								input = nonnegativeNumber("VentilationInfiltration",MESSAGES.ventilationinfiltration_numeric,MESSAGES.ventilationinfiltration_non_negative);
							    if(input != null){
									 bValid = true;
								}
						  }else{
							  alert(MESSAGES.glazingshgc_bound);
						      input.focus();
						  }
					  }
				  }
			  }
		  }
	  }
  }else{
	  alert(MESSAGES.orientation_bound);
      input.focus();
  }
  
  return bValid;
}; /* validate */












