/*== occupancy.js ======================================================
Version    : 1.0
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML
*/

/*----------------------------------------------------------------------
Initializes input fields
----------------------------------------------------------------------*/
function setInputFields()
{
  var input = document.getElementsByName("NoOccupancy")[0];
  input.value = dNoOccupancy.toFixed(2);
  input = document.getElementsByName("HeatGain")[0];
  input.value=dHeatGain.toFixed(2);
  input = document.getElementsByName("Occupants")[0];
  input.value=dOccupants.toFixed(2);
  input = document.getElementsByName("Light")[0];
  input.value=dLight.toFixed(2);
  input = document.getElementsByName("Device")[0];
  input.value=dDevice.toFixed(2);
  var oType = dNoOccupancy.toFixed(2);
  if(oType == 0.00){
	  document.getElementsByName("typeOccupancy")[0].innerHTML = "";
  }else{
	  for (var iHour = 0; iHour < 24; iHour++){
	    var sHour = String(iHour);
	    if (sHour.length < 2)
	      sHour = "0"+sHour;
	    sHour0 = "hour_0_"+sHour;
	    sHour1 = "hour_1_"+sHour;
	    sHour2 = "hour_2_"+sHour;
	    sHour3 = "hour_3_"+sHour;
	    sHour4 = "hour_4_"+sHour;
	    sHour5 = "hour_5_"+sHour;
	    input0 = document.getElementsByName(sHour0)[0];
	    input1 = document.getElementsByName(sHour1)[0];
	    input2 = document.getElementsByName(sHour2)[0];
	    input3 = document.getElementsByName(sHour3)[0];
	    input4 = document.getElementsByName(sHour4)[0];
	    input5 = document.getElementsByName(sHour5)[0];
	    input0.value = adWEEKDAY_UTILIZATION_HOUR[iHour];
	    input1.value = adWEEKEND_UTILIZATION_HOUR[iHour];
	    input2.value = adWEEKDAY_OCCUPANCY_HOUR[iHour];
	    input3.value = adWEEKEND_OCCUPANCY_HOUR[iHour];
	    input4.value = adWEEKDAY_LIGHT_HOUR[iHour];
	    input5.value = adWEEKEND_LIGHT_HOUR[iHour];
	  }
  }
}; /* setInputFields */

/*----------------------------------------------------------------------
Initializes Geometry.xhtml
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
  
  var input = nonnegativeNumber("NoOccupancy",MESSAGES.no_occupancy_numeric,MESSAGES.no_occupancy_non_negative);
  if (input != null)
  {
		  input = nonnegativeNumber("HeatGain",MESSAGES.heat_gain_numeric,MESSAGES.heat_gain_non_negative);
		  if(input != null){
			  input = nonnegativeNumber("Occupants",MESSAGES.occupants_numeric,MESSAGES.occupants_non_negative);
			  if(input != null){
				  input = nonnegativeNumber("Light",MESSAGES.light_numeric,MESSAGES.light_non_negative);
				  if(input != null){
					  input = nonnegativeNumber("Device",MESSAGES.device_numeric,MESSAGES.device_non_negative);
					  if(input != null){
						  bValid = true;
					  }
				  }
			  }
		  }
  }
  
  return bValid;
}; /* validate */

function selectOccupancy(button,dValue)
{
  var ainput = document.getElementsByName("NoOccupancy")[0];
  var inputSubmit = document.getElementsByName("save")[0];
  ainput.value = dValue.toFixed(2);
  inputSubmit.click();
}; /* select */










