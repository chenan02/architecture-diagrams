/*== windowsback.js ====================================================
Implements the initialization of windowsback.xhtml.
Version    : $Id: windowsback.js 2337 2015-11-18 15:34:03Z DEAN AND MIN $
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
  var input = document.getElementsByName("windowsback")[0];
  input.value = dWindowsBack.toFixed(0);
}; /* setInputFields */

/*----------------------------------------------------------------------
Initializes windowsback.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  setProjectFields();
  setInputFields();
  /* draw the energy demand per year for one or more values
    dMinX: 0,
    dMaxX: 100
    dLabelDx: 20
    asYearLabel: null
    adYearLabel: null
    dSelected: dWindowsBack
    adYearX: adWindowBack
    adYearHeating: adYearHeating 
    adYearCooling: adYearCooling
  */
  drawPerYear("peryear",1,7,1,null,null,dWindowsBack,adWindowsBack,adYearHeating,adYearCooling);
  /* draw the energy demand and the min/max temperature per month */
  drawPerMonth("permonth",adMonthHeating,adMonthCooling,
    dComfortMinimum,dComfortMaximum,adExternalTemperature,adInternalTemperature);
  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
  var select = document.getElementsByName("windowsback")[0];
  select.focus();
}; /* onLoad */

/*----------------------------------------------------------------------
validate returns true, if the field values are acceptable. 
 ---------------------------------------------------------------------*/
function  validate()
{
  var bValid = false;
  var dPercentage = percentNumber("windowsback",MESSAGES.percentage_numeric,MESSAGES.percentage_bounds);
  if (dPercentage != null)
    bValid = true;
  return bValid;
}; /* validate */
