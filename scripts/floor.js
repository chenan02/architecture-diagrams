/*== floor.js ==========================================================
Implements the initialization of floor.xhtml.
Version    : $Id: floor.js 2338 2015-11-18 15:34:03Z DEAN AND MIN $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created    : 23.07.2012, DEAN WONG, MKIM, Enter AG, Zurich
Copyright  : 2015, Baumschlager Eberle, Vaduz, Liechtenstein
======================================================================*/

/*----------------------------------------------------------------------
Initializes input fields
----------------------------------------------------------------------*/
function setInputFields()
{
  drawPerYear("peryear",1,8,1,null,null,0,adCompactness,adYearHeating,adYearCooling);
  drawPerMonth("permonth",adMonthHeating,adMonthCooling,
  dComfortMinimum,dComfortMaximum,adExternalTemperature,adInternalTemperature);
  var input = document.getElementsByName("flooru")[0];
  input.value = dFloorU.toFixed(2);
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
Initializes floor.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  setProjectFields();
  setInputFields();
  drawPerMonth("permonth",adMonthHeating,adMonthCooling,
    dComfortMinimum,dComfortMaximum,adExternalTemperature,adInternalTemperature);
  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
  var select = document.getElementsByName("flooru")[0];
  select.focus();
}; /* onLoad */

/*----------------------------------------------------------------------
validate returns true, if the field values are acceptable. 
 ---------------------------------------------------------------------*/
function  validate()
{
  var bValid = false;
  var dFloorU = nonnegativeNumber("flooru",MESSAGES.insulation_numeric,MESSAGES.insulation_non_negative);
  if (dFloorU != null)
    bValid = true;
  return bValid;
}; /* validate */
