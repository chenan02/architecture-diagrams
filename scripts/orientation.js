/*== orientation.js ====================================================
Implements the initialization of orientation.xhtml.
Version    : $Id: orientation.js 2337 2012-09-20 15:14:54Z hartwig $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created    : 08.08.2012, Hartwig Thomas, Enter AG, Zurichs
======================================================================*/

/*----------------------------------------------------------------------
Initializes input fields
----------------------------------------------------------------------*/
function setInputFields()
{
	drawPerYear("peryear",1,8,1,null,null,0,adCompactness,adYearHeating,adYearCooling);
	drawPerMonth("permonth",adMonthHeating,adMonthCooling,
		    dComfortMinimum,dComfortMaximum,adExternalTemperature,adInternalTemperature);
  var input = document.getElementsByName("orientation")[0];
  input.value = dOrientation.toFixed(2);
}; /* setInputFields */

/*----------------------------------------------------------------------
Initializes orientation.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  setProjectFields();
  setInputFields();
  /* draw the energy demand and the min/max temperature per month */
  drawPerMonth("permonth",adMonthHeating,adMonthCooling,
    dComfortMinimum,dComfortMaximum,adExternalTemperature,adInternalTemperature);
  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
  var select = document.getElementsByName("orientation")[0];
  select.focus();
}; /* onLoad */

/*----------------------------------------------------------------------
validate returns true, if the field values are acceptable. 
 ---------------------------------------------------------------------*/
function  validate()
{
  var bValid = false;
  input = numericInput("orientation",MESSAGES.orientation_numeric);
  if (input != null)
  {
    var dOrientation = Number(input.value);
    if ((dOrientation > -180) && (dOrientation <= 180))
      bValid = true;
    else
    {
      alert(MESSAGES.orientation_bounds);
      input.focus();
    }
  }
  return bValid;
}; /* validate */