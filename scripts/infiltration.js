/*== infiltration.js ========================================================
Implements the initialization of infiltration.xhtml.
Version    : $Id: shading.js 2337 2012-09-20 15:14:54Z hartwig $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created & Integrited  : Dean Wang
======================================================================*/

/*----------------------------------------------------------------------
Initializes input fields
----------------------------------------------------------------------*/
function setInputFields()
{	drawPerYear("peryear",1,8,1,null,null,0,adCompactness,adYearHeating,adYearCooling);
	drawPerMonth("permonth",adMonthHeating,adMonthCooling,
	dComfortMinimum,dComfortMaximum,adExternalTemperature,adInternalTemperature);
  var input = document.getElementsByName("infiltration")[0];
  input.value = dInfiltration.toFixed(2);
  var aButtons = document.getElementsByTagName("button");
  for (i = 0; i < aButtons.length; i++)
  {
    if(adRanks[i]==1){
    	document.getElementsByTagName("button")[i].className = "green tile";
    }else if(adRanks[i]==2){
    	document.getElementsByTagName("button")[i].className = "yellow tile";
    }else if(adRanks[i]==3){
    	document.getElementsByTagName("button")[i].className = "red tile";
    }
  }
}; /* setInputFields */

/*----------------------------------------------------------------------
Initializes infiltration.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  setProjectFields();
  setInputFields();
  drawPerMonth("permonth",adMonthHeating,adMonthCooling,
    dComfortMinimum,dComfortMaximum,adExternalTemperature,adInternalTemperature);
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
  var select = document.getElementsByName("infiltration")[0];
  select.focus();
}; /* onLoad */

/*----------------------------------------------------------------------
validate returns true, if the field values are acceptable. 
 ---------------------------------------------------------------------*/
function  validate()
{
  var bValid = false;
  var input = nonnegativeNumber("infiltration",MESSAGES.infiltration_numeric,MESSAGES.infiltration_non_negative);
  if (input != null)
  {
	bValid = true;
  }
  return bValid;
}; /* validate */